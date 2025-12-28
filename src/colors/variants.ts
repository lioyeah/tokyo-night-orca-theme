/**
 * Tokyo Night Theme Color Variants
 * 
 * This module defines the official Tokyo Night color palettes for all three variants:
 * Night (darkest), Storm (medium dark), and Light.
 * 
 * All colors are sourced from the official Tokyo Night theme specification.
 */

import { TokyoNightColors, ColorPalette } from '../types/colors';

/**
 * Tokyo Night (Night variant) - The darkest theme variant
 * Official colors from the Tokyo Night theme specification
 */
export const tokyoNightColors: TokyoNightColors = {
  background: {
    primary: '#1a1b26',    // Editor background (Night)
    secondary: '#16161e',   // Sidebar background (darker)
    tertiary: '#24283b',    // Modal background
  },
  text: {
    primary: '#a9b1d6',     // Main text (Editor Foreground)
    secondary: '#9aa5ce',   // Secondary text (Markdown/HTML Text)
    muted: '#565f89',       // Comments and disabled text
  },
  semantic: {
    red: '#f7768e',         // Keywords, errors
    orange: '#ff9e64',      // Numbers, constants
    yellow: '#e0af68',      // Functions, warnings
    green: '#9ece6a',       // Strings, success
    cyan: '#7dcfff',        // Properties, info
    blue: '#7aa2f7',        // Functions, primary actions
    purple: '#bb9af7',      // Keywords, special elements
  },
  ui: {
    border: '#292e42',      // Subtle borders (Highlight)
    hover: '#414868',       // Hover states (Terminal Black)
    selection: '#364a82',   // Selection background
    focus: '#7aa2f7',       // Focus indicators (Terminal Blue)
  }
};

/**
 * Tokyo Night Storm - Medium dark variant
 * Lighter than Night but still dark theme
 */
export const tokyoNightStormColors: TokyoNightColors = {
  background: {
    primary: '#24283b',     // Lighter than Night
    secondary: '#1f2335',   // Sidebar background
    tertiary: '#292e42',    // Modal background
  },
  text: {
    primary: '#a9b1d6',     // Same as Night for consistency
    secondary: '#9aa5ce',   // Same as Night for consistency
    muted: '#565f89',       // Same as Night for consistency
  },
  semantic: {
    red: '#f7768e',         // Same semantic colors as Night
    orange: '#ff9e64',      // Maintains color relationships
    yellow: '#e0af68',      // Consistent across variants
    green: '#9ece6a',       // Preserves Tokyo Night identity
    cyan: '#7dcfff',        // Authentic Tokyo Night colors
    blue: '#7aa2f7',        // Primary action color
    purple: '#bb9af7',      // Special elements
  },
  ui: {
    border: '#3b4261',      // Slightly lighter borders
    hover: '#4a5374',       // Adjusted for Storm background
    selection: '#3d59a1',   // Selection with Storm adjustment
    focus: '#7aa2f7',       // Same focus color for consistency
  }
};

/**
 * Tokyo Night Light - Light theme variant
 * Inverted color relationships while maintaining Tokyo Night character
 */
export const tokyoNightLightColors: TokyoNightColors = {
  background: {
    primary: '#d5d6db',     // Light editor background
    secondary: '#e9e9ed',   // Light sidebar background
    tertiary: '#ffffff',    // Light modal background
  },
  text: {
    primary: '#343b58',     // Dark text on light background
    secondary: '#4f5b93',   // Secondary dark text
    muted: '#6c7394',       // Muted text (readable on light)
  },
  semantic: {
    red: '#8c4351',         // Adjusted red for light background
    orange: '#965027',      // Adjusted orange for readability
    yellow: '#8f5e15',      // Adjusted yellow for contrast
    green: '#485e30',       // Adjusted green for light theme
    cyan: '#166775',        // Adjusted cyan for visibility
    blue: '#34548a',        // Adjusted blue for light background
    purple: '#5a4a78',      // Adjusted purple for contrast
  },
  ui: {
    border: '#c4c8da',      // Light borders
    hover: '#b6bbd9',       // Light hover states
    selection: '#a8aed6',   // Light selection
    focus: '#34548a',       // Focus indicators (adjusted blue)
  }
};

/**
 * Complete color palette registry containing all three variants
 */
export const colorPalette: ColorPalette = {
  night: tokyoNightColors,
  storm: tokyoNightStormColors,
  light: tokyoNightLightColors,
};

/**
 * Variant metadata for theme management
 */
export const variantConfigs = {
  night: {
    variant: 'night' as const,
    displayName: 'Tokyo Night',
    colors: tokyoNightColors,
    isDark: true,
  },
  storm: {
    variant: 'storm' as const,
    displayName: 'Tokyo Night Storm',
    colors: tokyoNightStormColors,
    isDark: true,
  },
  light: {
    variant: 'light' as const,
    displayName: 'Tokyo Night Light',
    colors: tokyoNightLightColors,
    isDark: false,
  },
} as const;