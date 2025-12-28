/**
 * Tokyo Night Theme Color System Types
 * 
 * This module defines the TypeScript interfaces and types for the Tokyo Night color system,
 * supporting three variants: Night (darkest), Storm (medium dark), and Light.
 */

/**
 * Base color structure for background colors
 */
export interface BackgroundColors {
  /** Main editor background - highest priority content area */
  primary: string;
  /** Sidebar/panel background - secondary content areas */
  secondary: string;
  /** Modal/popup background - overlay content */
  tertiary: string;
}

/**
 * Text color hierarchy for different content types
 */
export interface TextColors {
  /** Main content text - highest readability */
  primary: string;
  /** UI labels and secondary text */
  secondary: string;
  /** Comments and disabled text - lowest prominence */
  muted: string;
}

/**
 * Tokyo Night semantic colors for syntax highlighting and UI elements
 */
export interface SemanticColors {
  /** Errors, keywords, critical elements */
  red: string;
  /** Numbers, constants, warnings */
  orange: string;
  /** Functions, warnings, highlights */
  yellow: string;
  /** Strings, success states, confirmations */
  green: string;
  /** Properties, info states, links */
  cyan: string;
  /** Functions, primary actions, focus states */
  blue: string;
  /** Keywords, special elements, accents */
  purple: string;
}

/**
 * UI interaction colors for states and feedback
 */
export interface UIColors {
  /** Borders and separators */
  border: string;
  /** Hover states and subtle interactions */
  hover: string;
  /** Selected items and active states */
  selection: string;
  /** Focus indicators and accessibility highlights */
  focus: string;
}

/**
 * Complete Tokyo Night color palette for a single variant
 */
export interface TokyoNightColors {
  background: BackgroundColors;
  text: TextColors;
  semantic: SemanticColors;
  ui: UIColors;
}

/**
 * Available Tokyo Night theme variants
 */
export type ThemeVariant = 'night' | 'storm' | 'light';

/**
 * Color palette registry containing all three variants
 */
export interface ColorPalette {
  night: TokyoNightColors;
  storm: TokyoNightColors;
  light: TokyoNightColors;
}

/**
 * Color utility function type for consistent color application
 */
export type ColorUtilityFunction = (variant: ThemeVariant, colorPath: string) => string;

/**
 * Theme variant configuration with metadata
 */
export interface ThemeVariantConfig {
  /** Variant identifier */
  variant: ThemeVariant;
  /** Human-readable display name */
  displayName: string;
  /** Color palette for this variant */
  colors: TokyoNightColors;
  /** Whether this is a dark theme variant */
  isDark: boolean;
}