/**
 * Property-Based Tests for Tokyo Night Color System Authenticity
 * 
 * Feature: tokyo-night-theme-improvements, Property 2: Tokyo Night Color Authenticity
 * Validates: Requirements 3.1, 3.2, 3.3, 3.5
 */

import { describe, test, expect } from 'vitest';
import * as fc from 'fast-check';
import { 
  tokyoNightColors, 
  tokyoNightStormColors, 
  tokyoNightLightColors, 
  colorPalette,
  variantConfigs 
} from './variants';
import { ThemeVariant, TokyoNightColors } from '../types/colors';
import { getVariantColors, getColor, isValidVariant } from '../utils/colors';

/**
 * Official Tokyo Night color specifications for validation
 * These are the canonical colors that must be preserved across all variants
 */
const OFFICIAL_TOKYO_NIGHT_COLORS = {
  // Night variant official colors
  night: {
    background: '#1a1b26',
    foreground: '#a9b1d6',
    red: '#f7768e',
    orange: '#ff9e64', 
    yellow: '#e0af68',
    green: '#9ece6a',
    cyan: '#7dcfff',
    blue: '#7aa2f7',
    purple: '#bb9af7',
    comment: '#565f89',
  },
  // Storm variant official colors
  storm: {
    background: '#24283b',
    foreground: '#a9b1d6',
    red: '#f7768e',
    orange: '#ff9e64',
    yellow: '#e0af68', 
    green: '#9ece6a',
    cyan: '#7dcfff',
    blue: '#7aa2f7',
    purple: '#bb9af7',
    comment: '#565f89',
  },
  // Light variant official colors (adjusted for light backgrounds)
  light: {
    background: '#d5d6db',
    foreground: '#343b58',
    red: '#8c4351',
    orange: '#965027',
    yellow: '#8f5e15',
    green: '#485e30',
    cyan: '#166775',
    blue: '#34548a',
    purple: '#5a4a78',
    comment: '#6c7394',
  }
} as const;

describe('Tokyo Night Color System Authenticity', () => {
  /**
   * Property 2: Tokyo Night Color Authenticity
   * For any theme variant (Night, Storm, Light), all applied colors should match 
   * the official Tokyo Night color palette, with semantic colors correctly assigned 
   * to their respective UI elements
   */
  test('Property 2: All variants maintain official Tokyo Night color authenticity', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        (variant: ThemeVariant) => {
          const colors = getVariantColors(variant);
          const officialColors = OFFICIAL_TOKYO_NIGHT_COLORS[variant];
          
          // Verify core semantic colors match official Tokyo Night specification
          expect(colors.semantic.red).toBe(officialColors.red);
          expect(colors.semantic.orange).toBe(officialColors.orange);
          expect(colors.semantic.yellow).toBe(officialColors.yellow);
          expect(colors.semantic.green).toBe(officialColors.green);
          expect(colors.semantic.cyan).toBe(officialColors.cyan);
          expect(colors.semantic.blue).toBe(officialColors.blue);
          expect(colors.semantic.purple).toBe(officialColors.purple);
          
          // Verify primary background matches official specification
          expect(colors.background.primary).toBe(officialColors.background);
          
          // Verify primary text matches official specification
          expect(colors.text.primary).toBe(officialColors.foreground);
          
          // Verify comment color matches official specification
          expect(colors.text.muted).toBe(officialColors.comment);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 2a: Semantic color assignments are consistent across variants', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.constantFrom('red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple'),
        (variant: ThemeVariant, semanticColor: keyof TokyoNightColors['semantic']) => {
          const colors = getVariantColors(variant);
          const colorValue = colors.semantic[semanticColor];
          
          // All semantic colors must be valid hex colors
          expect(colorValue).toMatch(/^#[0-9a-fA-F]{6}$/);
          
          // Semantic colors must match the official Tokyo Night specification for this variant
          const officialColors = OFFICIAL_TOKYO_NIGHT_COLORS[variant];
          expect(colorValue).toBe(officialColors[semanticColor]);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 2b: Color palette structure is complete and valid for all variants', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        (variant: ThemeVariant) => {
          const colors = getVariantColors(variant);
          
          // Verify all required color categories exist
          expect(colors).toHaveProperty('background');
          expect(colors).toHaveProperty('text');
          expect(colors).toHaveProperty('semantic');
          expect(colors).toHaveProperty('ui');
          
          // Verify background colors structure
          expect(colors.background).toHaveProperty('primary');
          expect(colors.background).toHaveProperty('secondary');
          expect(colors.background).toHaveProperty('tertiary');
          
          // Verify text colors structure
          expect(colors.text).toHaveProperty('primary');
          expect(colors.text).toHaveProperty('secondary');
          expect(colors.text).toHaveProperty('muted');
          
          // Verify semantic colors structure (all 7 Tokyo Night semantic colors)
          expect(colors.semantic).toHaveProperty('red');
          expect(colors.semantic).toHaveProperty('orange');
          expect(colors.semantic).toHaveProperty('yellow');
          expect(colors.semantic).toHaveProperty('green');
          expect(colors.semantic).toHaveProperty('cyan');
          expect(colors.semantic).toHaveProperty('blue');
          expect(colors.semantic).toHaveProperty('purple');
          
          // Verify UI colors structure
          expect(colors.ui).toHaveProperty('border');
          expect(colors.ui).toHaveProperty('hover');
          expect(colors.ui).toHaveProperty('selection');
          expect(colors.ui).toHaveProperty('focus');
          
          // All color values must be valid hex colors
          const allColors = [
            ...Object.values(colors.background),
            ...Object.values(colors.text),
            ...Object.values(colors.semantic),
            ...Object.values(colors.ui),
          ];
          
          allColors.forEach(color => {
            expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 2c: Color utility functions maintain authenticity', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        fc.constantFrom(
          'background.primary', 'background.secondary', 'background.tertiary',
          'text.primary', 'text.secondary', 'text.muted',
          'semantic.red', 'semantic.orange', 'semantic.yellow', 'semantic.green',
          'semantic.cyan', 'semantic.blue', 'semantic.purple',
          'ui.border', 'ui.hover', 'ui.selection', 'ui.focus'
        ),
        (variant: ThemeVariant, colorPath: string) => {
          // Color utility should return the same value as direct access
          const directColor = getVariantColors(variant);
          const utilityColor = getColor(variant, colorPath);
          
          const pathParts = colorPath.split('.');
          let expectedColor: any = directColor;
          for (const part of pathParts) {
            expectedColor = expectedColor[part];
          }
          
          expect(utilityColor).toBe(expectedColor);
          expect(utilityColor).toMatch(/^#[0-9a-fA-F]{6}$/);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 2d: Variant configurations maintain Tokyo Night identity', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('night', 'storm', 'light'),
        (variant: ThemeVariant) => {
          const config = variantConfigs[variant];
          
          // Verify variant configuration structure
          expect(config.variant).toBe(variant);
          expect(config.displayName).toContain('Tokyo Night');
          expect(config.colors).toBe(getVariantColors(variant));
          expect(typeof config.isDark).toBe('boolean');
          
          // Verify dark/light classification matches variant
          if (variant === 'light') {
            expect(config.isDark).toBe(false);
          } else {
            expect(config.isDark).toBe(true);
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 2e: Color palette registry maintains complete authenticity', () => {
    fc.assert(
      fc.property(
        fc.constant(null), // No input needed, testing the complete palette
        () => {
          // Verify all three variants are present
          expect(colorPalette).toHaveProperty('night');
          expect(colorPalette).toHaveProperty('storm');
          expect(colorPalette).toHaveProperty('light');
          
          // Verify each variant maintains official Tokyo Night colors
          Object.entries(OFFICIAL_TOKYO_NIGHT_COLORS).forEach(([variant, officialColors]) => {
            const paletteColors = colorPalette[variant as ThemeVariant];
            
            // Check core Tokyo Night semantic colors
            expect(paletteColors.semantic.red).toBe(officialColors.red);
            expect(paletteColors.semantic.blue).toBe(officialColors.blue);
            expect(paletteColors.semantic.green).toBe(officialColors.green);
            expect(paletteColors.background.primary).toBe(officialColors.background);
            expect(paletteColors.text.primary).toBe(officialColors.foreground);
          });
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});