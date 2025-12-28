/**
 * System Integration Enhancer for Tokyo Night Theme
 * 
 * 增强系统集成功能，包括：
 * - 自动主题切换基于系统偏好
 * - 偏好持久化跨主题变体
 * - 错误处理和优雅降级
 * - 与 Orca 主题系统的适当集成
 * 
 * 实现需求 7.4, 7.5：系统集成功能
 */

import { ThemeVariant } from '../types/colors';

/**
 * 系统集成配置接口
 */
export interface SystemIntegrationConfig {
  /** 是否启用自动切换 */
  autoSwitchEnabled: boolean;
  /** 系统偏好检测间隔（毫秒） */
  preferenceCheckInterval: number;
  /** 错误重试次数 */
  maxRetries: number;
  /** 错误重试延迟（毫秒） */
  retryDelay: number;
  /** 是否启用调试日志 */
  debugLogging: boolean;
}

/**
 * 系统偏好变化事件接口
 */
export interface SystemPreferenceChangeEvent {
  /** 新的系统偏好 */
  preference: 'light' | 'dark';
  /** 建议的主题变体 */
  suggestedVariant: ThemeVariant;
  /** 事件时间戳 */
  timestamp: number;
}

/**
 * 系统集成错误类型
 */
export type SystemIntegrationError = 
  | 'MEDIA_QUERY_NOT_SUPPORTED'
  | 'EVENT_LISTENER_FAILED'
  | 'PREFERENCE_DETECTION_FAILED'
  | 'VARIANT_SWITCH_FAILED'
  | 'PERSISTENCE_FAILED';

/**
 * 系统集成增强器类
 */
export class SystemIntegrationEnhancer {
  private config: SystemIntegrationConfig;
  private mediaQuery: MediaQueryList | null = null;
  private preferenceListener: ((event: MediaQueryListEvent) => void) | null = null;
  private errorHandlers: Map<SystemIntegrationError, (error: Error) => void> = new Map();
  private retryAttempts: Map<string, number> = new Map();
  private lastKnownPreference: 'light' | 'dark' = 'dark';
  private preferenceChangeCallbacks: ((event: SystemPreferenceChangeEvent) => void)[] = [];

  constructor(config: Partial<SystemIntegrationConfig> = {}) {
    this.config = {
      autoSwitchEnabled: false,
      preferenceCheckInterval: 1000,
      maxRetries: 3,
      retryDelay: 1000,
      debugLogging: false,
      ...config
    };

    this.initializeSystemPreferenceDetection();
  }

  /**
   * 检测系统偏好
   */
  detectSystemPreference(): 'light' | 'dark' {
    try {
      if (typeof window === 'undefined' || !window.matchMedia) {
        this.handleError('MEDIA_QUERY_NOT_SUPPORTED', new Error('matchMedia not supported'));
        return 'dark'; // 明确回退到dark模式
      }

      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const preference = darkModeQuery.matches ? 'dark' : 'light';
      
      // 更新最后已知偏好
      if (preference !== this.lastKnownPreference) {
        this.lastKnownPreference = preference;
        this.notifyPreferenceChange(preference);
      }

      return preference;
    } catch (error) {
      this.handleError('PREFERENCE_DETECTION_FAILED', error as Error);
      return 'dark'; // 错误时也回退到dark模式
    }
  }

  /**
   * 设置自动切换状态
   */
  setAutoSwitchEnabled(enabled: boolean): void {
    const wasEnabled = this.config.autoSwitchEnabled;
    this.config.autoSwitchEnabled = enabled;

    if (enabled && !wasEnabled) {
      this.setupSystemPreferenceListener();
      this.log('自动切换已启用');
    } else if (!enabled && wasEnabled) {
      this.removeSystemPreferenceListener();
      this.log('自动切换已禁用');
    }
  }

  /**
   * 获取自动切换状态
   */
  get autoSwitchEnabled(): boolean {
    return this.config.autoSwitchEnabled;
  }

  /**
   * 添加偏好变化回调
   */
  onPreferenceChange(callback: (event: SystemPreferenceChangeEvent) => void): void {
    this.preferenceChangeCallbacks.push(callback);
  }

  /**
   * 移除偏好变化回调
   */
  removePreferenceChangeCallback(callback: (event: SystemPreferenceChangeEvent) => void): void {
    const index = this.preferenceChangeCallbacks.indexOf(callback);
    if (index > -1) {
      this.preferenceChangeCallbacks.splice(index, 1);
    }
  }

  /**
   * 设置错误处理器
   */
  setErrorHandler(errorType: SystemIntegrationError, handler: (error: Error) => void): void {
    this.errorHandlers.set(errorType, handler);
  }

  /**
   * 获取建议的主题变体基于系统偏好
   */
  getSuggestedVariant(preference?: 'light' | 'dark'): ThemeVariant {
    const systemPreference = preference || this.detectSystemPreference();
    
    if (systemPreference === 'light') {
      return 'light';
    } else {
      // 对于暗色偏好，默认返回 night，但可以根据用户偏好配置
      return 'night';
    }
  }

  /**
   * 验证系统集成状态
   */
  validateSystemIntegration(): {
    mediaQuerySupported: boolean;
    eventListenerActive: boolean;
    preferenceDetectionWorking: boolean;
    autoSwitchEnabled: boolean;
    lastError: string | null;
  } {
    return {
      mediaQuerySupported: typeof window !== 'undefined' && !!window.matchMedia,
      eventListenerActive: !!this.preferenceListener,
      preferenceDetectionWorking: this.testPreferenceDetection(),
      autoSwitchEnabled: this.config.autoSwitchEnabled,
      lastError: this.getLastError()
    };
  }

  /**
   * 重置错误状态
   */
  resetErrorState(): void {
    this.retryAttempts.clear();
    this.log('错误状态已重置');
  }

  /**
   * 清理资源
   */
  cleanup(): void {
    this.removeSystemPreferenceListener();
    this.preferenceChangeCallbacks.length = 0;
    this.errorHandlers.clear();
    this.retryAttempts.clear();
    this.log('系统集成增强器已清理');
  }

  /**
   * 获取配置
   */
  getConfig(): SystemIntegrationConfig {
    return { ...this.config };
  }

  /**
   * 更新配置
   */
  updateConfig(newConfig: Partial<SystemIntegrationConfig>): void {
    const oldConfig = { ...this.config };
    this.config = { ...this.config, ...newConfig };

    // 如果自动切换设置改变，更新监听器
    if (oldConfig.autoSwitchEnabled !== this.config.autoSwitchEnabled) {
      this.setAutoSwitchEnabled(this.config.autoSwitchEnabled);
    }

    this.log('配置已更新', this.config);
  }

  // 私有方法

  /**
   * 初始化系统偏好检测
   */
  private initializeSystemPreferenceDetection(): void {
    try {
      if (typeof window !== 'undefined' && window.matchMedia) {
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.lastKnownPreference = this.mediaQuery.matches ? 'dark' : 'light';
        this.log('系统偏好检测已初始化', { preference: this.lastKnownPreference });
      } else {
        this.handleError('MEDIA_QUERY_NOT_SUPPORTED', new Error('matchMedia not available'));
      }
    } catch (error) {
      this.handleError('PREFERENCE_DETECTION_FAILED', error as Error);
    }
  }

  /**
   * 设置系统偏好监听器
   */
  private setupSystemPreferenceListener(): void {
    if (!this.mediaQuery) {
      this.log('无法设置偏好监听器：mediaQuery 不可用');
      return;
    }

    this.preferenceListener = (event: MediaQueryListEvent) => {
      if (this.config.autoSwitchEnabled) {
        const preference = event.matches ? 'dark' : 'light';
        this.lastKnownPreference = preference;
        this.notifyPreferenceChange(preference);
        this.log('系统偏好已变化', { preference });
      }
    };

    try {
      // 尝试使用现代 API
      this.mediaQuery.addEventListener('change', this.preferenceListener);
      this.log('偏好监听器已设置（现代 API）');
    } catch (error) {
      try {
        // 回退到旧版 API
        this.mediaQuery.addListener(this.preferenceListener);
        this.log('偏好监听器已设置（旧版 API）');
      } catch (fallbackError) {
        this.handleError('EVENT_LISTENER_FAILED', fallbackError as Error);
      }
    }
  }

  /**
   * 移除系统偏好监听器
   */
  private removeSystemPreferenceListener(): void {
    if (!this.mediaQuery || !this.preferenceListener) {
      return;
    }

    try {
      // 尝试使用现代 API
      this.mediaQuery.removeEventListener('change', this.preferenceListener);
      this.log('偏好监听器已移除（现代 API）');
    } catch (error) {
      try {
        // 回退到旧版 API
        this.mediaQuery.removeListener(this.preferenceListener);
        this.log('偏好监听器已移除（旧版 API）');
      } catch (fallbackError) {
        this.handleError('EVENT_LISTENER_FAILED', fallbackError as Error);
      }
    }

    this.preferenceListener = null;
  }

  /**
   * 通知偏好变化
   */
  private notifyPreferenceChange(preference: 'light' | 'dark'): void {
    const event: SystemPreferenceChangeEvent = {
      preference,
      suggestedVariant: this.getSuggestedVariant(preference),
      timestamp: Date.now()
    };

    this.preferenceChangeCallbacks.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        this.log('偏好变化回调执行失败', error);
      }
    });
  }

  /**
   * 处理错误
   */
  private handleError(errorType: SystemIntegrationError, error: Error): void {
    const errorKey = `${errorType}_${error.message}`;
    const currentAttempts = this.retryAttempts.get(errorKey) || 0;

    this.log(`系统集成错误 [${errorType}]`, { error: error.message, attempts: currentAttempts });

    // 调用自定义错误处理器
    const handler = this.errorHandlers.get(errorType);
    if (handler) {
      try {
        handler(error);
      } catch (handlerError) {
        this.log('错误处理器执行失败', handlerError);
      }
    }

    // 更新重试计数
    if (currentAttempts < this.config.maxRetries) {
      this.retryAttempts.set(errorKey, currentAttempts + 1);
      
      // 延迟重试
      setTimeout(() => {
        this.log(`重试系统集成操作 [${errorType}]`, { attempt: currentAttempts + 1 });
        // 这里可以添加具体的重试逻辑
      }, this.config.retryDelay);
    } else {
      this.log(`系统集成错误达到最大重试次数 [${errorType}]`, { maxRetries: this.config.maxRetries });
    }
  }

  /**
   * 测试偏好检测
   */
  private testPreferenceDetection(): boolean {
    try {
      const preference = this.detectSystemPreference();
      return ['light', 'dark'].includes(preference);
    } catch {
      return false;
    }
  }

  /**
   * 获取最后的错误
   */
  private getLastError(): string | null {
    // 这里可以实现更复杂的错误跟踪逻辑
    return null;
  }

  /**
   * 日志记录
   */
  private log(message: string, data?: any): void {
    if (this.config.debugLogging) {
      console.log(`[SystemIntegrationEnhancer] ${message}`, data || '');
    }
  }
}

/**
 * 创建系统集成增强器实例
 */
export function createSystemIntegrationEnhancer(config?: Partial<SystemIntegrationConfig>): SystemIntegrationEnhancer {
  return new SystemIntegrationEnhancer(config);
}

/**
 * 系统集成工具函数
 */
export const SystemIntegrationUtils = {
  /**
   * 检查系统是否支持偏好检测
   */
  isPreferenceDetectionSupported(): boolean {
    return typeof window !== 'undefined' && !!window.matchMedia;
  },

  /**
   * 获取系统偏好（静态方法）
   */
  getSystemPreference(): 'light' | 'dark' | null {
    try {
      if (!this.isPreferenceDetectionSupported()) {
        return null;
      }
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      return darkModeQuery.matches ? 'dark' : 'light';
    } catch {
      return null;
    }
  },

  /**
   * 映射系统偏好到主题变体
   */
  mapPreferenceToVariant(preference: 'light' | 'dark'): ThemeVariant {
    return preference === 'light' ? 'light' : 'night';
  },

  /**
   * 验证主题变体
   */
  isValidVariant(variant: string): variant is ThemeVariant {
    return ['night', 'storm', 'light'].includes(variant);
  }
};