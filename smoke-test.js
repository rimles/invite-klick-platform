#!/usr/bin/env node
/**
 * Lightweight smoke test for the generated preview/app.js.
 *
 * We don't have network access to a real React build in this sandbox, so
 * this implements a minimal fake React (createElement + hooks + context)
 * that actually WALKS the full component tree for every route, calling
 * every function component along the way. This surfaces ReferenceErrors,
 * undefined-property crashes, and similar bugs from the manual multi-file
 * concatenation — the main risk in this build approach — without needing
 * a real browser or CDN access.
 *
 * It does not verify pixel-level visuals; it verifies the app *runs*.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const FRAGMENT = Symbol('Fragment');

function createFakeReact() {
  function createElement(type, props, ...children) {
    const finalProps = Object.assign({}, props);
    if (children.length === 1) finalProps.children = children[0];
    else if (children.length > 1) finalProps.children = children;
    return { type, props: finalProps };
  }

  function useState(initial) {
    const value = typeof initial === 'function' ? initial() : initial;
    return [value, () => {}];
  }
  function useEffect(fn) {
    try {
      const cleanup = fn && fn();
      if (typeof cleanup === 'function') cleanup();
    } catch (e) {
      throw new Error(`useEffect threw: ${e.stack}`);
    }
  }
  function useRef(initial) {
    return { current: initial };
  }
  function useMemo(fn) {
    return fn();
  }
  function useCallback(fn) {
    return fn;
  }
  function createContext(defaultValue) {
    const ctx = { _stack: [defaultValue] };
    const Provider = function (props) {
      return props.children;
    };
    Provider._providerFor = ctx;
    ctx.Provider = Provider;
    ctx.Consumer = function (props) {
      return props.children ? props.children(ctx._stack[ctx._stack.length - 1]) : null;
    };
    return ctx;
  }
  function useContext(ctx) {
    return ctx._stack[ctx._stack.length - 1];
  }

  const React = {
    createElement,
    Fragment: FRAGMENT,
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
    useContext,
    createContext,
    createRef: () => ({ current: null }),
  };
  return React;
}

let callCount = 0;
function renderTree(el, depth = 0) {
  callCount += 1;
  if (callCount > 200000) throw new Error('Render tree exceeded safety limit (possible infinite loop)');
  if (el === null || el === undefined || typeof el === 'boolean' || typeof el === 'string' || typeof el === 'number') return;
  if (Array.isArray(el)) {
    el.forEach((child) => renderTree(child, depth));
    return;
  }
  if (typeof el !== 'object' || !('type' in el)) return;
  const { type, props } = el;
  if (type === FRAGMENT || typeof type === 'string') {
    renderTree(props && props.children, depth);
    return;
  }
  if (typeof type === 'function') {
    if (type._providerFor) {
      const ctx = type._providerFor;
      ctx._stack.push(props.value);
      try {
        renderTree(props.children, depth + 1);
      } finally {
        ctx._stack.pop();
      }
      return;
    }
    let result;
    try {
      result = type(props || {});
    } catch (e) {
      const name = type.name || '(anonymous)';
      throw new Error(`Component "${name}" threw during render:\n${e.stack}`);
    }
    renderTree(result, depth + 1);
    return;
  }
  // unknown type shape — ignore
}

function buildSandbox() {
  const listeners = {};
  const fakeWindow = {
    location: { hash: '' },
    addEventListener: (evt, fn) => { (listeners[evt] = listeners[evt] || []).push(fn); },
    removeEventListener: () => {},
    scrollTo: () => {},
    setInterval: (fn, ms) => setInterval(fn, ms),
    clearInterval: (id) => clearInterval(id),
    innerWidth: 1280,
  };
  const fakeDocument = {
    getElementById: () => ({}),
    addEventListener: () => {},
    removeEventListener: () => {},
    createElement: () => ({ style: {} }),
  };
  const React = createFakeReact();
  const ReactDOM = {
    createRoot: () => ({
      render: (el) => renderTree(el),
    }),
  };
  const sandbox = {
    window: fakeWindow,
    document: fakeDocument,
    React,
    ReactDOM,
    console,
    btoa: (s) => Buffer.from(s, 'binary').toString('base64'),
    atob: (s) => Buffer.from(s, 'base64').toString('binary'),
    setInterval,
    clearInterval,
    setTimeout,
    clearTimeout,
    Date,
    Math,
    JSON,
    Array,
    Object,
    String,
    Number,
    Boolean,
    Symbol,
    RegExp,
    Map,
    Set,
    Promise,
    require: undefined,
  };
  sandbox.globalThis = sandbox;
  return { sandbox, fakeWindow, listeners };
}

const ROUTES = [
  '/',
  '/features',
  '/templates',
  '/pricing',
  '/dashboard',
  '/dashboard/invitations',
  '/dashboard/invitations/new',
  '/dashboard/invitations/david-servaa-wedding',
  '/dashboard/invitations/david-servaa-wedding/edit',
  '/dashboard/invitations/david-servaa-wedding/guests',
  '/dashboard/invitations/david-servaa-wedding/seating',
  '/dashboard/invitations/david-servaa-wedding/qr',
  '/dashboard/invitations/david-servaa-wedding/analytics',
  '/dashboard/templates',
  '/dashboard/media',
  '/dashboard/guests',
  '/dashboard/music',
  '/dashboard/qr',
  '/dashboard/seating',
  '/dashboard/settings',
  '/invite/david-and-serwaa',
  '/invite/david-and-serwaa/rsvp',
  '/invite/david-and-serwaa/schedule',
  '/invite/david-and-serwaa/gallery',
  '/invite/david-and-serwaa/qr',
  '/invite/kofi-and-ama',
  '/invite/the-mensahs-25th',
  '/guest',
  '/guest/gallery',
  '/guest/qr',
  '/nonexistent-route-xyz',
];

function run() {
  const appJsPath = path.join(__dirname, '..', 'preview', 'app.js');
  const code = fs.readFileSync(appJsPath, 'utf8');

  // Basic syntax check first.
  try {
    new vm.Script(code, { filename: 'app.js' });
  } catch (e) {
    console.error('SYNTAX ERROR in app.js:\n', e.message);
    process.exit(1);
  }

  let failures = 0;
  for (const route of ROUTES) {
    const { sandbox, fakeWindow } = buildSandbox();
    fakeWindow.location.hash = `#${route}`;
    const ctx = vm.createContext(sandbox);
    callCount = 0;
    try {
      vm.runInContext(code, ctx, { filename: 'app.js' });
      console.log(`OK    ${route}`);
    } catch (e) {
      failures += 1;
      console.error(`FAIL  ${route}\n      ${e.message.split('\n').join('\n      ')}`);
    }
  }

  console.log(`\n${ROUTES.length - failures}/${ROUTES.length} routes rendered without throwing.`);
  if (failures > 0) process.exit(1);
}

run();
