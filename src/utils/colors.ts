/**
 * Tokyo Night Theme Color Utilities
 * 
 * This module provides utility functions for consistent color application
 * across the Tokyo Night theme system.
 */

import { ThemeVariant, TokyoNightColors } from '../types/colors';
import { colorPalette, variantConfigs } from '../colors/variants';

/**
 * Get colors for a specific theme variant
 * @param variant - The theme variant to retrieve colors for
 * @returns The complete color palette for the specified variant
 */
export function getVariantColors(variant: ThemeVariant): TokyoNightColors {
  return colorPalette[variant];
}

/**
 * Get a specific color value using dot notation path
 * @param variant - The theme variant
 * @param colorPath - Dot notation path to the color (e.g., 'background.primary', 'semantic.blue')
 * @returns The hex color value
 */
export function getColor(variant: ThemeVariant, colorPath: string): string {
  const colors = getVariantColors(variant);
  const pathParts = colorPath.split('.');
  
  let current: any = colors;
  for (const part of pathParts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      throw new Error(`Invalid color path: ${colorPath} for variant: ${variant}`);
    }
  }
  
  if (typeof current !== 'string') {
    throw new Error(`Color path ${colorPath} does not resolve to a string value`);
  }
  
  return current;
}

/**
 * Get variant configuration including metadata
 * @param variant - The theme variant
 * @returns Configuration object with variant metadata
 */
export function getVariantConfig(variant: ThemeVariant) {
  return variantConfigs[variant];
}

/**
 * Check if a variant is a dark theme
 * @param variant - The theme variant to check
 * @returns True if the variant is a dark theme
 */
export function isDarkVariant(variant: ThemeVariant): boolean {
  return getVariantConfig(variant).isDark;
}

/**
 * Get all available theme variants
 * @returns Array of all available theme variant identifiers
 */
export function getAvailableVariants(): ThemeVariant[] {
  return Object.keys(colorPalette) as ThemeVariant[];
}

/**
 * Validate that a string is a valid theme variant
 * @param variant - String to validate
 * @returns True if the string is a valid theme variant
 */
export function isValidVariant(variant: string): variant is ThemeVariant {
  const availableVariants = getAvailableVariants();
  return availableVariants.indexOf(variant as ThemeVariant) !== -1;
}

/**
 * Generate CSS custom properties for a specific variant
 * @param variant - The theme variant
 * @param prefix - Optional prefix for CSS custom property names (default: '--tokyo-night')
 * @returns Object mapping CSS custom property names to color values
 */
export function generateCSSCustomProperties(
  variant: ThemeVariant, 
  prefix: string = '--tokyo-night'
): Record<string, string> {
  const colors = getVariantColors(variant);
  const properties: Record<string, string> = {};
  
  // Background colors
  properties[`${prefix}-bg-primary`] = colors.background.primary;
  properties[`${prefix}-bg-secondary`] = colors.background.secondary;
  properties[`${prefix}-bg-tertiary`] = colors.background.tertiary;
  
  // Text colors
  properties[`${prefix}-text-primary`] = colors.text.primary;
  properties[`${prefix}-text-secondary`] = colors.text.secondary;
  properties[`${prefix}-text-muted`] = colors.text.muted;
  
  // Semantic colors
  properties[`${prefix}-red`] = colors.semantic.red;
  properties[`${prefix}-orange`] = colors.semantic.orange;
  properties[`${prefix}-yellow`] = colors.semantic.yellow;
  properties[`${prefix}-green`] = colors.semantic.green;
  properties[`${prefix}-cyan`] = colors.semantic.cyan;
  properties[`${prefix}-blue`] = colors.semantic.blue;
  properties[`${prefix}-purple`] = colors.semantic.purple;
  
  // UI colors
  properties[`${prefix}-border`] = colors.ui.border;
  properties[`${prefix}-hover`] = colors.ui.hover;
  properties[`${prefix}-selection`] = colors.ui.selection;
  properties[`${prefix}-focus`] = colors.ui.focus;
  
  return properties;
}

/**
 * Generate CSS custom properties string for injection into stylesheets
 * @param variant - The theme variant
 * @param prefix - Optional prefix for CSS custom property names
 * @returns CSS string with custom properties
 */
export function generateCSSCustomPropertiesString(
  variant: ThemeVariant, 
  prefix: string = '--tokyo-night'
): string {
  const properties = generateCSSCustomProperties(variant, prefix);
  
  const cssLines: string[] = [];
  for (const property in properties) {
    if (properties.hasOwnProperty(property)) {
      cssLines.push(`  ${property}: ${properties[property]};`);
    }
  }
  
  return `:root {\n${cssLines.join('\n')}\n}`;
}

/**
 * Create a color mapping for Orca-specific CSS variables
 * @param variant - The theme variant
 * @returns Object mapping Orca CSS variables to Tokyo Night colors
 */
export function generateOrcaColorMapping(variant: ThemeVariant): Record<string, string> {
  const colors = getVariantColors(variant);
  
  return {
    // Orca background variables
    '--orca-color-bg-1': colors.background.primary,
    '--orca-color-bg-2': colors.background.secondary,
    
    // Orca text variables
    '--orca-color-text-1': colors.text.primary,
    '--orca-color-text-2': colors.text.secondary,
    '--orca-color-placeholder': colors.text.muted,
    
    // Orca UI variables
    '--orca-color-border': colors.ui.border,
    '--orca-border-general': `1px solid ${colors.ui.border}`,
    '--orca-color-separator': colors.ui.border,
    
    // Orca primary colors
    '--orca-color-primary-5': colors.semantic.blue,
    '--orca-color-primary-4': colors.semantic.blue,
    '--orca-color-tab': colors.semantic.blue,
    
    // Orca gray scale mapping
    '--orca-color-gray-7': colors.ui.hover,
    '--orca-color-gray-6': colors.text.muted,
    '--orca-color-gray-5': colors.text.muted,
    '--orca-color-gray-4': colors.text.muted,
  };
}

/**
 * Validate color contrast ratio for accessibility
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @returns Approximate contrast ratio
 */
export function calculateContrastRatio(foreground: string, background: string): number {
  // Simple luminance calculation for basic contrast checking
  // This is a simplified version - for production use, consider a full WCAG contrast library
  
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Validate that a variant meets basic accessibility requirements
 * @param variant - The theme variant to validate
 * @returns Object with validation results
 */
export function validateVariantAccessibility(variant: ThemeVariant) {
  const colors = getVariantColors(variant);
  
  const primaryTextContrast = calculateContrastRatio(
    colors.text.primary, 
    colors.background.primary
  );
  
  const secondaryTextContrast = calculateContrastRatio(
    colors.text.secondary, 
    colors.background.secondary
  );
  
  const focusContrast = calculateContrastRatio(
    colors.ui.focus, 
    colors.background.primary
  );
  
  return {
    variant,
    primaryTextContrast,
    secondaryTextContrast,
    focusContrast,
    meetsWCAGAA: primaryTextContrast >= 4.5 && secondaryTextContrast >= 3.0,
    meetsWCAGAAA: primaryTextContrast >= 7.0 && secondaryTextContrast >= 4.5,
  };
}