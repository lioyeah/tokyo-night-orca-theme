/**
 * Theme Variant Manager for Tokyo Night Theme
 * 
 * This class manages switching between Tokyo Night variants (Night, Storm, Light),
 * system preference detection, theme registration updates, and visual hierarchy control.
 * 
 * 集成了视觉层次控制器，实现编辑器优先、侧边栏弱化的设计哲学。
 * 
 * Requirements: 7.1, 7.2, 7.4
 */

import { ThemeVariant, ThemeVariantConfig } from '../types/colors';
import { getVariantConfig, getAvailableVariants, isValidVariant, isDarkVariant } from '../utils/colors';
import { variantConfigs } from '../colors/variants';
import { generateBaseBackgroundCSS, generateSidebarCSS, generateSettingsModalCSS } from '../styles/cssGenerator';
import { VisualHierarchyController, createVisualHierarchyController } from '../components/VisualHierarchyController';
import { SidebarStyleManager, createSidebarStyleManager } from '../components/SidebarStyleManager';
import { AnimationSystem, createAnimationSystem } from '../components/AnimationSystem';
import { UIComponentStyleManager, createUIComponentStyleManager } from '../components/UIComponentStyleManager';
import { SemanticColorManager, createSemanticColorManager } from '../components/SemanticColorManager';
import { SystemIntegrationEnhancer, createSystemIntegrationEnhancer, SystemPreferenceChangeEvent } from '../components/SystemIntegrationEnhancer';
import { ErrorHandlingManager, createErrorHandlingManager, ErrorType, ErrorSeverity } from '../components/ErrorHandlingManager';

/**
 * Interface for theme variant manager functionality
 */
export interface IThemeVariantManager {
  currentVariant: ThemeVariant;
  switchVariant(variant: ThemeVariant): Promise<void>;
  getVariantColors(variant: ThemeVariant): import('../types/colors').TokyoNightColors;
  applyVariant(variant: ThemeVariant): void;
  detectSystemPreference(): 'light' | 'dark';
  registerAllVariants(): Promise<void>;
  unregisterAllVariants(): Promise<void>;
}

/**
 * Style holder for managing dynamic CSS injection
 */
interface StyleHolder {
  el: HTMLStyleElement | null;
}

/**
 * Style holders for different CSS sections
 */
interface StyleHolders {
  baseBackground: StyleHolder;
  sidebar: StyleHolder;
  settingsModal: StyleHolder;
  visualHierarchy: StyleHolder; // 新增：视觉层次样式
  animations: StyleHolder; // 新增：动画系统样式
  uiComponents: StyleHolder; // 新增：UI组件样式
  semanticColors: StyleHolder; // 新增：语义颜色样式
}

/**
 * Theme Variant Manager Class
 * 
 * Manages switching between Tokyo Night variants and maintains consistent behavior
 * across all theme operations. Integrates visual hierarchy control for editor-focused design.
 */
export class ThemeVariantManager implements IThemeVariantManager {
  private _currentVariant: ThemeVariant = 'night';
  private _pluginId: string;
  private _styleHolders: StyleHolders;
  private _systemPreferenceMediaQuery: MediaQueryList | null = null;
  private _systemPreferenceListener: ((event: MediaQueryListEvent) => void) | null = null;
  private _autoSwitchEnabled: boolean = false;
  private _visualHierarchyController: VisualHierarchyController | null = null; // 新增：视觉层次控制器
  private _sidebarStyleManager: SidebarStyleManager | null = null; // 新增：侧边栏样式管理器
  private _animationSystem: AnimationSystem | null = null; // 新增：动画系统
  private _uiComponentStyleManager: UIComponentStyleManager | null = null; // 新增：UI组件样式管理器
  private _semanticColorManager: SemanticColorManager | null = null; // 新增：语义颜色管理器
  private _systemIntegrationEnhancer: SystemIntegrationEnhancer | null = null; // 新增：系统集成增强器
  private _errorHandlingManager: ErrorHandlingManager | null = null; // 新增：错误处理管理器

  constructor(pluginId: string) {
    this._pluginId = pluginId;
    this._styleHolders = {
      baseBackground: { el: null },
      sidebar: { el: null },
      settingsModal: { el: null },
      visualHierarchy: { el: null }, // 新增：视觉层次样式持有者
      animations: { el: null }, // 新增：动画系统样式持有者
      uiComponents: { el: null }, // 新增：UI组件样式持有者
      semanticColors: { el: null } // 新增：语义颜色样式持有者
    };
    
    // 初始化视觉层次控制器
    this._visualHierarchyController = createVisualHierarchyController(this._currentVariant, this._pluginId);
    
    // 初始化侧边栏样式管理器
    this._sidebarStyleManager = createSidebarStyleManager(this._currentVariant, this._pluginId);
    
    // 初始化动画系统
    this._animationSystem = createAnimationSystem(this._pluginId);
    
    // 初始化UI组件样式管理器
    this._uiComponentStyleManager = createUIComponentStyleManager(this._currentVariant, this._pluginId);
    
    // 初始化语义颜色管理器
    this._semanticColorManager = createSemanticColorManager(this._currentVariant, this._pluginId);
    
    // 初始化系统集成增强器
    this._systemIntegrationEnhancer = createSystemIntegrationEnhancer({
      autoSwitchEnabled: this._autoSwitchEnabled,
      debugLogging: false // 可以根据需要启用调试
    });
    
    // 初始化错误处理管理器
    this._errorHandlingManager = createErrorHandlingManager(this._pluginId, {
      defaultVariant: this._currentVariant,
      enableAutoRecovery: true,
      maxRetryAttempts: 3,
      retryDelay: 1000,
      enableFallbackStyles: true
    });
    
    // 注册组件到错误处理管理器
    this._errorHandlingManager.registerThemeManager(this);
    this._errorHandlingManager.registerSystemIntegration(this._systemIntegrationEnhancer);
    
    // 设置系统偏好变化回调
    this._systemIntegrationEnhancer.onPreferenceChange(this.handleSystemPreferenceChange.bind(this));
    
    this.initializeSystemPreferenceDetection();
  }

  /**
   * Get the current theme variant
   */
  get currentVariant(): ThemeVariant {
    return this._currentVariant;
  }

  /**
   * Switch to a different theme variant
   * @param variant - The variant to switch to
   */
  async switchVariant(variant: ThemeVariant): Promise<void> {
    if (!isValidVariant(variant)) {
      const error = new Error(`Invalid theme variant: ${variant}. Available variants: ${getAvailableVariants().join(', ')}`);
      
      // 报告错误到错误处理管理器
      if (this._errorHandlingManager) {
        await this._errorHandlingManager.reportError({
          type: ErrorType.VARIANT_SWITCH_FAILED,
          severity: ErrorSeverity.MEDIUM,
          message: error instanceof Error ? error.message : String(error),
          timestamp: Date.now(),
          context: { requestedVariant: variant, availableVariants: getAvailableVariants() }
        });
      }
      
      throw error;
    }

    if (this._currentVariant === variant) {
      // Already using this variant, no need to switch
      return;
    }

    const previousVariant = this._currentVariant;
    this._currentVariant = variant;

    try {
      // 保存当前成功状态
      if (this._errorHandlingManager) {
        this._errorHandlingManager.saveSuccessfulState();
      }

      // Update visual hierarchy controller with new variant
      if (this._visualHierarchyController) {
        this._visualHierarchyController.updateVariant(variant);
      }
      
      // Update sidebar style manager with new variant
      if (this._sidebarStyleManager) {
        this._sidebarStyleManager.updateVariant(variant);
      }
      
      // Update UI component style manager with new variant
      if (this._uiComponentStyleManager) {
        this._uiComponentStyleManager.updateVariant(variant);
      }
      
      // Update semantic color manager with new variant
      if (this._semanticColorManager) {
        this._semanticColorManager.updateVariant(variant);
      }
      
      // Apply the new variant
      this.applyVariant(variant);
      
      // Update Orca theme registration if needed
      await this.updateThemeRegistration(variant);
      
      console.log(`[${this._pluginId}] Successfully switched from ${previousVariant} to ${variant} variant`);
    } catch (error) {
      // Rollback on error
      this._currentVariant = previousVariant;
      
      // 报告错误到错误处理管理器
      if (this._errorHandlingManager) {
        await this._errorHandlingManager.reportError({
          type: ErrorType.VARIANT_SWITCH_FAILED,
          severity: ErrorSeverity.HIGH,
          message: `Failed to switch to variant ${variant}: ${error instanceof Error ? error.message : String(error)}`,
          timestamp: Date.now(),
          context: { 
            requestedVariant: variant, 
            previousVariant, 
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
          }
        });
      }
      
      // 尝试回滚组件状态
      try {
        if (this._visualHierarchyController) {
          this._visualHierarchyController.updateVariant(previousVariant);
        }
        if (this._sidebarStyleManager) {
          this._sidebarStyleManager.updateVariant(previousVariant);
        }
        if (this._uiComponentStyleManager) {
          this._uiComponentStyleManager.updateVariant(previousVariant);
        }
        if (this._semanticColorManager) {
          this._semanticColorManager.updateVariant(previousVariant);
        }
      } catch (rollbackError) {
        console.error(`[${this._pluginId}] Rollback failed:`, rollbackError);
        
        // 报告回滚失败
        if (this._errorHandlingManager) {
          await this._errorHandlingManager.reportError({
            type: ErrorType.COMPONENT_UPDATE_FAILED,
            severity: ErrorSeverity.CRITICAL,
            message: `Rollback failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`,
            timestamp: Date.now(),
            context: { rollbackError: rollbackError instanceof Error ? rollbackError.message : String(rollbackError) }
          });
        }
      }
      
      console.error(`[${this._pluginId}] Failed to switch to variant ${variant}, rolling back to ${previousVariant}:`, error);
      throw error;
    }
  }

  /**
   * Get colors for a specific variant
   * @param variant - The theme variant
   * @returns The complete color palette for the variant
   */
  getVariantColors(variant: ThemeVariant) {
    return getVariantConfig(variant).colors;
  }

  /**
   * Apply a theme variant by updating CSS
   * @param variant - The variant to apply
   */
  applyVariant(variant: ThemeVariant): void {
    if (!isValidVariant(variant)) {
      const error = new Error(`Cannot apply invalid variant: ${variant}`);
      
      // 报告错误到错误处理管理器
      if (this._errorHandlingManager) {
        this._errorHandlingManager.reportError({
          type: ErrorType.THEME_LOADING_FAILED,
          severity: ErrorSeverity.HIGH,
          message: error.message,
          timestamp: Date.now(),
          context: { variant }
        });
      }
      
      throw error;
    }

    try {
      // Generate CSS for the variant with visual hierarchy integration
      const baseCSS = generateBaseBackgroundCSS(variant, this._pluginId);
      const sidebarCSS = generateSidebarCSS(variant, this._pluginId); // 传递pluginId以使用增强的侧边栏样式
      const settingsModalCSS = generateSettingsModalCSS(variant);

      // Apply the CSS to the document
      this.applyStyle(baseCSS, true, this._styleHolders.baseBackground, 'tokyo-night-base');
      this.applyStyle(sidebarCSS, true, this._styleHolders.sidebar, 'tokyo-night-sidebar');
      this.applyStyle(settingsModalCSS, true, this._styleHolders.settingsModal, 'tokyo-night-settings');

      // Apply visual hierarchy styles
      if (this._visualHierarchyController) {
        this._visualHierarchyController.apply();
      }

      // Apply sidebar styles
      if (this._sidebarStyleManager) {
        this._sidebarStyleManager.apply();
      }

      // Apply UI component styles
      if (this._uiComponentStyleManager) {
        this._uiComponentStyleManager.apply();
      }

      // Apply semantic color styles
      if (this._semanticColorManager) {
        this._semanticColorManager.apply();
      }

      // Apply animation system styles
      if (this._animationSystem) {
        const animationCSS = this._animationSystem.generateAnimationCSS(variant);
        this.applyStyle(animationCSS, true, this._styleHolders.animations, 'tokyo-night-animations');
      }

      console.log(`[${this._pluginId}] Applied ${variant} variant styles with visual hierarchy`);
    } catch (error) {
      // 报告错误到错误处理管理器
      if (this._errorHandlingManager) {
        this._errorHandlingManager.reportError({
          type: ErrorType.THEME_LOADING_FAILED,
          severity: ErrorSeverity.HIGH,
          message: `Failed to apply variant ${variant}: ${error instanceof Error ? error.message : String(error)}`,
          timestamp: Date.now(),
          context: { variant, error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined }
        });
      }
      
      console.error(`[${this._pluginId}] Failed to apply variant ${variant}:`, error);
      throw error;
    }
  }

  /**
   * Detect system preference for light/dark mode
   * @returns 'light' or 'dark' based on system preference
   */
  detectSystemPreference(): 'light' | 'dark' {
    if (this._systemIntegrationEnhancer) {
      return this._systemIntegrationEnhancer.detectSystemPreference();
    }
    
    // 回退到原始实现
    if (typeof window === 'undefined' || !window.matchMedia) {
      // Fallback for environments without matchMedia support
      return 'dark';
    }

    try {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return darkModeQuery.matches ? 'dark' : 'light';
    } catch (error) {
      console.warn(`[${this._pluginId}] Failed to detect system preference:`, error);
      return 'dark'; // Default fallback
    }
  }

  /**
   * Enable automatic theme switching based on system preferences
   * @param enabled - Whether to enable automatic switching
   */
  setAutoSwitchEnabled(enabled: boolean): void {
    this._autoSwitchEnabled = enabled;
    
    // 更新系统集成增强器
    if (this._systemIntegrationEnhancer) {
      this._systemIntegrationEnhancer.setAutoSwitchEnabled(enabled);
    } else {
      // 回退到原始实现
      if (enabled) {
        this.setupSystemPreferenceListener();
        // Apply current system preference immediately
        this.applySystemPreference();
      } else {
        this.removeSystemPreferenceListener();
      }
    }
  }

  /**
   * Get whether auto-switching is enabled
   */
  get autoSwitchEnabled(): boolean {
    if (this._systemIntegrationEnhancer) {
      return this._systemIntegrationEnhancer.autoSwitchEnabled;
    }
    return this._autoSwitchEnabled;
  }

  /**
   * Register all Tokyo Night variants with Orca
   */
  async registerAllVariants(): Promise<void> {
    if (typeof orca === 'undefined' || !orca?.themes?.register) {
      const error = new Error('Orca themes API not available');
      
      // 报告错误到错误处理管理器
      if (this._errorHandlingManager) {
        await this._errorHandlingManager.reportError({
          type: ErrorType.ORCA_API_UNAVAILABLE,
          severity: ErrorSeverity.HIGH,
          message: error.message,
          timestamp: Date.now(),
          context: { 
            orcaAvailable: typeof orca !== 'undefined',
            themesAPIAvailable: !!(orca?.themes),
            registerMethodAvailable: !!(orca?.themes?.register)
          }
        });
      }
      
      throw error;
    }

    const variants = getAvailableVariants();
    const registrationPromises = variants.map(async (variant) => {
      const config = getVariantConfig(variant);
      const themeId = `${this._pluginId}-${variant}`;
      const cssFile = `dist/theme-${variant}.css`;
      
      try {
        orca.themes!.register(themeId, config.displayName, cssFile);
        console.log(`[${this._pluginId}] Registered variant: ${config.displayName}`);
      } catch (error) {
        // 报告单个变体注册失败
        if (this._errorHandlingManager) {
          await this._errorHandlingManager.reportError({
            type: ErrorType.ORCA_API_UNAVAILABLE,
            severity: ErrorSeverity.MEDIUM,
            message: `Failed to register variant ${variant}: ${error instanceof Error ? error.message : String(error)}`,
            timestamp: Date.now(),
            context: { variant, themeId, cssFile, error: error instanceof Error ? error.message : String(error) }
          });
        }
        
        console.error(`[${this._pluginId}] Failed to register variant ${variant}:`, error);
        throw error;
      }
    });

    await Promise.all(registrationPromises);
  }

  /**
   * Unregister all Tokyo Night variants from Orca
   */
  async unregisterAllVariants(): Promise<void> {
    if (typeof orca === 'undefined' || !orca?.themes?.unregister) {
      console.warn(`[${this._pluginId}] Orca themes API not available for unregistration`);
      return;
    }

    const variants = getAvailableVariants();
    const unregistrationPromises = variants.map(async (variant) => {
      const config = getVariantConfig(variant);
      
      try {
        orca.themes!.unregister(config.displayName);
        console.log(`[${this._pluginId}] Unregistered variant: ${config.displayName}`);
      } catch (error) {
        console.warn(`[${this._pluginId}] Failed to unregister variant ${variant}:`, error);
      }
    });

    await Promise.all(unregistrationPromises);
  }

  /**
   * Clean up resources and remove styles
   */
  cleanup(): void {
    try {
      // Remove all applied styles
      this.applyStyle('', false, this._styleHolders.baseBackground, 'tokyo-night-base');
      this.applyStyle('', false, this._styleHolders.sidebar, 'tokyo-night-sidebar');
      this.applyStyle('', false, this._styleHolders.settingsModal, 'tokyo-night-settings');
      this.applyStyle('', false, this._styleHolders.animations, 'tokyo-night-animations');
      this.applyStyle('', false, this._styleHolders.semanticColors, 'tokyo-night-semantic-colors');

      // Clean up visual hierarchy controller
      if (this._visualHierarchyController) {
        this._visualHierarchyController.remove();
        this._visualHierarchyController = null;
      }

      // Clean up sidebar style manager
      if (this._sidebarStyleManager) {
        this._sidebarStyleManager.remove();
        this._sidebarStyleManager = null;
      }

      // Clean up UI component style manager
      if (this._uiComponentStyleManager) {
        this._uiComponentStyleManager.remove();
        this._uiComponentStyleManager = null;
      }

      // Clean up semantic color manager
      if (this._semanticColorManager) {
        this._semanticColorManager.remove();
        this._semanticColorManager = null;
      }

      // Clean up system integration enhancer
      if (this._systemIntegrationEnhancer) {
        this._systemIntegrationEnhancer.cleanup();
        this._systemIntegrationEnhancer = null;
      }

      // Clean up error handling manager
      if (this._errorHandlingManager) {
        this._errorHandlingManager.cleanup();
        this._errorHandlingManager = null;
      }

      // Clean up animation system
      this._animationSystem = null;

      // Remove system preference listener (fallback)
      this.removeSystemPreferenceListener();

      console.log(`[${this._pluginId}] ThemeVariantManager cleaned up`);
    } catch (error) {
      console.error(`[${this._pluginId}] Error during cleanup:`, error);
      
      // 即使在清理过程中出错，也要报告错误
      if (this._errorHandlingManager) {
        this._errorHandlingManager.reportError({
          type: ErrorType.COMPONENT_UPDATE_FAILED,
          severity: ErrorSeverity.MEDIUM,
          message: `Cleanup failed: ${error instanceof Error ? error.message : String(error)}`,
          timestamp: Date.now(),
          context: { error: error instanceof Error ? error.message : String(error), stack: error instanceof Error ? error.stack : undefined }
        });
      }
    }
  }

  /**
   * Get configuration for all available variants
   */
  getAllVariantConfigs(): Record<ThemeVariant, ThemeVariantConfig> {
    return { ...variantConfigs };
  }

  /**
   * Check if a variant is currently applied
   */
  isVariantActive(variant: ThemeVariant): boolean {
    return this._currentVariant === variant;
  }

  /**
   * Get the visual hierarchy controller
   * @returns The visual hierarchy controller instance
   */
  getVisualHierarchyController(): VisualHierarchyController | null {
    return this._visualHierarchyController;
  }

  /**
   * Get the sidebar style manager
   * @returns The sidebar style manager instance
   */
  getSidebarStyleManager(): SidebarStyleManager | null {
    return this._sidebarStyleManager;
  }

  /**
   * Get the animation system
   * @returns The animation system instance
   */
  getAnimationSystem(): AnimationSystem | null {
    return this._animationSystem;
  }

  /**
   * Get the semantic color manager
   * @returns The semantic color manager instance
   */
  getSemanticColorManager(): SemanticColorManager | null {
    return this._semanticColorManager;
  }

  /**
   * Get the error handling manager
   * @returns The error handling manager instance
   */
  getErrorHandlingManager(): ErrorHandlingManager | null {
    return this._errorHandlingManager;
  }

  /**
   * Get system health status
   * @returns System health information
   */
  getSystemHealth() {
    if (!this._errorHandlingManager) {
      return {
        isHealthy: false,
        score: 0,
        issues: ['错误处理管理器未初始化'],
        recommendations: ['重新初始化主题管理器']
      };
    }
    
    return this._errorHandlingManager.getSystemHealth();
  }

  /**
   * Validate system state
   * @returns Whether the system state is valid
   */
  validateSystemState(): boolean {
    if (!this._errorHandlingManager) {
      return false;
    }
    
    return this._errorHandlingManager.validateSystemState();
  }

  /**
   * Validate accessibility for the current variant
   * @returns Accessibility validation results
   */
  validateAccessibility() {
    if (!this._visualHierarchyController) {
      throw new Error('Visual hierarchy controller not available');
    }
    return this._visualHierarchyController.validateAccessibility();
  }

  /**
   * Get the current visual hierarchy configuration
   * @returns The hierarchy configuration
   */
  getHierarchyConfig() {
    if (!this._visualHierarchyController) {
      throw new Error('Visual hierarchy controller not available');
    }
    return this._visualHierarchyController.getConfig();
  }

  // Private helper methods

  /**
   * Handle system preference change from SystemIntegrationEnhancer
   */
  private async handleSystemPreferenceChange(event: SystemPreferenceChangeEvent): Promise<void> {
    if (!this._autoSwitchEnabled) {
      return;
    }

    try {
      const targetVariant = event.suggestedVariant;
      if (this._currentVariant !== targetVariant) {
        await this.switchVariant(targetVariant);
        console.log(`[${this._pluginId}] Auto-switched to ${targetVariant} variant based on system preference: ${event.preference}`);
      }
    } catch (error) {
      console.error(`[${this._pluginId}] Failed to auto-switch variant based on system preference:`, error);
    }
  }

  /**
   * Initialize system preference detection
   */
  private initializeSystemPreferenceDetection(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        this._systemPreferenceMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      } catch (error) {
        console.warn(`[${this._pluginId}] Failed to initialize system preference detection:`, error);
      }
    }
  }

  /**
   * Setup listener for system preference changes
   */
  private setupSystemPreferenceListener(): void {
    if (!this._systemPreferenceMediaQuery) {
      return;
    }

    this._systemPreferenceListener = (event: MediaQueryListEvent) => {
      if (this._autoSwitchEnabled) {
        this.applySystemPreference();
      }
    };

    try {
      this._systemPreferenceMediaQuery.addEventListener('change', this._systemPreferenceListener);
    } catch (error) {
      // Fallback for older browsers
      try {
        this._systemPreferenceMediaQuery.addListener(this._systemPreferenceListener);
      } catch (fallbackError) {
        console.warn(`[${this._pluginId}] Failed to setup system preference listener:`, fallbackError);
      }
    }
  }

  /**
   * Remove system preference listener
   */
  private removeSystemPreferenceListener(): void {
    if (!this._systemPreferenceMediaQuery || !this._systemPreferenceListener) {
      return;
    }

    try {
      this._systemPreferenceMediaQuery.removeEventListener('change', this._systemPreferenceListener);
    } catch (error) {
      // Fallback for older browsers
      try {
        this._systemPreferenceMediaQuery.removeListener(this._systemPreferenceListener);
      } catch (fallbackError) {
        console.warn(`[${this._pluginId}] Failed to remove system preference listener:`, fallbackError);
      }
    }

    this._systemPreferenceListener = null;
  }

  /**
   * Apply theme based on current system preference
   */
  private async applySystemPreference(): Promise<void> {
    const systemPreference = this.detectSystemPreference();
    
    // Map system preference to Tokyo Night variant
    let targetVariant: ThemeVariant;
    if (systemPreference === 'light') {
      targetVariant = 'light';
    } else {
      // Default to 'night' for dark preference, but could be configurable
      targetVariant = 'night';
    }

    if (this._currentVariant !== targetVariant) {
      try {
        await this.switchVariant(targetVariant);
        console.log(`[${this._pluginId}] Auto-switched to ${targetVariant} variant based on system preference`);
      } catch (error) {
        console.error(`[${this._pluginId}] Failed to auto-switch to ${targetVariant} variant:`, error);
      }
    }
  }

  /**
   * Update theme registration with Orca for the current variant
   */
  private async updateThemeRegistration(variant: ThemeVariant): Promise<void> {
    // This method can be extended to update Orca's theme registration
    // when switching variants, if needed for the specific Orca API
    
    // For now, we'll just log the variant change
    const config = getVariantConfig(variant);
    console.log(`[${this._pluginId}] Theme registration updated for variant: ${config.displayName}`);
  }

  /**
   * Apply or remove CSS styles dynamically
   */
  private applyStyle(
    cssContent: string, 
    enabled: boolean, 
    styleHolder: StyleHolder, 
    styleId: string
  ): void {
    try {
      if (enabled && cssContent.trim()) {
        // Create or update style element
        if (!styleHolder.el) {
          styleHolder.el = document.createElement('style');
          styleHolder.el.id = `${this._pluginId}-${styleId}`;
          document.head.appendChild(styleHolder.el);
        }
        styleHolder.el.textContent = cssContent;
      } else {
        // Remove style element
        if (styleHolder.el) {
          styleHolder.el.remove();
          styleHolder.el = null;
        }
      }
    } catch (error) {
      // 报告DOM操作错误
      if (this._errorHandlingManager) {
        this._errorHandlingManager.reportError({
          type: ErrorType.DOM_OPERATION_FAILED,
          severity: ErrorSeverity.MEDIUM,
          message: `Failed to apply style ${styleId}: ${error instanceof Error ? error.message : String(error)}`,
          timestamp: Date.now(),
          context: { 
            styleId, 
            enabled, 
            hasContent: !!cssContent.trim(),
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined
          }
        });
      }
      
      console.error(`[${this._pluginId}] Failed to apply style ${styleId}:`, error);
      throw error;
    }
  }
}

/**
 * Factory function to create a ThemeVariantManager instance
 */
export function createThemeVariantManager(pluginId: string): ThemeVariantManager {
  return new ThemeVariantManager(pluginId);
}