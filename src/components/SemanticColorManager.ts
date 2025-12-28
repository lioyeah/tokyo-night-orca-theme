/**
 * Tokyo Night 语义颜色管理器
 * 
 * 负责管理和应用Tokyo Night主题的语义颜色系统，确保在所有变体中
 * 一致地应用错误、警告、成功和信息状态的颜色。
 * 
 * 实现需求 3.3, 3.5：语义颜色逻辑
 */

import { ThemeVariant, TokyoNightColors } from '../types/colors';
import { getVariantColors } from '../utils/colors';

/**
 * 语义颜色用途映射接口
 */
export interface SemanticColorMapping {
  /** 错误状态 - 使用红色 */
  error: string;
  /** 警告状态 - 使用黄色 */
  warning: string;
  /** 成功状态 - 使用绿色 */
  success: string;
  /** 信息状态 - 使用蓝色 */
  info: string;
  /** 危险状态 - 使用红色（与错误相同） */
  danger: string;
  /** 主要操作 - 使用蓝色 */
  primary: string;
  /** 次要操作 - 使用紫色 */
  secondary: string;
  /** 强调元素 - 使用青色 */
  accent: string;
  /** 链接颜色 - 使用蓝色 */
  link: string;
  /** 代码高亮 - 使用橙色 */
  code: string;
}

/**
 * UI元素语义颜色应用配置
 */
export interface UIElementSemanticConfig {
  /** 按钮语义颜色 */
  buttons: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  /** 文本语义颜色 */
  text: {
    error: string;
    warning: string;
    success: string;
    info: string;
    link: string;
    code: string;
  };
  /** 背景语义颜色 */
  backgrounds: {
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  /** 边框语义颜色 */
  borders: {
    error: string;
    warning: string;
    success: string;
    info: string;
  };
}

/**
 * 语义颜色管理器类
 */
export class SemanticColorManager {
  private currentVariant: ThemeVariant;
  private colors: TokyoNightColors;
  private semanticMapping: SemanticColorMapping;
  private uiElementConfig: UIElementSemanticConfig;
  private styleElement: HTMLStyleElement | null = null;
  private pluginId: string;

  constructor(variant: ThemeVariant, pluginId: string) {
    this.currentVariant = variant;
    this.colors = getVariantColors(variant);
    this.pluginId = pluginId;
    this.semanticMapping = this.createSemanticMapping();
    this.uiElementConfig = this.createUIElementConfig();
  }

  /**
   * 创建语义颜色映射 - 需求 3.3：语义颜色分配
   */
  private createSemanticMapping(): SemanticColorMapping {
    return {
      error: this.colors.semantic.red,      // #f7768e - 错误和关键元素
      warning: this.colors.semantic.yellow, // #e0af68 - 警告和提醒
      success: this.colors.semantic.green,  // #9ece6a - 成功和确认
      info: this.colors.semantic.cyan,      // #7dcfff - 信息和链接
      danger: this.colors.semantic.red,     // #f7768e - 危险操作（与错误相同）
      primary: this.colors.semantic.blue,   // #7aa2f7 - 主要操作
      secondary: this.colors.semantic.purple, // #bb9af7 - 次要操作
      accent: this.colors.semantic.cyan,    // #7dcfff - 强调元素
      link: this.colors.semantic.blue,      // #7aa2f7 - 链接颜色
      code: this.colors.semantic.orange,    // #ff9e64 - 代码高亮
    };
  }

  /**
   * 创建UI元素语义配置 - 需求 3.5：一致的语义颜色使用
   */
  private createUIElementConfig(): UIElementSemanticConfig {
    const isDark = this.currentVariant !== 'light';
    
    return {
      buttons: {
        primary: this.semanticMapping.primary,
        secondary: this.semanticMapping.secondary,
        success: this.semanticMapping.success,
        warning: this.semanticMapping.warning,
        danger: this.semanticMapping.danger,
        info: this.semanticMapping.info,
      },
      text: {
        error: this.semanticMapping.error,
        warning: this.semanticMapping.warning,
        success: this.semanticMapping.success,
        info: this.semanticMapping.info,
        link: this.semanticMapping.link,
        code: this.semanticMapping.code,
      },
      backgrounds: {
        // 为背景使用更淡的颜色版本
        error: isDark ? `${this.semanticMapping.error}22` : `${this.semanticMapping.error}11`,
        warning: isDark ? `${this.semanticMapping.warning}22` : `${this.semanticMapping.warning}11`,
        success: isDark ? `${this.semanticMapping.success}22` : `${this.semanticMapping.success}11`,
        info: isDark ? `${this.semanticMapping.info}22` : `${this.semanticMapping.info}11`,
      },
      borders: {
        // 为边框使用中等透明度的颜色
        error: isDark ? `${this.semanticMapping.error}66` : `${this.semanticMapping.error}44`,
        warning: isDark ? `${this.semanticMapping.warning}66` : `${this.semanticMapping.warning}44`,
        success: isDark ? `${this.semanticMapping.success}66` : `${this.semanticMapping.success}44`,
        info: isDark ? `${this.semanticMapping.info}66` : `${this.semanticMapping.info}44`,
      },
    };
  }

  /**
   * 生成语义按钮样式
   */
  public generateSemanticButtonStyles(): string {
    return `
/* 语义按钮样式 - Tokyo Night 语义颜色应用 */

/* 主要按钮 */
.orca-button.primary,
.orca-button[data-semantic="primary"],
.btn-primary {
    background-color: ${this.uiElementConfig.buttons.primary} !important;
    color: ${this.colors.background.primary} !important;
    border: none !important;
}

.orca-button.primary:hover,
.orca-button[data-semantic="primary"]:hover,
.btn-primary:hover {
    background-color: ${this.uiElementConfig.buttons.primary} !important;
    filter: brightness(1.1) !important;
}

/* 成功按钮 */
.orca-button.success,
.orca-button[data-semantic="success"],
.btn-success {
    background-color: ${this.uiElementConfig.buttons.success} !important;
    color: ${this.colors.background.primary} !important;
    border: none !important;
}

.orca-button.success:hover,
.orca-button[data-semantic="success"]:hover,
.btn-success:hover {
    background-color: ${this.uiElementConfig.buttons.success} !important;
    filter: brightness(1.1) !important;
}

/* 警告按钮 */
.orca-button.warning,
.orca-button[data-semantic="warning"],
.btn-warning {
    background-color: ${this.uiElementConfig.buttons.warning} !important;
    color: ${this.colors.background.primary} !important;
    border: none !important;
}

.orca-button.warning:hover,
.orca-button[data-semantic="warning"]:hover,
.btn-warning:hover {
    background-color: ${this.uiElementConfig.buttons.warning} !important;
    filter: brightness(1.1) !important;
}

/* 危险/错误按钮 */
.orca-button.danger,
.orca-button.error,
.orca-button[data-semantic="danger"],
.orca-button[data-semantic="error"],
.btn-danger,
.btn-error {
    background-color: ${this.uiElementConfig.buttons.danger} !important;
    color: ${this.colors.background.primary} !important;
    border: none !important;
}

.orca-button.danger:hover,
.orca-button.error:hover,
.orca-button[data-semantic="danger"]:hover,
.orca-button[data-semantic="error"]:hover,
.btn-danger:hover,
.btn-error:hover {
    background-color: ${this.uiElementConfig.buttons.danger} !important;
    filter: brightness(1.1) !important;
}

/* 信息按钮 */
.orca-button.info,
.orca-button[data-semantic="info"],
.btn-info {
    background-color: ${this.uiElementConfig.buttons.info} !important;
    color: ${this.colors.background.primary} !important;
    border: none !important;
}

.orca-button.info:hover,
.orca-button[data-semantic="info"]:hover,
.btn-info:hover {
    background-color: ${this.uiElementConfig.buttons.info} !important;
    filter: brightness(1.1) !important;
}

/* 次要按钮 */
.orca-button.secondary,
.orca-button[data-semantic="secondary"],
.btn-secondary {
    background-color: ${this.uiElementConfig.buttons.secondary} !important;
    color: ${this.colors.background.primary} !important;
    border: none !important;
}

.orca-button.secondary:hover,
.orca-button[data-semantic="secondary"]:hover,
.btn-secondary:hover {
    background-color: ${this.uiElementConfig.buttons.secondary} !important;
    filter: brightness(1.1) !important;
}
`;
  }

  /**
   * 生成语义文本样式
   */
  public generateSemanticTextStyles(): string {
    return `
/* 语义文本样式 - Tokyo Night 语义颜色应用 */

/* 错误文本 */
.text-error,
.error-text,
.orca-text-error,
[data-semantic-text="error"] {
    color: ${this.uiElementConfig.text.error} !important;
}

/* 警告文本 */
.text-warning,
.warning-text,
.orca-text-warning,
[data-semantic-text="warning"] {
    color: ${this.uiElementConfig.text.warning} !important;
}

/* 成功文本 */
.text-success,
.success-text,
.orca-text-success,
[data-semantic-text="success"] {
    color: ${this.uiElementConfig.text.success} !important;
}

/* 信息文本 */
.text-info,
.info-text,
.orca-text-info,
[data-semantic-text="info"] {
    color: ${this.uiElementConfig.text.info} !important;
}

/* 链接文本 */
.text-link,
.link-text,
.orca-text-link,
a,
[data-semantic-text="link"] {
    color: ${this.uiElementConfig.text.link} !important;
    text-decoration: none !important;
}

.text-link:hover,
.link-text:hover,
.orca-text-link:hover,
a:hover,
[data-semantic-text="link"]:hover {
    color: ${this.uiElementConfig.text.link} !important;
    text-decoration: underline !important;
    filter: brightness(1.1) !important;
}

/* 代码文本 */
.text-code,
.code-text,
.orca-text-code,
code,
[data-semantic-text="code"] {
    color: ${this.uiElementConfig.text.code} !important;
    background-color: ${this.colors.ui.hover}44 !important;
    padding: 0.125rem 0.25rem !important;
    border-radius: 0.25rem !important;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
    font-size: 0.875em !important;
}
`;
  }

  /**
   * 生成语义背景样式
   */
  public generateSemanticBackgroundStyles(): string {
    return `
/* 语义背景样式 - Tokyo Night 语义颜色应用 */

/* 错误背景 */
.bg-error,
.error-bg,
.orca-bg-error,
[data-semantic-bg="error"] {
    background-color: ${this.uiElementConfig.backgrounds.error} !important;
    border: 1px solid ${this.uiElementConfig.borders.error} !important;
    color: ${this.uiElementConfig.text.error} !important;
}

/* 警告背景 */
.bg-warning,
.warning-bg,
.orca-bg-warning,
[data-semantic-bg="warning"] {
    background-color: ${this.uiElementConfig.backgrounds.warning} !important;
    border: 1px solid ${this.uiElementConfig.borders.warning} !important;
    color: ${this.uiElementConfig.text.warning} !important;
}

/* 成功背景 */
.bg-success,
.success-bg,
.orca-bg-success,
[data-semantic-bg="success"] {
    background-color: ${this.uiElementConfig.backgrounds.success} !important;
    border: 1px solid ${this.uiElementConfig.borders.success} !important;
    color: ${this.uiElementConfig.text.success} !important;
}

/* 信息背景 */
.bg-info,
.info-bg,
.orca-bg-info,
[data-semantic-bg="info"] {
    background-color: ${this.uiElementConfig.backgrounds.info} !important;
    border: 1px solid ${this.uiElementConfig.borders.info} !important;
    color: ${this.uiElementConfig.text.info} !important;
}
`;
  }

  /**
   * 生成通知和警告框样式
   */
  public generateNotificationStyles(): string {
    return `
/* 通知和警告框样式 - Tokyo Night 语义颜色应用 */

/* 通用通知框样式 */
.orca-notification,
.notification,
.alert {
    padding: 0.75rem 1rem !important;
    border-radius: 0.5rem !important;
    margin: 0.5rem 0 !important;
    border-left: 4px solid transparent !important;
    font-size: 0.9em !important;
    line-height: 1.4 !important;
}

/* 错误通知 */
.orca-notification.error,
.notification.error,
.alert.error,
.alert-error {
    background-color: ${this.uiElementConfig.backgrounds.error} !important;
    border-left-color: ${this.uiElementConfig.text.error} !important;
    color: ${this.uiElementConfig.text.error} !important;
}

/* 警告通知 */
.orca-notification.warning,
.notification.warning,
.alert.warning,
.alert-warning {
    background-color: ${this.uiElementConfig.backgrounds.warning} !important;
    border-left-color: ${this.uiElementConfig.text.warning} !important;
    color: ${this.uiElementConfig.text.warning} !important;
}

/* 成功通知 */
.orca-notification.success,
.notification.success,
.alert.success,
.alert-success {
    background-color: ${this.uiElementConfig.backgrounds.success} !important;
    border-left-color: ${this.uiElementConfig.text.success} !important;
    color: ${this.uiElementConfig.text.success} !important;
}

/* 信息通知 */
.orca-notification.info,
.notification.info,
.alert.info,
.alert-info {
    background-color: ${this.uiElementConfig.backgrounds.info} !important;
    border-left-color: ${this.uiElementConfig.text.info} !important;
    color: ${this.uiElementConfig.text.info} !important;
}
`;
  }

  /**
   * 生成状态指示器样式
   */
  public generateStatusIndicatorStyles(): string {
    return `
/* 状态指示器样式 - Tokyo Night 语义颜色应用 */

/* 状态徽章 */
.orca-badge,
.badge,
.status-badge {
    display: inline-block !important;
    padding: 0.25rem 0.5rem !important;
    border-radius: 0.25rem !important;
    font-size: 0.75em !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.025em !important;
}

/* 错误状态徽章 */
.orca-badge.error,
.badge.error,
.status-badge.error,
[data-status="error"] {
    background-color: ${this.uiElementConfig.text.error} !important;
    color: ${this.colors.background.primary} !important;
}

/* 警告状态徽章 */
.orca-badge.warning,
.badge.warning,
.status-badge.warning,
[data-status="warning"] {
    background-color: ${this.uiElementConfig.text.warning} !important;
    color: ${this.colors.background.primary} !important;
}

/* 成功状态徽章 */
.orca-badge.success,
.badge.success,
.status-badge.success,
[data-status="success"] {
    background-color: ${this.uiElementConfig.text.success} !important;
    color: ${this.colors.background.primary} !important;
}

/* 信息状态徽章 */
.orca-badge.info,
.badge.info,
.status-badge.info,
[data-status="info"] {
    background-color: ${this.uiElementConfig.text.info} !important;
    color: ${this.colors.background.primary} !important;
}

/* 状态点指示器 */
.status-dot {
    display: inline-block !important;
    width: 0.5rem !important;
    height: 0.5rem !important;
    border-radius: 50% !important;
    margin-right: 0.5rem !important;
}

.status-dot.error { background-color: ${this.uiElementConfig.text.error} !important; }
.status-dot.warning { background-color: ${this.uiElementConfig.text.warning} !important; }
.status-dot.success { background-color: ${this.uiElementConfig.text.success} !important; }
.status-dot.info { background-color: ${this.uiElementConfig.text.info} !important; }
`;
  }

  /**
   * 生成完整的语义颜色CSS
   */
  public generateSemanticColorCSS(): string {
    return `
/* Tokyo Night 语义颜色系统 */
/* 实现一致的语义颜色应用和Tokyo Night颜色逻辑 */

${this.generateSemanticButtonStyles()}

${this.generateSemanticTextStyles()}

${this.generateSemanticBackgroundStyles()}

${this.generateNotificationStyles()}

${this.generateStatusIndicatorStyles()}

/* CSS自定义属性 - 语义颜色 */
:root {
    /* 语义颜色变量 */
    --tokyo-night-error: ${this.semanticMapping.error};
    --tokyo-night-warning: ${this.semanticMapping.warning};
    --tokyo-night-success: ${this.semanticMapping.success};
    --tokyo-night-info: ${this.semanticMapping.info};
    --tokyo-night-primary: ${this.semanticMapping.primary};
    --tokyo-night-secondary: ${this.semanticMapping.secondary};
    --tokyo-night-accent: ${this.semanticMapping.accent};
    --tokyo-night-link: ${this.semanticMapping.link};
    --tokyo-night-code: ${this.semanticMapping.code};
    
    /* 语义背景变量 */
    --tokyo-night-error-bg: ${this.uiElementConfig.backgrounds.error};
    --tokyo-night-warning-bg: ${this.uiElementConfig.backgrounds.warning};
    --tokyo-night-success-bg: ${this.uiElementConfig.backgrounds.success};
    --tokyo-night-info-bg: ${this.uiElementConfig.backgrounds.info};
    
    /* 语义边框变量 */
    --tokyo-night-error-border: ${this.uiElementConfig.borders.error};
    --tokyo-night-warning-border: ${this.uiElementConfig.borders.warning};
    --tokyo-night-success-border: ${this.uiElementConfig.borders.success};
    --tokyo-night-info-border: ${this.uiElementConfig.borders.info};
}
`;
  }

  /**
   * 应用语义颜色样式
   */
  public apply(): void {
    this.remove();

    const css = this.generateSemanticColorCSS();
    const styleId = `${this.pluginId}-semantic-colors`;

    this.styleElement = document.createElement('style');
    this.styleElement.id = styleId;
    this.styleElement.textContent = css;

    if (document.head) {
      document.head.appendChild(this.styleElement);
    }
  }

  /**
   * 移除语义颜色样式
   */
  public remove(): void {
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }

    const styleId = `${this.pluginId}-semantic-colors`;
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }
  }

  /**
   * 更新主题变体
   */
  public updateVariant(variant: ThemeVariant): void {
    this.currentVariant = variant;
    this.colors = getVariantColors(variant);
    this.semanticMapping = this.createSemanticMapping();
    this.uiElementConfig = this.createUIElementConfig();
    this.apply();
  }

  /**
   * 获取语义颜色映射
   */
  public getSemanticMapping(): SemanticColorMapping {
    return { ...this.semanticMapping };
  }

  /**
   * 获取UI元素配置
   */
  public getUIElementConfig(): UIElementSemanticConfig {
    return { ...this.uiElementConfig };
  }

  /**
   * 获取当前变体
   */
  public getCurrentVariant(): ThemeVariant {
    return this.currentVariant;
  }

  /**
   * 根据语义获取颜色
   */
  public getSemanticColor(semantic: keyof SemanticColorMapping): string {
    return this.semanticMapping[semantic];
  }

  /**
   * 验证语义颜色的一致性
   */
  public validateSemanticConsistency(): {
    isConsistent: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // 验证错误和危险颜色是否一致
    if (this.semanticMapping.error !== this.semanticMapping.danger) {
      issues.push('错误和危险状态应该使用相同的颜色');
    }

    // 验证主要操作和链接颜色是否一致
    if (this.semanticMapping.primary !== this.semanticMapping.link) {
      issues.push('主要操作和链接应该使用相同的颜色');
    }

    // 验证信息和强调颜色是否一致
    if (this.semanticMapping.info !== this.semanticMapping.accent) {
      issues.push('信息和强调元素应该使用相同的颜色');
    }

    const isConsistent = issues.length === 0;

    if (!isConsistent) {
      recommendations.push('确保相关语义状态使用一致的颜色');
      recommendations.push('检查Tokyo Night官方颜色规范');
    }

    return {
      isConsistent,
      issues,
      recommendations,
    };
  }

  /**
   * 生成语义颜色使用报告
   */
  public generateUsageReport(): {
    variant: ThemeVariant;
    semanticColors: SemanticColorMapping;
    uiElements: UIElementSemanticConfig;
    cssVariables: Record<string, string>;
    consistency: {
      isConsistent: boolean;
      issues: string[];
      recommendations: string[];
    };
  } {
    const cssVariables: Record<string, string> = {};
    
    // 生成CSS变量映射
    Object.entries(this.semanticMapping).forEach(([key, value]) => {
      cssVariables[`--tokyo-night-${key}`] = value;
    });

    return {
      variant: this.currentVariant,
      semanticColors: this.getSemanticMapping(),
      uiElements: this.getUIElementConfig(),
      cssVariables,
      consistency: this.validateSemanticConsistency(),
    };
  }
}

/**
 * 创建语义颜色管理器实例
 */
export function createSemanticColorManager(
  variant: ThemeVariant,
  pluginId: string
): SemanticColorManager {
  return new SemanticColorManager(variant, pluginId);
}