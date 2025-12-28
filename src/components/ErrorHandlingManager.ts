/**
 * Tokyo Night 主题错误处理管理器
 * 
 * 提供综合的错误处理机制，包括：
 * - 主题操作的回退机制
 * - 状态验证和恢复系统
 * - 所有错误场景中的优雅降级
 * - 错误监控和报告
 * 
 * 实现需求：所有需求（错误处理）
 */

import { ThemeVariant } from '../types/colors';
import { ThemeVariantManager } from '../theme/ThemeVariantManager';
import { SystemIntegrationEnhancer } from './SystemIntegrationEnhancer';

/**
 * 错误类型枚举
 */
export enum ErrorType {
  THEME_LOADING_FAILED = 'THEME_LOADING_FAILED',
  VARIANT_SWITCH_FAILED = 'VARIANT_SWITCH_FAILED',
  DOM_OPERATION_FAILED = 'DOM_OPERATION_FAILED',
  ORCA_API_UNAVAILABLE = 'ORCA_API_UNAVAILABLE',
  SYSTEM_INTEGRATION_FAILED = 'SYSTEM_INTEGRATION_FAILED',
  COMPONENT_UPDATE_FAILED = 'COMPONENT_UPDATE_FAILED',
  STATE_VALIDATION_FAILED = 'STATE_VALIDATION_FAILED',
  RECOVERY_FAILED = 'RECOVERY_FAILED'
}

/**
 * 错误严重程度
 */
export enum ErrorSeverity {
  LOW = 'LOW',           // 不影响核心功能
  MEDIUM = 'MEDIUM',     // 影响部分功能
  HIGH = 'HIGH',         // 影响主要功能
  CRITICAL = 'CRITICAL'  // 系统无法正常工作
}

/**
 * 错误信息接口
 */
export interface ErrorInfo {
  type: ErrorType;
  severity: ErrorSeverity;
  message: string;
  timestamp: number;
  context?: Record<string, any>;
  stack?: string;
  recoveryAttempted?: boolean;
  recoverySuccessful?: boolean;
}

/**
 * 系统状态接口
 */
export interface SystemState {
  currentVariant: ThemeVariant;
  isThemeLoaded: boolean;
  isOrcaAvailable: boolean;
  isDOMReady: boolean;
  componentsStatus: {
    themeVariantManager: boolean;
    systemIntegrationEnhancer: boolean;
    visualHierarchyController: boolean;
    sidebarStyleManager: boolean;
    semanticColorManager: boolean;
    animationSystem: boolean;
    uiComponentStyleManager: boolean;
  };
  lastSuccessfulState?: SystemState;
}

/**
 * 回退配置接口
 */
export interface FallbackConfig {
  defaultVariant: ThemeVariant;
  enableAutoRecovery: boolean;
  maxRetryAttempts: number;
  retryDelay: number;
  enableFallbackStyles: boolean;
  fallbackStylesCSS?: string;
}

/**
 * 错误处理管理器类
 */
export class ErrorHandlingManager {
  private errors: ErrorInfo[] = [];
  private currentState: SystemState;
  private fallbackConfig: FallbackConfig;
  private themeManager: ThemeVariantManager | null = null;
  private systemIntegration: SystemIntegrationEnhancer | null = null;
  private errorHandlers: Map<ErrorType, (error: ErrorInfo) => Promise<boolean>> = new Map();
  private recoveryStrategies: Map<ErrorType, () => Promise<boolean>> = new Map();
  private pluginId: string;
  private isRecovering: boolean = false;
  private fallbackStyleElement: HTMLStyleElement | null = null;

  constructor(pluginId: string, fallbackConfig?: Partial<FallbackConfig>) {
    this.pluginId = pluginId;
    this.fallbackConfig = {
      defaultVariant: 'night',
      enableAutoRecovery: true,
      maxRetryAttempts: 3,
      retryDelay: 1000,
      enableFallbackStyles: true,
      ...fallbackConfig
    };

    this.currentState = this.initializeSystemState();
    this.setupErrorHandlers();
    this.setupRecoveryStrategies();
    this.setupGlobalErrorHandling();
  }

  /**
   * 初始化系统状态
   */
  private initializeSystemState(): SystemState {
    return {
      currentVariant: this.fallbackConfig.defaultVariant,
      isThemeLoaded: false,
      isOrcaAvailable: typeof orca !== 'undefined' && !!orca?.themes,
      isDOMReady: document.readyState === 'complete',
      componentsStatus: {
        themeVariantManager: false,
        systemIntegrationEnhancer: false,
        visualHierarchyController: false,
        sidebarStyleManager: false,
        semanticColorManager: false,
        animationSystem: false,
        uiComponentStyleManager: false
      }
    };
  }

  /**
   * 设置错误处理器
   */
  private setupErrorHandlers(): void {
    this.errorHandlers.set(ErrorType.THEME_LOADING_FAILED, this.handleThemeLoadingError.bind(this));
    this.errorHandlers.set(ErrorType.VARIANT_SWITCH_FAILED, this.handleVariantSwitchError.bind(this));
    this.errorHandlers.set(ErrorType.DOM_OPERATION_FAILED, this.handleDOMOperationError.bind(this));
    this.errorHandlers.set(ErrorType.ORCA_API_UNAVAILABLE, this.handleOrcaAPIError.bind(this));
    this.errorHandlers.set(ErrorType.SYSTEM_INTEGRATION_FAILED, this.handleSystemIntegrationError.bind(this));
    this.errorHandlers.set(ErrorType.COMPONENT_UPDATE_FAILED, this.handleComponentUpdateError.bind(this));
    this.errorHandlers.set(ErrorType.STATE_VALIDATION_FAILED, this.handleStateValidationError.bind(this));
  }

  /**
   * 设置恢复策略
   */
  private setupRecoveryStrategies(): void {
    this.recoveryStrategies.set(ErrorType.THEME_LOADING_FAILED, this.recoverFromThemeLoadingFailure.bind(this));
    this.recoveryStrategies.set(ErrorType.VARIANT_SWITCH_FAILED, this.recoverFromVariantSwitchFailure.bind(this));
    this.recoveryStrategies.set(ErrorType.DOM_OPERATION_FAILED, this.recoverFromDOMOperationFailure.bind(this));
    this.recoveryStrategies.set(ErrorType.ORCA_API_UNAVAILABLE, this.recoverFromOrcaAPIFailure.bind(this));
    this.recoveryStrategies.set(ErrorType.SYSTEM_INTEGRATION_FAILED, this.recoverFromSystemIntegrationFailure.bind(this));
    this.recoveryStrategies.set(ErrorType.COMPONENT_UPDATE_FAILED, this.recoverFromComponentUpdateFailure.bind(this));
  }

  /**
   * 设置全局错误处理
   */
  private setupGlobalErrorHandling(): void {
    // 检查是否在浏览器环境中
    if (typeof window === 'undefined' || !window.addEventListener) {
      console.warn(`[${this.pluginId}] 全局错误处理在当前环境中不可用`);
      return;
    }

    try {
      // 捕获未处理的错误
      window.addEventListener('error', (event) => {
        this.reportError({
          type: ErrorType.DOM_OPERATION_FAILED,
          severity: ErrorSeverity.MEDIUM,
          message: `全局错误: ${event.message}`,
          timestamp: Date.now(),
          context: {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
          },
          stack: event.error?.stack
        });
      });

      // 捕获未处理的Promise拒绝
      window.addEventListener('unhandledrejection', (event) => {
        this.reportError({
          type: ErrorType.SYSTEM_INTEGRATION_FAILED,
          severity: ErrorSeverity.HIGH,
          message: `未处理的Promise拒绝: ${event.reason}`,
          timestamp: Date.now(),
          context: {
            reason: event.reason
          }
        });
      });
    } catch (error) {
      console.warn(`[${this.pluginId}] 设置全局错误处理失败:`, error);
    }
  }

  /**
   * 注册主题管理器
   */
  public registerThemeManager(manager: ThemeVariantManager): void {
    this.themeManager = manager;
    this.currentState.componentsStatus.themeVariantManager = true;
    this.validateSystemState();
  }

  /**
   * 注册系统集成增强器
   */
  public registerSystemIntegration(integration: SystemIntegrationEnhancer): void {
    this.systemIntegration = integration;
    this.currentState.componentsStatus.systemIntegrationEnhancer = true;
    this.validateSystemState();
  }

  /**
   * 报告错误
   */
  public async reportError(errorInfo: ErrorInfo): Promise<void> {
    // 防止递归调用 - 检查是否已经在处理相同类型的错误
    const recentSimilarErrors = this.errors.filter(e => 
      e.type === errorInfo.type && 
      Date.now() - e.timestamp < 5000 // 5秒内
    );
    
    if (recentSimilarErrors.length >= 3) {
      console.warn(`[${this.pluginId}] 跳过重复错误报告: ${errorInfo.type}`);
      return;
    }

    // 记录错误
    this.errors.push(errorInfo);
    
    // 限制错误历史记录大小
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-50);
    }

    console.error(`[${this.pluginId}] 错误报告:`, errorInfo);

    // 防止在恢复过程中处理新错误
    if (this.isRecovering && errorInfo.type !== ErrorType.RECOVERY_FAILED) {
      console.log(`[${this.pluginId}] 恢复过程中跳过错误处理: ${errorInfo.type}`);
      return;
    }

    // 尝试处理错误
    const handler = this.errorHandlers.get(errorInfo.type);
    if (handler) {
      try {
        const handled = await handler(errorInfo);
        if (!handled && this.fallbackConfig.enableAutoRecovery && !this.isRecovering) {
          await this.attemptRecovery(errorInfo);
        }
      } catch (handlerError) {
        console.error(`[${this.pluginId}] 错误处理器失败:`, handlerError);
        if (this.fallbackConfig.enableAutoRecovery && !this.isRecovering) {
          await this.attemptRecovery(errorInfo);
        }
      }
    } else if (this.fallbackConfig.enableAutoRecovery && !this.isRecovering) {
      await this.attemptRecovery(errorInfo);
    }
  }

  /**
   * 尝试恢复
   */
  private async attemptRecovery(errorInfo: ErrorInfo): Promise<void> {
    if (this.isRecovering) {
      // 静默跳过重复恢复，避免日志洪水
      return;
    }

    this.isRecovering = true;
    errorInfo.recoveryAttempted = true;

    try {
      const strategy = this.recoveryStrategies.get(errorInfo.type);
      if (strategy) {
        const success = await strategy();
        errorInfo.recoverySuccessful = success;
        
        if (success) {
          console.log(`[${this.pluginId}] 成功恢复错误: ${errorInfo.type}`);
        } else {
          console.warn(`[${this.pluginId}] 恢复失败: ${errorInfo.type}`);
          await this.applyFallbackMeasures();
        }
      } else {
        console.warn(`[${this.pluginId}] 没有找到恢复策略: ${errorInfo.type}`);
        await this.applyFallbackMeasures();
      }
    } catch (recoveryError) {
      console.error(`[${this.pluginId}] 恢复过程中发生错误:`, recoveryError);
      await this.applyFallbackMeasures();
    } finally {
      this.isRecovering = false;
    }
  }

  /**
   * 应用回退措施
   */
  private async applyFallbackMeasures(): Promise<void> {
    console.log(`[${this.pluginId}] 应用回退措施`);

    try {
      // 1. 重置到默认变体
      if (this.themeManager && this.currentState.currentVariant !== this.fallbackConfig.defaultVariant) {
        await this.themeManager.switchVariant(this.fallbackConfig.defaultVariant);
        this.currentState.currentVariant = this.fallbackConfig.defaultVariant;
      }

      // 2. 应用回退样式
      if (this.fallbackConfig.enableFallbackStyles) {
        this.applyFallbackStyles();
      }

      // 3. 重新验证系统状态
      this.validateSystemState();

      console.log(`[${this.pluginId}] 回退措施应用完成`);
    } catch (fallbackError) {
      console.error(`[${this.pluginId}] 回退措施应用失败:`, fallbackError);
      
      // 避免递归调用 - 直接记录错误而不触发处理流程
      this.errors.push({
        type: ErrorType.RECOVERY_FAILED,
        severity: ErrorSeverity.CRITICAL,
        message: `回退措施失败: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`,
        timestamp: Date.now(),
        context: { originalError: fallbackError }
      });
    }
  }

  /**
   * 应用回退样式
   */
  private applyFallbackStyles(): void {
    if (this.fallbackStyleElement) {
      return; // 已经应用了回退样式
    }

    const fallbackCSS = this.fallbackConfig.fallbackStylesCSS || this.generateFallbackCSS();
    
    this.fallbackStyleElement = document.createElement('style');
    this.fallbackStyleElement.id = `${this.pluginId}-fallback-styles`;
    this.fallbackStyleElement.textContent = fallbackCSS;

    if (document.head) {
      document.head.appendChild(this.fallbackStyleElement);
    }

    console.log(`[${this.pluginId}] 回退样式已应用`);
  }

  /**
   * 生成回退CSS
   */
  private generateFallbackCSS(): string {
    return `
/* Tokyo Night 主题回退样式 */
/* 当主要主题系统失败时使用的基本样式 */

:root {
  /* 基本颜色变量 - Night 变体 */
  --fallback-bg-primary: #1a1b26;
  --fallback-bg-secondary: #16161e;
  --fallback-text-primary: #c0caf5;
  --fallback-text-secondary: #9aa5ce;
  --fallback-accent: #7aa2f7;
  --fallback-error: #f7768e;
  --fallback-warning: #e0af68;
  --fallback-success: #9ece6a;
}

/* 基本布局 */
body, #app {
  background-color: var(--fallback-bg-primary) !important;
  color: var(--fallback-text-primary) !important;
}

/* 侧边栏 */
nav#sidebar {
  background-color: var(--fallback-bg-secondary) !important;
  color: var(--fallback-text-secondary) !important;
}

/* 编辑器区域 */
.orca-panels-container {
  background-color: var(--fallback-bg-primary) !important;
  color: var(--fallback-text-primary) !important;
}

/* 按钮 */
.orca-button {
  background-color: var(--fallback-accent) !important;
  color: var(--fallback-bg-primary) !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 0.5rem 1rem !important;
}

/* 输入框 */
.orca-input-input {
  background-color: var(--fallback-bg-secondary) !important;
  color: var(--fallback-text-primary) !important;
  border: 1px solid var(--fallback-accent) !important;
  border-radius: 4px !important;
}

/* 错误状态指示 */
.fallback-error-indicator {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: var(--fallback-error);
  color: var(--fallback-bg-primary);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  z-index: 9999;
}
`;
  }

  /**
   * 验证系统状态
   */
  public validateSystemState(): boolean {
    try {
      // 检查DOM状态
      this.currentState.isDOMReady = document.readyState === 'complete';
      
      // 检查Orca API
      this.currentState.isOrcaAvailable = typeof orca !== 'undefined' && !!orca?.themes;
      
      // 检查主题是否加载
      if (this.themeManager) {
        this.currentState.isThemeLoaded = true;
        this.currentState.currentVariant = this.themeManager.currentVariant;
      }

      // 验证关键组件
      const criticalComponents = [
        'themeVariantManager',
        'systemIntegrationEnhancer'
      ];

      const criticalFailures = criticalComponents.filter(
        component => !this.currentState.componentsStatus[component as keyof typeof this.currentState.componentsStatus]
      );

      if (criticalFailures.length > 0) {
        // 避免递归调用 - 直接记录错误
        this.errors.push({
          type: ErrorType.STATE_VALIDATION_FAILED,
          severity: ErrorSeverity.HIGH,
          message: `关键组件未就绪: ${criticalFailures.join(', ')}`,
          timestamp: Date.now(),
          context: { failedComponents: criticalFailures }
        });
        return false;
      }

      return true;
    } catch (error) {
      // 避免递归调用 - 直接记录错误
      this.errors.push({
        type: ErrorType.STATE_VALIDATION_FAILED,
        severity: ErrorSeverity.MEDIUM,
        message: `状态验证失败: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: Date.now(),
        context: { error }
      });
      return false;
    }
  }

  /**
   * 获取系统健康状态
   */
  public getSystemHealth(): {
    isHealthy: boolean;
    score: number; // 0-100
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // 检查错误数量
    const recentErrors = this.errors.filter(e => Date.now() - e.timestamp < 300000); // 5分钟内
    if (recentErrors.length > 5) {
      issues.push(`最近5分钟内发生了${recentErrors.length}个错误`);
      score -= 20;
      recommendations.push('检查系统日志并解决频繁出现的错误');
    }

    // 检查关键错误
    const criticalErrors = recentErrors.filter(e => e.severity === ErrorSeverity.CRITICAL);
    if (criticalErrors.length > 0) {
      issues.push(`发现${criticalErrors.length}个关键错误`);
      score -= 30;
      recommendations.push('立即处理关键错误');
    }

    // 检查组件状态
    const failedComponents = Object.entries(this.currentState.componentsStatus)
      .filter(([_, status]) => !status)
      .map(([name, _]) => name);

    if (failedComponents.length > 0) {
      issues.push(`${failedComponents.length}个组件未正常工作`);
      score -= failedComponents.length * 10;
      recommendations.push('重新初始化失败的组件');
    }

    // 检查DOM和API状态
    if (!this.currentState.isDOMReady) {
      issues.push('DOM未就绪');
      score -= 15;
      recommendations.push('等待DOM加载完成');
    }

    if (!this.currentState.isOrcaAvailable) {
      issues.push('Orca API不可用');
      score -= 25;
      recommendations.push('检查Orca环境和API可用性');
    }

    const isHealthy = score >= 70 && criticalErrors.length === 0;

    return {
      isHealthy,
      score: Math.max(0, score),
      issues,
      recommendations
    };
  }

  // 错误处理器实现

  private async handleThemeLoadingError(error: ErrorInfo): Promise<boolean> {
    console.log(`[${this.pluginId}] 处理主题加载错误`);
    
    try {
      // 尝试重新加载主题
      if (this.themeManager) {
        await this.themeManager.switchVariant(this.fallbackConfig.defaultVariant);
        return true;
      }
    } catch (retryError) {
      console.error(`[${this.pluginId}] 主题重新加载失败:`, retryError);
    }
    
    return false;
  }

  private async handleVariantSwitchError(error: ErrorInfo): Promise<boolean> {
    console.log(`[${this.pluginId}] 处理变体切换错误`);
    
    try {
      // 回滚到上一个成功的变体
      if (this.themeManager && this.currentState.lastSuccessfulState) {
        await this.themeManager.switchVariant(this.currentState.lastSuccessfulState.currentVariant);
        return true;
      }
    } catch (rollbackError) {
      console.error(`[${this.pluginId}] 变体回滚失败:`, rollbackError);
    }
    
    return false;
  }

  private async handleDOMOperationError(error: ErrorInfo): Promise<boolean> {
    console.log(`[${this.pluginId}] 处理DOM操作错误`);
    
    // 等待DOM就绪
    if (typeof document !== 'undefined' && document.readyState !== 'complete') {
      return new Promise((resolve) => {
        const handler = () => {
          if (typeof document !== 'undefined' && document.removeEventListener) {
            document.removeEventListener('DOMContentLoaded', handler);
          }
          resolve(true);
        };
        
        if (typeof document !== 'undefined' && document.addEventListener) {
          document.addEventListener('DOMContentLoaded', handler);
        } else {
          // 如果document.addEventListener不可用，直接返回true
          resolve(true);
        }
      });
    }
    
    return true;
  }

  private async handleOrcaAPIError(error: ErrorInfo): Promise<boolean> {
    console.log(`[${this.pluginId}] 处理Orca API错误`);
    
    // 检查API是否恢复
    const isAvailable = typeof orca !== 'undefined' && !!orca?.themes;
    this.currentState.isOrcaAvailable = isAvailable;
    
    return isAvailable;
  }

  private async handleSystemIntegrationError(error: ErrorInfo): Promise<boolean> {
    console.log(`[${this.pluginId}] 处理系统集成错误`);
    
    try {
      // 重新初始化系统集成
      if (this.systemIntegration) {
        this.systemIntegration.resetErrorState();
        return true;
      }
    } catch (resetError) {
      console.error(`[${this.pluginId}] 系统集成重置失败:`, resetError);
    }
    
    return false;
  }

  private async handleComponentUpdateError(error: ErrorInfo): Promise<boolean> {
    console.log(`[${this.pluginId}] 处理组件更新错误`);
    
    // 这里可以实现组件级别的恢复逻辑
    return false;
  }

  private async handleStateValidationError(error: ErrorInfo): Promise<boolean> {
    console.log(`[${this.pluginId}] 处理状态验证错误`);
    
    // 重新验证状态
    return this.validateSystemState();
  }

  // 恢复策略实现

  private async recoverFromThemeLoadingFailure(): Promise<boolean> {
    console.log(`[${this.pluginId}] 从主题加载失败中恢复`);
    
    try {
      // 清理现有样式
      if (typeof document !== 'undefined' && document.querySelectorAll) {
        const existingStyles = document.querySelectorAll(`style[id*="${this.pluginId}"]`);
        existingStyles.forEach(style => style.remove());
      }
      
      // 重新应用默认主题
      if (this.themeManager) {
        await this.themeManager.switchVariant(this.fallbackConfig.defaultVariant);
        return true;
      }
    } catch (error) {
      console.error(`[${this.pluginId}] 主题加载恢复失败:`, error);
    }
    
    return false;
  }

  private async recoverFromVariantSwitchFailure(): Promise<boolean> {
    console.log(`[${this.pluginId}] 从变体切换失败中恢复`);
    
    // 实现变体切换恢复逻辑
    return this.recoverFromThemeLoadingFailure();
  }

  private async recoverFromDOMOperationFailure(): Promise<boolean> {
    console.log(`[${this.pluginId}] 从DOM操作失败中恢复`);
    
    // 等待DOM就绪并重试
    if (typeof document !== 'undefined' && document.readyState !== 'complete') {
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(void 0);
        } else if (typeof document !== 'undefined' && document.addEventListener) {
          document.addEventListener('DOMContentLoaded', () => resolve(void 0), { once: true });
        } else {
          // 如果document.addEventListener不可用，直接resolve
          resolve(void 0);
        }
      });
    }
    
    return true;
  }

  private async recoverFromOrcaAPIFailure(): Promise<boolean> {
    console.log(`[${this.pluginId}] 从Orca API失败中恢复`);
    
    // 在没有Orca API的情况下继续工作
    this.currentState.isOrcaAvailable = false;
    return true;
  }

  private async recoverFromSystemIntegrationFailure(): Promise<boolean> {
    console.log(`[${this.pluginId}] 从系统集成失败中恢复`);
    
    // 重新初始化系统集成
    try {
      if (this.systemIntegration) {
        this.systemIntegration.cleanup();
        // 这里可以重新创建系统集成实例
      }
      return true;
    } catch (error) {
      console.error(`[${this.pluginId}] 系统集成恢复失败:`, error);
      return false;
    }
  }

  private async recoverFromComponentUpdateFailure(): Promise<boolean> {
    console.log(`[${this.pluginId}] 从组件更新失败中恢复`);
    
    // 重新应用所有组件样式
    try {
      if (this.themeManager) {
        this.themeManager.applyVariant(this.currentState.currentVariant);
        return true;
      }
    } catch (error) {
      console.error(`[${this.pluginId}] 组件更新恢复失败:`, error);
    }
    
    return false;
  }

  /**
   * 获取错误历史
   */
  public getErrorHistory(): ErrorInfo[] {
    return [...this.errors];
  }

  /**
   * 获取错误数量
   */
  public getErrorCount(): number {
    return this.errors.length;
  }

  /**
   * 清理错误历史
   */
  public clearErrorHistory(): void {
    this.errors = [];
  }

  /**
   * 获取当前系统状态
   */
  public getCurrentState(): SystemState {
    return { ...this.currentState };
  }

  /**
   * 保存当前状态为成功状态
   */
  public saveSuccessfulState(): void {
    this.currentState.lastSuccessfulState = { ...this.currentState };
  }

  /**
   * 清理资源
   */
  public cleanup(): void {
    // 移除回退样式
    if (this.fallbackStyleElement) {
      this.fallbackStyleElement.remove();
      this.fallbackStyleElement = null;
    }

    // 清理错误处理器
    this.errorHandlers.clear();
    this.recoveryStrategies.clear();

    // 清理错误历史
    this.errors = [];

    console.log(`[${this.pluginId}] 错误处理管理器已清理`);
  }
}

/**
 * 创建错误处理管理器实例
 */
export function createErrorHandlingManager(
  pluginId: string,
  fallbackConfig?: Partial<FallbackConfig>
): ErrorHandlingManager {
  return new ErrorHandlingManager(pluginId, fallbackConfig);
}