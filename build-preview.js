#!/usr/bin/env node
/**
 * Zero-bundler build for the Invite Klick preview Artifact.
 *
 * Reads each TypeScript/TSX source file in scripts/manifest.js (in order),
 * strips import/export syntax (since we concatenate into a single scope),
 * transpiles TS + JSX -> plain ES2020 JS via the TypeScript compiler API
 * (classic JSX runtime => React.createElement calls), and concatenates
 * everything into one IIFE that mounts <App /> into #root.
 *
 * This avoids needing network access to npm or a bundler: React/ReactDOM
 * are loaded as UMD globals from a CDN in the published HTML shell, and
 * this script produces the single app.js that runs against those globals.
 */
const fs = require('fs');
const path = require('path');
const Module = require('module');
Module.globalPaths.push('/home/claude/.npm-global/lib/node_modules');
const ts = require('typescript');

const SRC_DIR = path.join(__dirname, '..', 'src');
const OUT_DIR = path.join(__dirname, '..', 'preview');
const manifest = require('./manifest');

function stripModuleSyntax(code) {
  const lines = code.split('\n');
  const out = [];
  let inImport = false;
  for (let line of lines) {
    if (inImport) {
      // keep dropping lines until the import statement closes (`from '...';`
      // or a bare `'...';` for side-effect-only imports).
      if (/from\s+['"][^'"]*['"]\s*;?\s*$/.test(line) || /^\s*['"][^'"]*['"]\s*;?\s*$/.test(line)) {
        inImport = false;
      }
      continue;
    }
    const trimmed = line.trim();
    if (/^import\b/.test(trimmed)) {
      // whole-line import (single-line form) — drop and continue scanning.
      const closesHere = /from\s+['"][^'"]*['"]\s*;?\s*$/.test(line) || /^import\s+['"][^'"]*['"]\s*;?\s*$/.test(trimmed);
      if (!closesHere) inImport = true;
      continue;
    }

    // export default X;  -> drop (App is grabbed explicitly at the end)
    if (/^\s*export\s+default\s+/.test(line)) {
      line = line.replace(/^\s*export\s+default\s+/, 'const __default__ = ');
    }
    // export function / export const / export interface / export type / export class
    line = line.replace(/^(\s*)export\s+(function|const|class|interface|type|enum|async function)\b/, '$1$2');
    out.push(line);
  }
  return out.join('\n');
}

function transpileFile(relPath) {
  const filePath = path.join(SRC_DIR, relPath);
  const raw = fs.readFileSync(filePath, 'utf8');
  if (/import\s*\{[^}]*\bas\b[^}]*\}\s*from/.test(raw)) {
    console.error(
      `[build] ${relPath}: aliased import ("X as Y") won't survive the zero-bundler strip — ` +
      `import the plain name and add a separate "const Y = X;" line instead.`,
    );
  }
  const stripped = stripModuleSyntax(raw);
  const result = ts.transpileModule(stripped, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      isolatedModules: false,
    },
    fileName: filePath,
    reportDiagnostics: true,
  });
  if (result.diagnostics && result.diagnostics.length) {
    const relevant = result.diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error);
    if (relevant.length) {
      const msg = relevant
        .map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))
        .join('\n');
      console.error(`\n[transpile error] ${relPath}:\n${msg}`);
    }
  }
  // TS sometimes synthesizes a bare `export {};` module marker (e.g. a
  // types-only file where every export gets erased). Strip any leftover
  // export statements the compiler emitted post-transpile.
  const cleaned = result.outputText
    .split('\n')
    .filter((line) => !/^\s*export\s*\{\s*\}\s*;?\s*$/.test(line))
    .join('\n');
  return `\n// ==== ${relPath} ====\n${cleaned}`;
}

const declRe = /^(?:const|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=|^function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/;

function checkForCollisions(chunksByFile) {
  const seen = new Map();
  let hasCollision = false;
  for (const [relPath, text] of chunksByFile) {
    for (const line of text.split('\n')) {
      const m = line.match(declRe);
      const name = m && (m[1] || m[2]);
      if (!name) continue;
      if (!seen.has(name)) seen.set(name, []);
      seen.get(name).push(relPath);
    }
  }
  for (const [name, files] of seen) {
    if (files.length > 1) {
      hasCollision = true;
      console.error(`[collision] top-level "${name}" declared in: ${files.join(', ')}`);
    }
  }
  return hasCollision;
}

function build() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const chunksByFile = manifest.map((relPath) => [relPath, transpileFile(relPath)]);
  if (checkForCollisions(chunksByFile)) {
    console.error('\nFix the collisions above (rename the duplicate local identifier in one file) and rebuild.');
    process.exit(1);
  }
  let combined = "'use strict';\n(function(){\n";
  combined += "const { useState, useEffect, useRef, useMemo, useCallback, useContext, createContext, Fragment } = React;\n";
  for (const [, text] of chunksByFile) {
    combined += text;
  }
  combined += `
  const rootEl = document.getElementById('root');
  const root = ReactDOM.createRoot(rootEl);
  root.render(React.createElement(App));
})();
`;
  const outFile = path.join(OUT_DIR, 'app.js');
  fs.writeFileSync(outFile, combined, 'utf8');
  console.log(`Built ${outFile} (${(combined.length / 1024).toFixed(1)} KB)`);
}

build();
