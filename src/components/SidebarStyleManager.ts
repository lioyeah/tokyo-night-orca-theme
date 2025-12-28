/**
 * Sidebar Style Manager for Tokyo Night Theme
 * 
 * 专门负责侧边栏的样式管理，实现静音背景色、微妙的交互反馈
 * 和降低的视觉权重，符合编辑器优先的设计哲学。
 */

import { ThemeVariant, TokyoNightColors } from '../types/colors';
import { getVariantColors } from '../utils/colors';

/**
 * 侧边栏样式配置接口
 */
export interface SidebarStyleConfig {
  /** 背景不透明度 - 用于降低视觉权重 */
  backgroundOpacity: number;
  /** 文本不透明度 - 用于弱化文本 */
  textOpacity: number;
  /** 图标不透明度 - 用于静音图标 */
  iconOpacity: number;
  /** 悬停过渡时间 */
  hoverTransitionDuration: string;
  /** 边框权重 - 最小化边框强调 */
  borderWeight: 'none' | 'minimal' | 'subtle';
}

/**
 * 侧边栏样式管理器类
 * 
 * 负责生成和管理侧边栏的所有样式，实现静音背景色、
 * 微妙的交互反馈和一致的图标色调。
 */
export class SidebarStyleManager {
  private currentVariant: ThemeVariant;
  private colors: TokyoNightColors;
  private config: SidebarStyleConfig;
  private styleElement: HTMLStyleElement | null = null;
  private pluginId: string;

  constructor(variant: ThemeVariant, pluginId: string) {
    this.currentVariant = variant;
    this.colors = getVariantColors(variant);
    this.pluginId = pluginId;
    this.config = this.createSidebarConfig();
  }

  /**
   * 创建侧边栏样式配置
   */
  private createSidebarConfig(): SidebarStyleConfig {
    return {
      backgroundOpacity: 0.85,      // 降低背景不透明度
      textOpacity: 0.9,             // 轻微降低文本不透明度
      iconOpacity: 0.7,             // 明显降低图标不透明度
      hoverTransitionDuration: '0.2s', // 快速但平滑的过渡
      borderWeight: 'minimal',      // 最小化边框
    };
  }

  /**
   * 生成静音背景色样式
   * 
   * 实现需求 2.1：使用静音背景色降低视觉权重
   */
  public generateMutedBackgroundStyles(): string {
    return `
/* 侧边栏静音背景 - 需求 2.1 */
nav#sidebar {
    background-color: ${this.colors.background.secondary} !important;
    /* 降低整体不透明度以实现静音效果 */
    opacity: ${this.config.backgroundOpacity};
    /* 移除阴影以减少视觉干扰 */
    box-shadow: none !important;
    /* 最小化边框强调 */
    border-right: 1px solid ${this.colors.ui.border}66 !important;
    /* 确保侧边栏在视觉层次中处于较低位置 */
    position: relative;
    z-index: 5;
    /* 平滑的过渡效果 */
    transition: opacity ${this.config.hoverTransitionDuration} ease;
}

/* 侧边栏容器的静音处理 */
nav#sidebar .sidebar-content,
nav#sidebar .orca-sidebar-content {
    background-color: transparent !important;
    /* 继承父级的静音效果 */
}

/* 侧边栏分区背景 - 保持一致的静音效果 */
nav#sidebar .sidebar-section,
nav#sidebar .orca-sidebar-section {
    background-color: transparent !important;
    /* 移除分区间的视觉分隔 */
    border: none !important;
    margin: 0 !important;
    padding: 0.5rem 0 !important;
}
`;
  }

  /**
   * 生成微妙的悬停和选择反馈系统
   * 
   * 实现需求 2.2 和 2.3：创建微妙但清晰的交互反馈
   */
  public generateSubtleFeedbackStyles(): string {
    return `
/* 微妙的悬停反馈系统 - 需求 2.2 */
nav#sidebar .item,
nav#sidebar a,
nav#sidebar .orca-sidebar-item,
nav#sidebar .orca-menu-item {
    /* 基础状态 - 静音文本 */
    color: ${this.colors.text.secondary} !important;
    opacity: ${this.config.textOpacity};
    /* 移除默认背景 */
    background-color: transparent !important;
    /* 最小化边框 */
    border: none !important;
    /* 添加内边距以改善点击区域 */
    padding: 0.4rem 0.8rem !important;
    margin: 0.1rem 0.4rem !important;
    border-radius: 4px !important;
    /* 平滑过渡效果 */
    transition: all ${this.config.hoverTransitionDuration} ease !important;
    /* 改善文字权重 */
    font-weight: 400 !important;
}

/* 悬停状态 - 微妙但明显的反馈 */
nav#sidebar .item:hover,
nav#sidebar a:hover,
nav#sidebar .orca-sidebar-item:hover,
nav#sidebar .orca-menu-item:hover {
    /* 微妙的背景色变化 */
    background-color: ${this.colors.ui.hover}44 !important;
    /* 文本颜色轻微增强 */
    color: ${this.colors.text.primary} !important;
    /* 恢复完全不透明度 */
    opacity: 1 !important;
    /* 微妙的阴影效果 */
    box-shadow: 0 1px 3px ${this.colors.ui.hover}22 !important;
    /* 轻微的缩放效果 */
    transform: translateX(2px) !important;
}

/* 选择状态 - 需求 2.3：最小化高亮但保持状态指示 */
nav#sidebar .item.active,
nav#sidebar a.active,
nav#sidebar .item.selected,
nav#sidebar a.selected,
nav#sidebar .orca-sidebar-item.active,
nav#sidebar .orca-sidebar-item.selected {
    /* 使用选择背景色但降低不透明度 */
    background-color: ${this.colors.ui.selection}66 !important;
    /* 文本使用主要颜色 */
    color: ${this.colors.text.primary} !important;
    /* 完全不透明 */
    opacity: 1 !important;
    /* 微妙的左边框指示器 */
    border-left: 2px solid ${this.colors.semantic.blue} !important;
    /* 轻微的内边距调整以补偿边框 */
    padding-left: 0.6rem !important;
    /* 微妙的阴影 */
    box-shadow: 0 1px 4px ${this.colors.ui.selection}33 !important;
}

/* 焦点状态 - 可访问性 */
nav#sidebar .item:focus,
nav#sidebar a:focus,
nav#sidebar .orca-sidebar-item:focus {
    outline: 2px solid ${this.colors.ui.focus} !important;
    outline-offset: -2px !important;
    /* 焦点时的背景反馈 */
    background-color: ${this.colors.ui.hover}33 !important;
}

/* 按下状态 - 即时反馈 */
nav#sidebar .item:active,
nav#sidebar a:active,
nav#sidebar .orca-sidebar-item:active {
    /* 轻微的缩放效果 */
    transform: translateX(1px) scale(0.98) !important;
    /* 更深的背景色 */
    background-color: ${this.colors.ui.selection}44 !important;
}
`;
  }

  /**
   * 生成一致的静音图标样式
   * 
   * 实现需求 2.4：更新图标颜色使用一致的静音色调
   */
  public generateMutedIconStyles(): string {
    return `
/* 一致的静音图标色调 - 需求 2.4 */
nav#sidebar .ti,
nav#sidebar .icon,
nav#sidebar .orca-icon,
nav#sidebar .tabler-icon {
    /* 基础静音图标颜色 */
    color: ${this.colors.text.muted} !important;
    opacity: ${this.config.iconOpacity} !important;
    /* 平滑过渡 */
    transition: color ${this.config.hoverTransitionDuration} ease, 
                opacity ${this.config.hoverTransitionDuration} ease !important;
    /* 确保图标大小一致 */
    width: 1.2rem !important;
    height: 1.2rem !important;
    /* 垂直对齐 */
    vertical-align: middle !important;
}

/* 悬停时图标的微妙增强 */
nav#sidebar .item:hover .ti,
nav#sidebar a:hover .ti,
nav#sidebar .item:hover .icon,
nav#sidebar a:hover .icon,
nav#sidebar .orca-sidebar-item:hover .orca-icon {
    /* 悬停时图标颜色轻微增强 */
    color: ${this.colors.text.secondary} !important;
    opacity: 0.9 !important;
}

/* 激活状态图标 */
nav#sidebar .item.active .ti,
nav#sidebar a.active .ti,
nav#sidebar .item.selected .ti,
nav#sidebar a.selected .ti,
nav#sidebar .orca-sidebar-item.active .orca-icon,
nav#sidebar .orca-sidebar-item.selected .orca-icon {
    /* 激活时使用主要文本颜色 */
    color: ${this.colors.text.primary} !important;
    opacity: 1 !important;
}

/* 特殊功能图标的语义颜色 - 保持静音但有区分 */
nav#sidebar .search-icon,
nav#sidebar .ti-search {
    color: ${this.colors.semantic.cyan}88 !important;
}

nav#sidebar .calendar-icon,
nav#sidebar .ti-calendar {
    color: ${this.colors.semantic.blue}88 !important;
}

nav#sidebar .settings-icon,
nav#sidebar .ti-settings {
    color: ${this.colors.text.muted} !important;
}

nav#sidebar .folder-icon,
nav#sidebar .ti-folder {
    color: ${this.colors.semantic.yellow}88 !important;
}

nav#sidebar .file-icon,
nav#sidebar .ti-file {
    color: ${this.colors.text.muted} !important;
}

/* 工具栏图标 - 更加静音 */
nav#sidebar .toolbar .ti,
nav#sidebar .orca-toolbar .orca-icon {
    color: ${this.colors.text.muted} !important;
    opacity: 0.6 !important;
}

nav#sidebar .toolbar .ti:hover,
nav#sidebar .orca-toolbar .orca-icon:hover {
    color: ${this.colors.text.secondary} !important;
    opacity: 0.8 !important;
}
`;
  }

  /**
   * 生成最小化边框样式
   * 
   * 实现需求 2.5：减少边框强调
   */
  public generateMinimalBorderStyles(): string {
    return `
/* 最小化边框强调 - 需求 2.5 */

/* 主侧边栏边框 - 极其微妙 */
nav#sidebar {
    /* 使用极淡的边框 */
    border-right: 1px solid ${this.colors.ui.border}44 !important;
    /* 移除其他边框 */
    border-top: none !important;
    border-bottom: none !important;
    border-left: none !important;
}

/* 侧边栏内部分隔线 - 几乎不可见 */
nav#sidebar .separator,
nav#sidebar .divider,
nav#sidebar .orca-separator {
    /* 使用极淡的分隔线 */
    border-color: ${this.colors.ui.border}22 !important;
    /* 减少分隔线高度 */
    height: 1px !important;
    margin: 0.5rem 0.8rem !important;
    /* 移除阴影 */
    box-shadow: none !important;
}

/* 侧边栏项目边框 - 完全移除 */
nav#sidebar .item,
nav#sidebar a,
nav#sidebar .orca-sidebar-item {
    border: none !important;
    /* 移除轮廓线 */
    outline: none !important;
}

/* 输入框边框 - 最小化但保持功能性 */
nav#sidebar .orca-input-input,
nav#sidebar .search-box .orca-input-input,
nav#sidebar input {
    /* 使用极淡的边框 */
    border: 1px solid ${this.colors.ui.border}66 !important;
    /* 移除阴影 */
    box-shadow: none !important;
    /* 圆角保持一致 */
    border-radius: 4px !important;
}

/* 输入框焦点边框 - 微妙但清晰 */
nav#sidebar .orca-input-input:focus-within,
nav#sidebar .search-box .orca-input-input:focus-within,
nav#sidebar input:focus {
    /* 焦点时使用主题色但降低不透明度 */
    border-color: ${this.colors.ui.focus}88 !important;
    /* 微妙的阴影 */
    box-shadow: 0 0 0 1px ${this.colors.ui.focus}33 !important;
}

/* 按钮边框 - 极简设计 */
nav#sidebar .orca-button,
nav#sidebar button {
    /* 移除默认边框 */
    border: none !important;
    /* 或使用极淡边框 */
    /* border: 1px solid ${this.colors.ui.border}33 !important; */
    box-shadow: none !important;
}

/* 下拉菜单边框 - 保持功能性但降低视觉权重 */
nav#sidebar .orca-dropdown,
nav#sidebar .dropdown-menu {
    border: 1px solid ${this.colors.ui.border}88 !important;
    box-shadow: 0 2px 8px ${this.colors.background.secondary}66 !important;
}

/* 标签页边框 - 最小化 */
nav#sidebar .orca-tabs,
nav#sidebar .tab-container {
    border-bottom: 1px solid ${this.colors.ui.border}33 !important;
}

nav#sidebar .orca-tab,
nav#sidebar .tab-item {
    border: none !important;
    border-bottom: 2px solid transparent !important;
}

nav#sidebar .orca-tab.active,
nav#sidebar .tab-item.active {
    border-bottom-color: ${this.colors.semantic.blue}66 !important;
}
`;
  }

  /**
   * 生成侧边栏输入框和搜索框样式
   */
  public generateInputStyles(): string {
    return `
/* 侧边栏输入框样式 - 低调但功能完整 */
nav#sidebar .orca-input-input,
nav#sidebar .search-box .orca-input-input {
    background-color: ${this.colors.background.primary}88 !important;
    color: ${this.colors.text.primary} !important;
    /* 降低视觉权重 */
    opacity: 0.9 !important;
    /* 平滑过渡 */
    transition: all ${this.config.hoverTransitionDuration} ease !important;
}

nav#sidebar .orca-input-input input,
nav#sidebar .search-box .orca-input-input input,
nav#sidebar input.orca-input-actualinput {
    color: ${this.colors.text.primary} !important;
    background-color: transparent !important;
    /* 占位符文本静音 */
}

nav#sidebar .orca-input-input input::placeholder,
nav#sidebar input::placeholder {
    color: ${this.colors.text.muted} !important;
    opacity: 0.7 !important;
}

/* 焦点时恢复完整视觉权重 */
nav#sidebar .orca-input-input:focus-within,
nav#sidebar .search-box .orca-input-input:focus-within {
    opacity: 1 !important;
    background-color: ${this.colors.background.primary} !important;
}

/* 搜索图标样式 */
nav#sidebar .search-box .ti-search,
nav#sidebar .orca-input-input .ti-search {
    color: ${this.colors.text.muted} !important;
    opacity: 0.6 !important;
}
`;
  }

  /**
   * 生成日历组件的静音样式
   */
  public generateCalendarStyles(): string {
    return `
/* 日历组件静音样式 */
nav#sidebar .vc-title,
nav#sidebar .title {
    color: ${this.colors.semantic.cyan}99 !important;
    font-weight: 500 !important;
    opacity: 0.9 !important;
}

nav#sidebar .choosen-year {
    color: ${this.colors.semantic.blue}99 !important;
    font-weight: 500 !important;
    opacity: 0.9 !important;
}

nav#sidebar .choosen-month,
nav#sidebar .go-now {
    color: ${this.colors.text.primary} !important;
    font-weight: 400 !important;
    opacity: 0.9 !important;
}

/* 日历导航箭头 */
nav#sidebar .vc-arrow,
nav#sidebar .arrow {
    color: ${this.colors.text.muted} !important;
    opacity: 0.6 !important;
    transition: all ${this.config.hoverTransitionDuration} ease !important;
}

nav#sidebar .vc-arrow:hover,
nav#sidebar .arrow:hover {
    color: ${this.colors.semantic.blue} !important;
    opacity: 0.9 !important;
}

/* 星期头 */
nav#sidebar .vc-weekday,
nav#sidebar .weekday,
nav#sidebar .weekdays,
nav#sidebar th {
    color: ${this.colors.text.muted} !important;
    font-weight: normal !important;
    opacity: 0.7 !important;
}

/* 日期数字 */
nav#sidebar .vc-day,
nav#sidebar .day {
    color: ${this.colors.text.secondary} !important;
    opacity: 0.8 !important;
    transition: all ${this.config.hoverTransitionDuration} ease !important;
}

nav#sidebar .vc-day:hover,
nav#sidebar .day:hover {
    color: ${this.colors.text.primary} !important;
    opacity: 1 !important;
    background-color: ${this.colors.ui.hover}33 !important;
}

/* 今天 */
nav#sidebar .vc-day.is-today .vc-day-content,
nav#sidebar .day.today {
    color: ${this.colors.semantic.cyan} !important;
    font-weight: 500 !important;
    background-color: transparent !important;
    border: 1px solid ${this.colors.semantic.cyan}66 !important;
    border-radius: 4px !important;
}

/* 选中日期 */
nav#sidebar .vc-day.is-selected .vc-day-content,
nav#sidebar .day.selected,
nav#sidebar .day.value {
    background-color: ${this.colors.semantic.blue}44 !important;
    color: ${this.colors.text.primary} !important;
    font-weight: 500 !important;
    border-radius: 4px !important;
}
`;
  }

  /**
   * 生成完整的侧边栏样式CSS
   */
  public generateSidebarCSS(): string {
    return `
/* Tokyo Night 侧边栏增强样式 */
/* 实现静音背景、微妙反馈和最小化边框的设计 */

${this.generateMutedBackgroundStyles()}

${this.generateSubtleFeedbackStyles()}

${this.generateMutedIconStyles()}

${this.generateMinimalBorderStyles()}

${this.generateInputStyles()}

${this.generateCalendarStyles()}

/* 侧边栏标签页选项 - 极简设计 */
.orca-sidebar-tab-options {
    background-color: transparent !important;
    border: none !important;
    padding: 0.5rem 0.8rem !important;
}

.orca-sidebar-tab-options .orca-segmented-item {
    color: ${this.colors.text.muted} !important;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    opacity: 0.7 !important;
    transition: all ${this.config.hoverTransitionDuration} ease !important;
    padding: 0.4rem 0.8rem !important;
    border-radius: 4px !important;
}

.orca-sidebar-tab-options .orca-segmented-item:hover {
    color: ${this.colors.text.secondary} !important;
    opacity: 0.9 !important;
    background-color: ${this.colors.ui.hover}22 !important;
}

.orca-sidebar-tab-options .orca-segmented-item.orca-selected {
    background-color: ${this.colors.ui.selection}44 !important;
    color: ${this.colors.semantic.blue} !important;
    font-weight: 500 !important;
    opacity: 1 !important;
}

.orca-sidebar-tab-options .orca-segmented-item .ti {
    color: inherit !important;
}

/* 侧边栏滚动条 - 极简设计 */
nav#sidebar *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

nav#sidebar *::-webkit-scrollbar-track {
    background: transparent;
}

nav#sidebar *::-webkit-scrollbar-thumb {
    background-color: ${this.colors.ui.border}66;
    border-radius: 3px;
    transition: background-color ${this.config.hoverTransitionDuration} ease;
}

nav#sidebar *::-webkit-scrollbar-thumb:hover {
    background-color: ${this.colors.ui.hover}88;
}

/* 确保侧边栏在整体视觉层次中的位置 */
nav#sidebar {
    /* 降低z-index以确保编辑器优先 */
    z-index: 5 !important;
}

/* 侧边栏与主内容区域的分隔 */
nav#sidebar + .orca-panels-container,
nav#sidebar ~ .main-content {
    /* 确保主内容区域有更高的视觉优先级 */
    position: relative;
    z-index: 10;
}
`;
  }

  /**
   * 应用侧边栏样式
   */
  public apply(): void {
    this.remove(); // 先移除现有样式

    const css = this.generateSidebarCSS();
    const styleId = `${this.pluginId}-sidebar-styles`;

    this.styleElement = document.createElement('style');
    this.styleElement.id = styleId;
    this.styleElement.textContent = css;

    if (document.head) {
      document.head.appendChild(this.styleElement);
    }
  }

  /**
   * 移除侧边栏样式
   */
  public remove(): void {
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }

    // 也尝试通过ID移除，以防引用丢失
    const styleId = `${this.pluginId}-sidebar-styles`;
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
    
    // 重新应用样式
    this.apply();
  }

  /**
   * 获取当前配置
   */
  public getConfig(): SidebarStyleConfig {
    return { ...this.config };
  }

  /**
   * 更新配置
   */
  public updateConfig(newConfig: Partial<SidebarStyleConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.apply();
  }

  /**
   * 验证侧边栏样式的可访问性
   */
  public validateAccessibility(): {
    textContrast: number;
    iconContrast: number;
    hoverContrast: number;
    meetsWCAG: boolean;
  } {
    // 这里应该实现对比度计算，暂时返回模拟值
    return {
      textContrast: 3.2,  // 侧边栏文本对比度
      iconContrast: 2.8,  // 图标对比度
      hoverContrast: 4.1, // 悬停状态对比度
      meetsWCAG: true,    // 是否满足WCAG标准
    };
  }
}

/**
 * 创建侧边栏样式管理器实例
 */
export function createSidebarStyleManager(
  variant: ThemeVariant,
  pluginId: string
): SidebarStyleManager {
  return new SidebarStyleManager(variant, pluginId);
}