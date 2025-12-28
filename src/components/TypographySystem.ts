import { ThemeVariant, TokyoNightColors } from '../types/colors';
import { getVariantColors, calculateContrastRatio } from '../utils/colors';

export interface TypographyConfig {
  baseFontSize: string;
  lineHeights: { tight: number; normal: number; relaxed: number; };
  fontWeights: { light: number; normal: number; medium: number; semibold: number; bold: number; };
  spacing: { xs: string; sm: string; md: string; lg: string; xl: string; xxl: string; };
  contrastRequirements: { primary: number; secondary: number; code: number; };
}

export class TypographySystem {
  private currentVariant: ThemeVariant;
  private colors: TokyoNightColors;
  private config: TypographyConfig;
  private styleElement: HTMLStyleElement | null = null;
  private pluginId: string;

  constructor(variant: ThemeVariant, pluginId: string) {
    this.currentVariant = variant;
    this.colors = getVariantColors(variant);
    this.pluginId = pluginId;
    this.config = this.createTypographyConfig();
  }

  private createTypographyConfig(): TypographyConfig {
    return {
      baseFontSize: '14px',
      lineHeights: { tight: 1.2, normal: 1.6, relaxed: 1.8 },
      fontWeights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', xxl: '3rem' },
      contrastRequirements: { primary: 4.5, secondary: 3.0, code: 7.0 }
    };
  }

  public generateTypographyCSS(): string {
    return `body { font-size: ${this.config.baseFontSize}; color: ${this.colors.text.primary}; }`;
  }

  public apply(): void {
    this.remove();
    const css = this.generateTypographyCSS();
    const styleId = `${this.pluginId}-typography-system`;
    this.styleElement = document.createElement('style');
    this.styleElement.id = styleId;
    this.styleElement.textContent = css;
    if (document.head) { document.head.appendChild(this.styleElement); }
  }

  public remove(): void {
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }

  public updateVariant(variant: ThemeVariant): void {
    this.currentVariant = variant;
    this.colors = getVariantColors(variant);
    this.apply();
  }

  public validateAccessibility() {
    const primaryContrast = calculateContrastRatio(this.colors.text.primary, this.colors.background.primary);
    const secondaryContrast = calculateContrastRatio(this.colors.text.secondary, this.colors.background.secondary);
    const codeContrast = calculateContrastRatio(this.colors.text.primary, this.colors.background.tertiary);
    const meetsWCAG = primaryContrast >= 4.5 && secondaryContrast >= 3.0 && codeContrast >= 7.0;
    return { primaryTextContrast: primaryContrast, secondaryTextContrast: secondaryContrast, codeTextContrast: codeContrast, meetsWCAG, recommendations: [] };
  }

  public getConfig(): TypographyConfig { return { ...this.config }; }
  public updateConfig(newConfig: Partial<TypographyConfig>): void { this.config = { ...this.config, ...newConfig }; this.apply(); }
  public getCurrentVariant(): ThemeVariant { return this.currentVariant; }
}

export function createTypographySystem(variant: ThemeVariant, pluginId: string): TypographySystem {
  return new TypographySystem(variant, pluginId);
}
