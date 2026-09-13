import type { EventTheme } from '../types';

// ============================================================================
// SYSTEM A — Invite Klick Platform identity (stable, never recolored by events)
// ============================================================================
export const platform = {
  burgundy: '#482337',
  ivory: '#FBF8F5',
  cream: '#F4EFE9',
  white: '#FFFFFF',
  charcoal: '#241A1C',
  textSecondary: '#6F6467',
  textMuted: '#9A8F91',
  border: '#E9E1D8',
  blush: '#F1D9DD',
  champagne: '#EADFCF',
};

// ============================================================================
// SYSTEM B — Event identity palettes (curated). These drive --event-* vars.
// ============================================================================
export const curatedThemes: EventTheme[] = [
  {
    id: 'romantic',
    name: 'Romantic',
    category: 'Romantic',
    primary: '#7A2E42',
    secondary: '#EADFCF',
    accent: '#F1D9DD',
    background: '#FBF6F3',
    surface: '#FFFFFF',
    text: '#2B1B1F',
    muted: '#8A7478',
    swatchLabel: 'Burgundy · Champagne · Blush',
  },
  {
    id: 'garden',
    name: 'Garden',
    category: 'Garden',
    primary: '#4B5D45',
    secondary: '#F1EBDD',
    accent: '#B5714F',
    background: '#F8F7F1',
    surface: '#FFFFFF',
    text: '#2A2E24',
    muted: '#7C8271',
    swatchLabel: 'Sage · Cream · Terracotta',
  },
  {
    id: 'royal',
    name: 'Royal',
    category: 'Royal',
    primary: '#152447',
    secondary: '#C9A44C',
    accent: '#EDE7D9',
    background: '#F7F6F2',
    surface: '#FFFFFF',
    text: '#151B29',
    muted: '#6E7488',
    swatchLabel: 'Navy · Gold · Ivory',
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'Modern',
    primary: '#141414',
    secondary: '#FFFFFF',
    accent: '#B8B8B8',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#141414',
    muted: '#7A7A7A',
    swatchLabel: 'Black · White · Silver',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'Minimal',
    primary: '#5C5450',
    secondary: '#FFFFFF',
    accent: '#2B2725',
    background: '#F6F4F2',
    surface: '#FFFFFF',
    text: '#2B2725',
    muted: '#8C8480',
    swatchLabel: 'Stone · White · Charcoal',
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    category: 'Vibrant',
    primary: '#C23B6B',
    secondary: '#F0883E',
    accent: '#7A4FC2',
    background: '#FDF6F2',
    surface: '#FFFFFF',
    text: '#2B1B22',
    muted: '#8A7478',
    swatchLabel: 'Pink · Orange · Purple',
  },
];

export function themeToCssVars(theme: EventTheme): Record<string, string> {
  return {
    '--event-primary': theme.primary,
    '--event-secondary': theme.secondary,
    '--event-accent': theme.accent,
    '--event-background': theme.background,
    '--event-surface': theme.surface,
    '--event-text': theme.text,
    '--event-muted': theme.muted,
  };
}

export function getThemeById(id: string): EventTheme {
  return curatedThemes.find((t) => t.id === id) || curatedThemes[0];
}
