/**
 * Visual Hierarchy Controller for Tokyo Night Theme
 * 
 * 实现编辑器优先、侧边栏弱化的视觉层次系统。
 * 这个控制器负责管理界面元素的视觉权重，确保编辑区域获得最高的视觉优先级。
 */

import { ThemeVariant, TokyoNightColors } from '../types/colors';
import { getVariantColors, calculateContrastRatio } from '../utils/colors';

/**
 * 视觉层次配置接口
 */
export interface HierarchyConfig {
  editor: {
    emphasis: 'high';
    contrast: 'maximum';
    background: 'primary';
    textContrast: number; // WCAG AA 最低标准
  };
  
  sidebar: {
    emphasis: 'low';
    opacity: number;
    background: 'secondary';
    textContrast: number; // 降低但仍可读
  };
  
  ui: {
    emphasis: 'medium';
    subtlety: 'high';
    borderWeight: 'minimal';
    shadowDepth: 'subtle';
  };
}

/**
 * 视觉层次控制器类
 * 
 * 负责实现和管理整个应用的视觉层次系统，确保编辑器区域
 * 获得最高的视觉优先级，同时保持界面的整体协调性。
 */
export class VisualHierarchyController {
  private currentVariant: ThemeVariant;
  private colors: TokyoNightColors;
  private config: HierarchyConfig;
  private styleElement: HTMLStyleElement | null = null;
  private pluginId: string;

  constructor(variant: ThemeVariant, pluginId: string) {
    this.currentVariant = variant;
    this.colors = getVariantColors(variant);
    this.pluginId = pluginId;
    this.config = this.createHierarchyConfig();
  }

  /**
   * 创建视觉层次配置
   */
  private createHierarchyConfig(): HierarchyConfig {
    return {
      editor: {
        emphasis: 'high',
        contrast: 'maximum',
        background: 'primary',
        textContrast: 4.5, // WCAG AA 最低标准
      },
      sidebar: {
        emphasis: 'low',
        opacity: 0.85,
        background: 'secondary',
        textContrast: 3.0, // 降低但仍可读
      },
      ui: {
        emphasis: 'medium',
        subtlety: 'high',
        borderWeight: 'minimal',
        shadowDepth: 'subtle',
      },
    };
  }

  /**
   * 强调编辑器区域
   * 
   * 通过增强对比度、优化背景色和文字颜色来突出编辑器区域，
   * 使其成为界面的视觉焦点。
   */
  public emphasizeEditor(): string {
    const editorCSS = `
/* 编辑器区域强调样式 */
.orca-panels-container {
    background-color: ${this.colors.background.primary} !important;
    color: ${this.colors.text.primary} !important;
    /* 确保编辑器区域具有最高的视觉优先级 */
    position: relative;
    z-index: 1;
}

/* 编辑器内容区域 */
.orca-panels-container .orca-repr-main-content,
.orca-panels-container .orca-block-editor {
    background-color: ${this.colors.background.primary} !important;
    color: ${this.colors.text.primary} !important;
    /* 最大化文本对比度 */
    font-weight: 400;
    line-height: 1.6;
    /* 增加内容区域的视觉权重 */
    border-radius: 0;
    box-shadow: none;
}

/* 编辑器文本输入区域 */
.orca-panels-container .orca-repr-main-content[contenteditable="true"],
.orca-panels-container .orca-block-editor-content {
    background-color: ${this.colors.background.primary} !important;
    color: ${this.colors.text.primary} !important;
    /* 确保光标和选择区域清晰可见 */
    caret-color: ${this.colors.ui.focus} !important;
    selection-background-color: ${this.colors.ui.selection} !important;
}

/* 编辑器区域的焦点状态 */
.orca-panels-container .orca-repr-main-content:focus,
.orca-panels-container .orca-block-editor:focus-within {
    outline: 2px solid ${this.colors.ui.focus} !important;
    outline-offset: -2px !important;
    /* 增强焦点时的视觉反馈 */
    box-shadow: 0 0 0 3px ${this.colors.ui.focus}33 !important;
}

/* 编辑器内的标题层次 */
.orca-panels-container h1,
.orca-panels-container h2,
.orca-panels-container h3,
.orca-panels-container h4,
.orca-panels-container h5,
.orca-panels-container h6 {
    /* 保持现有的语义颜色，但增强对比度 */
    font-weight: 600 !important;
    margin: 1.2em 0 0.6em 0 !important;
    line-height: 1.3 !important;
}
`;
    return editorCSS;
  }

  /**
   * 弱化侧边栏
   * 
   * 通过降低视觉权重、使用更暗的背景色和减少对比度来
   * 弱化侧边栏，使其不与编辑器内容竞争注意力。
   */
  public subduesSidebar(): string {
    const sidebarCSS = `
/* 侧边栏弱化样式 */
nav#sidebar {
    background-color: ${this.colors.background.secondary} !important;
    color: ${this.colors.text.secondary} !important;
    /* 降低整体视觉权重 */
    opacity: ${this.config.sidebar.opacity};
    border-right: 1px solid ${this.colors.ui.border} !important;
    /* 移除阴影以减少视觉干扰 */
    box-shadow: none !important;
    /* 确保侧边栏在视觉层次中处于较低位置 */
    z-index: 0;
}

/* 侧边栏文本元素 */
nav#sidebar .item,
nav#sidebar a,
nav#sidebar .orca-tags-tag-name,
nav#sidebar .day,
nav#sidebar .title,
nav#sidebar span {
    color: ${this.colors.text.secondary} !important;
    /* 降低文字权重 */
    font-weight: 400 !important;
    opacity: 0.9;
}

/* 侧边栏图标 */
nav#sidebar .ti:not([style*="color"]),
nav#sidebar .search-box .ti:not([style*="color"]),
nav#sidebar .toolbar .ti:not([style*="color"]) {
    color: ${this.colors.text.muted} !important;
    /* 进一步降低图标的视觉权重 */
    opacity: 0.7;
}

/* 侧边栏悬停状态 - 保持微妙 */
nav#sidebar .item:hover,
nav#sidebar a:hover {
    background-color: ${this.colors.ui.hover} !important;
    color: ${this.colors.text.primary} !important;
    /* 悬停时稍微增加不透明度，但保持微妙 */
    opacity: 1;
    /* 使用微妙的过渡效果 */
    transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}

/* 侧边栏激活状态 */
nav#sidebar .item.active,
nav#sidebar a.active {
    background-color: ${this.colors.ui.selection} !important;
    color: ${this.colors.text.primary} !important;
    /* 激活状态稍微突出，但不过度 */
    opacity: 1;
    border-radius: 4px;
}

/* 侧边栏输入框 - 保持低调 */
nav#sidebar .orca-input-input,
nav#sidebar .search-box .orca-input-input {
    background-color: ${this.colors.background.primary} !important;
    border: 1px solid ${this.colors.ui.border} !important;
    border-radius: 6px !important;
    /* 降低输入框的视觉权重 */
    box-shadow: none !important;
    opacity: 0.9;
}

nav#sidebar .orca-input-input:focus-within,
nav#sidebar .search-box .orca-input-input:focus-within {
    border-color: ${this.colors.ui.focus} !important;
    /* 焦点时使用更微妙的阴影 */
    box-shadow: 0 0 0 1px ${this.colors.ui.focus}44 !important;
    opacity: 1;
}
`;
    return sidebarCSS;
  }

  /**
   * 平衡UI元素
   * 
   * 为其他UI元素（按钮、输入框、模态框等）应用微妙的样式，
   * 确保它们不与内容竞争，同时保持良好的可用性。
   */
  public balanceUIElements(): string {
    const uiCSS = `
/* UI元素平衡样式 */

/* 按钮样式 - 微妙但清晰 */
.orca-button {
    border-radius: 6px !important;
    font-weight: 500 !important;
    /* 使用微妙的过渡效果 */
    transition: all 0.2s ease !important;
    /* 降低边框权重 */
    border-width: 1px !important;
}

.orca-button.primary {
    background-color: ${this.colors.semantic.blue} !important;
    color: ${this.colors.background.primary} !important;
    border-color: ${this.colors.semantic.blue} !important;
}

.orca-button.primary:hover {
    /* 悬停时微妙的亮度变化 */
    filter: brightness(1.1) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 2px 4px ${this.colors.ui.hover}44 !important;
}

.orca-button.soft {
    background-color: ${this.colors.ui.hover} !important;
    color: ${this.colors.text.primary} !important;
    border-color: ${this.colors.ui.border} !important;
}

/* 输入框样式 - 清洁简约 */
.orca-input-input {
    background-color: ${this.colors.background.primary} !important;
    border: 1px solid ${this.colors.ui.border} !important;
    border-radius: 6px !important;
    color: ${this.colors.text.primary} !important;
    /* 移除不必要的阴影 */
    box-shadow: none !important;
    transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
}

.orca-input-input:focus-within {
    border-color: ${this.colors.ui.focus} !important;
    /* 微妙的焦点阴影 */
    box-shadow: 0 0 0 2px ${this.colors.ui.focus}33 !important;
}

/* 模态框和弹出层 - 优雅的层次 */
.orca-modal,
.orca-dialog,
.orca-popup {
    background-color: ${this.colors.background.tertiary} !important;
    color: ${this.colors.text.primary} !important;
    border: 1px solid ${this.colors.ui.border} !important;
    border-radius: 8px !important;
    /* 微妙的阴影提供深度感 */
    box-shadow: 0 8px 24px ${this.colors.background.secondary}88 !important;
}

/* 菜单项 - 微妙的交互反馈 */
.orca-menu .orca-menu-item,
.orca-popup .item,
.orca-popup .menu-item {
    color: ${this.colors.text.primary} !important;
    border-radius: 4px !important;
    transition: background-color 0.15s ease, color 0.15s ease !important;
}

.orca-menu .orca-menu-item:hover,
.orca-popup .item:hover,
.orca-popup .menu-item:hover {
    background-color: ${this.colors.ui.hover} !important;
    color: ${this.colors.text.primary} !important;
}

/* 表格样式 - 清洁的数据展示 */
.orca-table-row {
    border-bottom: 1px solid ${this.colors.ui.border} !important;
    transition: background-color 0.15s ease !important;
}

.orca-table-row:hover {
    background-color: ${this.colors.ui.hover}66 !important;
}

.orca-table-row.selected {
    background-color: ${this.colors.ui.selection} !important;
    color: ${this.colors.text.primary} !important;
}

/* 滚动条 - 微妙但功能性 */
*::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

*::-webkit-scrollbar-track {
    background: transparent;
}

*::-webkit-scrollbar-thumb {
    background-color: ${this.colors.ui.border};
    border-radius: 4px;
    /* 悬停时稍微突出 */
    transition: background-color 0.2s ease;
}

*::-webkit-scrollbar-thumb:hover {
    background-color: ${this.colors.ui.hover};
}
`;
    return uiCSS;
  }

  /**
   * 应用焦点状态
   * 
   * 为所有交互元素提供清晰但不突兀的焦点指示器，
   * 确保键盘导航的可访问性。
   */
  public applyFocusStates(): string {
    const focusCSS = `
/* 焦点状态样式 - 可访问性优先 */

/* 通用焦点样式 */
*:focus {
    outline: 2px solid ${this.colors.ui.focus} !important;
    outline-offset: 2px !important;
}

/* 编辑器内容的焦点 */
.orca-panels-container .orca-repr-main-content:focus,
.orca-panels-container .orca-block-editor:focus-within {
    outline: 2px solid ${this.colors.ui.focus} !important;
    outline-offset: -2px !important;
    /* 编辑器焦点时的微妙阴影 */
    box-shadow: 0 0 0 3px ${this.colors.ui.focus}22 !important;
}

/* 按钮焦点 */
.orca-button:focus {
    outline: 2px solid ${this.colors.ui.focus} !important;
    outline-offset: 2px !important;
    /* 按钮焦点时的额外视觉反馈 */
    box-shadow: 0 0 0 3px ${this.colors.ui.focus}33 !important;
}

/* 输入框焦点 */
.orca-input-input:focus-within {
    outline: none !important; /* 使用自定义边框样式 */
    border-color: ${this.colors.ui.focus} !important;
    box-shadow: 0 0 0 2px ${this.colors.ui.focus}44 !important;
}

/* 链接焦点 */
a:focus {
    outline: 2px solid ${this.colors.ui.focus} !important;
    outline-offset: 2px !important;
    border-radius: 2px !important;
}

/* 侧边栏项目焦点 */
nav#sidebar .item:focus,
nav#sidebar a:focus {
    outline: 2px solid ${this.colors.ui.focus} !important;
    outline-offset: -2px !important;
    border-radius: 4px !important;
}

/* 菜单项焦点 */
.orca-menu .orca-menu-item:focus,
.orca-popup .item:focus {
    outline: 2px solid ${this.colors.ui.focus} !important;
    outline-offset: -2px !important;
    background-color: ${this.colors.ui.hover} !important;
}

/* 确保焦点样式在所有状态下都可见 */
*:focus:not(:focus-visible) {
    outline: none !important;
}

*:focus-visible {
    outline: 2px solid ${this.colors.ui.focus} !important;
    outline-offset: 2px !important;
}
`;
    return focusCSS;
  }

  /**
   * 生成完整的视觉层次CSS
   * 
   * 组合所有视觉层次样式，生成完整的CSS字符串。
   */
  public generateHierarchyCSS(): string {
    const css = `
/* Tokyo Night 视觉层次系统 */
/* 编辑器优先，侧边栏弱化的设计哲学 */

${this.emphasizeEditor()}

${this.subduesSidebar()}

${this.balanceUIElements()}

${this.applyFocusStates()}

/* 全局视觉层次调整 */
body, #app {
    /* 确保整体布局支持视觉层次 */
    background-color: ${this.colors.background.primary} !important;
    color: ${this.colors.text.primary} !important;
}

/* 确保内容区域获得最高优先级 */
.orca-panels-container {
    position: relative;
    z-index: 10;
}

/* 侧边栏保持较低的视觉层次 */
nav#sidebar {
    position: relative;
    z-index: 5;
}

/* 其他UI元素保持中等层次 */
.orca-modal,
.orca-dialog,
.orca-popup,
.orca-menu {
    z-index: 100; /* 弹出层需要在最上层 */
}
`;
    return css;
  }

  /**
   * 应用视觉层次样式
   * 
   * 将生成的CSS应用到页面中。
   */
  public apply(): void {
    this.remove(); // 先移除现有样式

    const css = this.generateHierarchyCSS();
    const styleId = `${this.pluginId}-visual-hierarchy`;

    this.styleElement = document.createElement('style');
    this.styleElement.id = styleId;
    this.styleElement.textContent = css;

    if (document.head) {
      document.head.appendChild(this.styleElement);
    }
  }

  /**
   * 移除视觉层次样式
   */
  public remove(): void {
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }

    // 也尝试通过ID移除，以防引用丢失
    const styleId = `${this.pluginId}-visual-hierarchy`;
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }
  }

  /**
   * 更新主题变体
   * 
   * 当主题变体改变时，更新颜色并重新应用样式。
   */
  public updateVariant(variant: ThemeVariant): void {
    this.currentVariant = variant;
    this.colors = getVariantColors(variant);
    this.config = this.createHierarchyConfig();
    
    // 重新应用样式
    this.apply();
  }

  /**
   * 验证视觉层次的可访问性
   * 
   * 检查当前配置是否满足可访问性要求。
   */
  public validateAccessibility(): {
    editorContrast: number;
    sidebarContrast: number;
    focusContrast: number;
    meetsWCAG: boolean;
  } {
    const editorContrast = calculateContrastRatio(
      this.colors.text.primary,
      this.colors.background.primary
    );

    const sidebarContrast = calculateContrastRatio(
      this.colors.text.secondary,
      this.colors.background.secondary
    );

    const focusContrast = calculateContrastRatio(
      this.colors.ui.focus,
      this.colors.background.primary
    );

    const meetsWCAG = editorContrast >= 4.5 && sidebarContrast >= 3.0 && focusContrast >= 3.0;

    return {
      editorContrast,
      sidebarContrast,
      focusContrast,
      meetsWCAG,
    };
  }

  /**
   * 获取当前配置
   */
  public getConfig(): HierarchyConfig {
    return { ...this.config };
  }

  /**
   * 获取当前变体
   */
  public getCurrentVariant(): ThemeVariant {
    return this.currentVariant;
  }
}

/**
 * 创建视觉层次控制器实例
 * 
 * @param variant 主题变体
 * @param pluginId 插件ID
 * @returns 视觉层次控制器实例
 */
export function createVisualHierarchyController(
  variant: ThemeVariant,
  pluginId: string
): VisualHierarchyController {
  return new VisualHierarchyController(variant, pluginId);
}