/**
 * 主题系统集成器
 * 
 * 将所有主题组件集成为一个统一的系统
 * Requirements: All requirements
 */

import { ThemeVariant } from '../types/colors';
import { getVariantColors, isValidVariant } from '../utils/colors';
import { ThemeVariantManager, createThemeVariantManager } from '../theme/ThemeVariantManager';
import { VisualHierarchyController } from './VisualHierarchyController';
import { SidebarStyleManager } from './SidebarStyleManager';
import { TypographySystem } from './TypographySystem';
import { AnimationSystem } from './AnimationSystem';
import { UIComponentStyleManager } from './UIComponentStyleManager';
import { SemanticColorManager } from './SemanticColorManager';
import { SystemIntegrationEnhancer } from './SystemIntegrationEnhancer';
import { ErrorHandlingManager } from './ErrorHandlingManager';

/**
 * 主题系统集成器配置
 */
export interface ThemeSystemConfig {
  /** 插件 ID */
  pluginId: string;
  /** 是否启用调试日志 */
  debugLogging?: boolean;
  /** 是否启用自动切换 */
  autoSwitchEnabled?: boolean;
  /** 初始主题变体 */
  initialVariant?: ThemeVariant;
}

/**
 * 主题系统状态
 */
export interface ThemeSystemState {
  /** 当前变体 */
  currentVariant: ThemeVariant;
  /** 自动切换是否启用 */
  autoSwitchEnabled: boolean;
  /** 系统偏好 */
  systemPreference: 'light' | 'dark';
  /** 组件是否已初始化 */
  componentsInitialized: boolean;
  /** 错误计数 */
  errorCount: number;
  /** 最后更新时间 */
  lastUpdated: Date;
}

/**
 * 主题系统验证结果
 */
export interface ThemeSystemValidation {
  /** 变体一致性 */
  variantConsistency: boolean;
  /** 颜色一致性 */
  colorConsistency: boolean;
  /** 样式一致性 */
  styleConsistency: boolean;
  /** 系统集成一致性 */
  integrationConsistency: boolean;
  /** 错误列表 */
  errors: string[];
  /** 警告列表 */
  warnings: string[];
}

/**
 * 主题系统集成器
 * 
 * 统一管理所有主题组件，提供完整的主题系统功能
 */
export class ThemeSystemIntegrator {
  private themeVariantManager: ThemeVariantManager;
  private visualHierarchyController: VisualHierarchyController | null = null;
  private sidebarStyleManager: SidebarStyleManager | null = null;
  private typographySystem: TypographySystem | null = null;
  private animationSystem: AnimationSystem | null = null;
  private uiComponentManager: UIComponentStyleManager | null = null;
  private semanticColorManager: SemanticColorManager | null = null;
  private systemIntegrationEnhancer: SystemIntegrationEnhancer | null = null;
  private errorHandlingManager: ErrorHandlingManager | null = null;
  
  private config: ThemeSystemConfig;
  private initialized: boolean = false;

  constructor(config: ThemeSystemConfig) {
    this.config = config;
    this.themeVariantManager = createThemeVariantManager(config.pluginId);
    
    // 如果指定了初始变体，则切换到该变体
    if (config.initialVariant && config.initialVariant !== this.themeVariantManager.currentVariant) {
      this.themeVariantManager.switchVariant(config.initialVariant).catch(error => {
        console.warn(`Failed to switch to initial variant ${config.initialVariant}:`, error);
      });
    }
    
    this.initializeComponents();
  }

  /**
   * 初始化所有组件
   */
  private initializeComponents(): void {
    try {
      const currentVariant = this.themeVariantManager.currentVariant;
      
      // 初始化核心组件 - 使用更安全的初始化方式
      try {
        this.visualHierarchyController = new VisualHierarchyController(currentVariant, this.config.pluginId);
      } catch (error) {
        console.warn(`[${this.config.pluginId}] VisualHierarchyController 初始化失败:`, error);
        this.visualHierarchyController = null;
      }

      try {
        this.sidebarStyleManager = new SidebarStyleManager(currentVariant, this.config.pluginId);
      } catch (error) {
        console.warn(`[${this.config.pluginId}] SidebarStyleManager 初始化失败:`, error);
        this.sidebarStyleManager = null;
      }

      try {
        this.typographySystem = new TypographySystem(currentVariant, this.config.pluginId);
      } catch (error) {
        console.warn(`[${this.config.pluginId}] TypographySystem 初始化失败:`, error);
        this.typographySystem = null;
      }

      try {
        this.animationSystem = new AnimationSystem(this.config.pluginId);
      } catch (error) {
        console.warn(`[${this.config.pluginId}] AnimationSystem 初始化失败:`, error);
        this.animationSystem = null;
      }

      try {
        this.uiComponentManager = new UIComponentStyleManager(currentVariant, this.config.pluginId);
      } catch (error) {
        console.warn(`[${this.config.pluginId}] UIComponentStyleManager 初始化失败:`, error);
        this.uiComponentManager = null;
      }

      try {
        this.semanticColorManager = new SemanticColorManager(currentVariant, this.config.pluginId);
      } catch (error) {
        console.warn(`[${this.config.pluginId}] SemanticColorManager 初始化失败:`, error);
        this.semanticColorManager = null;
      }
      
      // 初始化系统集成组件
      try {
        this.systemIntegrationEnhancer = new SystemIntegrationEnhancer({
          debugLogging: this.config.debugLogging || false,
          autoSwitchEnabled: this.config.autoSwitchEnabled || false
        });
      } catch (error) {
        console.warn(`[${this.config.pluginId}] SystemIntegrationEnhancer 初始化失败:`, error);
        this.systemIntegrationEnhancer = null;
      }
      
      // 初始化错误处理管理器
      try {
        this.errorHandlingManager = new ErrorHandlingManager(this.config.pluginId);
      } catch (error) {
        console.warn(`[${this.config.pluginId}] ErrorHandlingManager 初始化失败:`, error);
        this.errorHandlingManager = null;
      }
      
      // 检查至少有一些核心组件成功初始化
      const coreComponentsCount = [
        this.visualHierarchyController,
        this.sidebarStyleManager,
        this.typographySystem,
        this.semanticColorManager
      ].filter(component => component !== null).length;

      this.initialized = coreComponentsCount >= 2; // 至少需要2个核心组件成功初始化
      
      if (this.config.debugLogging) {
        console.log(`[${this.config.pluginId}] 主题系统组件初始化完成，成功初始化 ${coreComponentsCount}/4 个核心组件`);
      }
      
    } catch (error: unknown) {
      console.error(`[${this.config.pluginId}] 主题系统组件初始化失败:`, error);
      this.initialized = false;
    }
  }

  /**
   * 切换主题变体并更新所有组件
   */
  async switchVariant(variant: ThemeVariant): Promise<void> {
    if (!isValidVariant(variant)) {
      throw new Error(`Invalid theme variant: ${variant}`);
    }

    try {
      // 切换主变体管理器
      await this.themeVariantManager.switchVariant(variant);
      
      // 更新所有组件到新变体
      if (this.visualHierarchyController) {
        this.visualHierarchyController.remove();
        this.visualHierarchyController = new VisualHierarchyController(variant, this.config.pluginId);
      }
      
      if (this.sidebarStyleManager) {
        this.sidebarStyleManager.remove();
        this.sidebarStyleManager = new SidebarStyleManager(variant, this.config.pluginId);
      }
      
      if (this.typographySystem) {
        this.typographySystem.remove();
        this.typographySystem = new TypographySystem(variant, this.config.pluginId);
      }
      
      if (this.animationSystem) {
        this.animationSystem.remove();
        this.animationSystem = new AnimationSystem(this.config.pluginId);
      }
      
      if (this.uiComponentManager) {
        this.uiComponentManager.remove();
        this.uiComponentManager = new UIComponentStyleManager(variant, this.config.pluginId);
      }
      
      if (this.semanticColorManager) {
        this.semanticColorManager.remove();
        this.semanticColorManager = new SemanticColorManager(variant, this.config.pluginId);
      }
      
      if (this.config.debugLogging) {
        console.log(`[${this.config.pluginId}] 主题变体已切换到: ${variant}`);
      }
      
    } catch (error: unknown) {
      console.error(`[${this.config.pluginId}] 切换主题变体失败:`, error);
      throw error;
    }
  }

  /**
   * 获取当前主题变体
   */
  getCurrentVariant(): ThemeVariant {
    return this.themeVariantManager.currentVariant;
  }

  /**
   * 获取系统状态
   */
  getSystemState(): ThemeSystemState {
    return {
      currentVariant: this.themeVariantManager.currentVariant,
      autoSwitchEnabled: this.systemIntegrationEnhancer?.autoSwitchEnabled || false,
      systemPreference: this.systemIntegrationEnhancer?.detectSystemPreference() || 'dark',
      componentsInitialized: this.initialized && this.checkComponentsStatus(),
      errorCount: this.errorHandlingManager?.getErrorCount() || 0,
      lastUpdated: new Date(),
    };
  }

  /**
   * 检查组件状态
   */
  private checkComponentsStatus(): boolean {
    // 检查核心组件是否至少有一部分成功初始化
    const coreComponents = [
      this.visualHierarchyController,
      this.sidebarStyleManager,
      this.typographySystem,
      this.semanticColorManager
    ];
    
    const initializedCoreComponents = coreComponents.filter(component => component !== null).length;
    
    // 至少需要2个核心组件和主题变体管理器
    return initializedCoreComponents >= 2 && !!this.themeVariantManager;
  }

  /**
   * 验证系统一致性
   */
  validateSystemConsistency(): ThemeSystemValidation {
    const errors: string[] = [];
    const warnings: string[] = [];
    let variantConsistency = true;
    let colorConsistency = true;
    let styleConsistency = true;
    let integrationConsistency = true;

    try {
      const currentVariant = this.themeVariantManager.currentVariant;
      
      // 验证变体一致性
      if (!isValidVariant(currentVariant)) {
        variantConsistency = false;
        errors.push(`Invalid current variant: ${currentVariant}`);
      }
      
      // 验证颜色一致性
      const colors = getVariantColors(currentVariant);
      if (!colors || !colors.background || !colors.text || !colors.semantic || !colors.ui) {
        colorConsistency = false;
        errors.push(`Incomplete color configuration for variant: ${currentVariant}`);
      }
      
      // 验证样式一致性
      if (this.visualHierarchyController) {
        try {
          const hierarchyConfig = this.visualHierarchyController.getConfig();
          if (!hierarchyConfig || !hierarchyConfig.editor || !hierarchyConfig.sidebar) {
            styleConsistency = false;
            errors.push('Visual hierarchy configuration is incomplete');
          }
        } catch (error: unknown) {
          styleConsistency = false;
          errors.push(`Visual hierarchy validation failed: ${error instanceof Error ? error.message : String(error)}`);
        }
      } else {
        warnings.push('Visual hierarchy controller not initialized');
      }
      
      // 验证系统集成一致性
      if (this.systemIntegrationEnhancer) {
        try {
          const integrationStatus = this.systemIntegrationEnhancer.validateSystemIntegration();
          if (!integrationStatus.preferenceDetectionWorking) {
            integrationConsistency = false;
            errors.push('System preference detection is not working');
          }
          if (integrationStatus.lastError) {
            warnings.push(`System integration warning: ${integrationStatus.lastError}`);
          }
        } catch (error: unknown) {
          integrationConsistency = false;
          errors.push(`System integration validation failed: ${error instanceof Error ? error.message : String(error)}`);
        }
      } else {
        warnings.push('System integration enhancer not initialized');
      }
      
      // 验证组件初始化状态
      if (!this.initialized) {
        warnings.push('Theme system not fully initialized');
      }
      
    } catch (error: unknown) {
      errors.push(`System validation error: ${error instanceof Error ? error.message : String(error)}`);
      variantConsistency = false;
      colorConsistency = false;
      styleConsistency = false;
      integrationConsistency = false;
    }

    return {
      variantConsistency,
      colorConsistency,
      styleConsistency,
      integrationConsistency,
      errors,
      warnings
    };
  }

  /**
   * 设置自动切换
   */
  setAutoSwitchEnabled(enabled: boolean): void {
    if (this.systemIntegrationEnhancer) {
      this.systemIntegrationEnhancer.setAutoSwitchEnabled(enabled);
    }
  }

  /**
   * 检测系统偏好
   */
  detectSystemPreference(): 'light' | 'dark' {
    if (this.systemIntegrationEnhancer) {
      return this.systemIntegrationEnhancer.detectSystemPreference();
    }
    return this.themeVariantManager.detectSystemPreference();
  }

  /**
   * 获取所有变体配置
   */
  getAllVariantConfigs() {
    return this.themeVariantManager.getAllVariantConfigs();
  }

  /**
   * 检查变体是否激活
   */
  isVariantActive(variant: ThemeVariant): boolean {
    return this.themeVariantManager.isVariantActive(variant);
  }

  /**
   * 获取变体颜色
   */
  getVariantColors(variant: ThemeVariant) {
    return this.themeVariantManager.getVariantColors(variant);
  }

  /**
   * 验证可访问性
   */
  validateAccessibility() {
    return this.themeVariantManager.validateAccessibility();
  }

  /**
   * 清理所有组件和资源
   */
  cleanup(): void {
    try {
      // 清理所有组件
      this.visualHierarchyController?.remove();
      this.sidebarStyleManager?.remove();
      this.typographySystem?.remove();
      this.animationSystem?.remove();
      this.uiComponentManager?.remove();
      this.semanticColorManager?.remove();
      this.systemIntegrationEnhancer?.cleanup();
      this.errorHandlingManager?.cleanup();
      
      // 重置状态
      this.visualHierarchyController = null;
      this.sidebarStyleManager = null;
      this.typographySystem = null;
      this.animationSystem = null;
      this.uiComponentManager = null;
      this.semanticColorManager = null;
      this.systemIntegrationEnhancer = null;
      this.errorHandlingManager = null;
      this.initialized = false;
      
      if (this.config.debugLogging) {
        console.log(`[${this.config.pluginId}] 主题系统已清理`);
      }
      
    } catch (error: unknown) {
      console.error(`[${this.config.pluginId}] 清理主题系统时出错:`, error);
    }
  }

  /**
   * 重新初始化系统
   */
  reinitialize(): void {
    this.cleanup();
    this.initializeComponents();
  }

  /**
   * 获取系统健康状态
   */
  getHealthStatus(): {
    healthy: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const validation = this.validateSystemConsistency();
    const state = this.getSystemState();
    
    const issues: string[] = [...validation.errors];
    const recommendations: string[] = [];
    
    // 检查组件初始化状态
    if (!state.componentsInitialized) {
      issues.push('Components not fully initialized');
      recommendations.push('Try reinitializing the theme system');
    }
    
    // 检查错误计数
    if (state.errorCount > 0) {
      issues.push(`${state.errorCount} errors detected`);
      recommendations.push('Check error logs and consider system restart');
    }
    
    // 添加警告作为建议
    if (validation.warnings.length > 0) {
      recommendations.push(...validation.warnings.map(w => `Warning: ${w}`));
    }
    
    const healthy = issues.length === 0 && validation.variantConsistency && 
                   validation.colorConsistency && validation.styleConsistency && 
                   validation.integrationConsistency;
    
    return {
      healthy,
      issues,
      recommendations
    };
  }
}

/**
 * 创建主题系统集成器实例
 */
export function createThemeSystemIntegrator(config: ThemeSystemConfig): ThemeSystemIntegrator {
  return new ThemeSystemIntegrator(config);
}

/**
 * 默认配置
 */
export const defaultThemeSystemConfig: Partial<ThemeSystemConfig> = {
  debugLogging: false,
  autoSwitchEnabled: false,
  initialVariant: 'night',
};