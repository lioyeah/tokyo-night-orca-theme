import { ThemeVariant, TokyoNightColors } from '../types/colors';
import { getVariantColors } from '../utils/colors';

/**
 * 动画系统接口定义
 * 管理主题中的过渡效果和微交互
 */
export interface AnimationSystemInterface {
  duration: {
    fast: number;    // 150ms - 快速交互
    normal: number;  // 250ms - 标准过渡
    slow: number;    // 350ms - 慢速动画
  };
  
  easing: {
    ease: string;        // 标准缓动
    easeIn: string;      // 缓入
    easeOut: string;     // 缓出
    easeInOut: string;   // 缓入缓出
  };
  
  applyTransitions(element: string, properties: string[]): string;
  respectMotionPreferences(): boolean;
  generateHoverEffects(variant: ThemeVariant): string;
  generateModalAnimations(variant: ThemeVariant): string;
  generateFocusIndicators(variant: ThemeVariant): string;
}

/**
 * 动画系统实现类
 * 提供一致的动画时间、缓动函数和过渡效果
 */
export class AnimationSystem implements AnimationSystemInterface {
  public readonly duration = {
    fast: 150,    // 快速交互 - 按钮悬停、小元素状态变化
    normal: 250,  // 标准过渡 - 面板切换、颜色变化
    slow: 350     // 慢速动画 - 模态框出现、大面积变化
  };

  public readonly easing = {
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',           // 标准缓动
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)',              // 缓入
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)',             // 缓出
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)'         // 缓入缓出
  };

  private pluginId: string;

  constructor(pluginId: string) {
    this.pluginId = pluginId;
  }

  /**
   * 为指定元素应用过渡效果
   * @param element CSS选择器
   * @param properties 需要过渡的CSS属性数组
   * @returns 生成的CSS过渡规则
   */
  applyTransitions(element: string, properties: string[]): string {
    const transitionProperties = properties.map(prop => 
      `${prop} ${this.duration.normal}ms ${this.easing.ease}`
    ).join(', ');

    return `
${element} {
    transition: ${transitionProperties};
}

/* 尊重用户的减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
    ${element} {
        transition: none !important;
    }
}`;
  }

  /**
   * 检查是否应该尊重用户的减少动画偏好
   * @returns 是否应该减少动画
   */
  respectMotionPreferences(): boolean {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }

  /**
   * 生成悬停效果的CSS
   * @param variant 主题变体
   * @returns 悬停效果CSS字符串
   */
  generateHoverEffects(variant: ThemeVariant): string {
    const colors = getVariantColors(variant);
    
    return `
/* 通用悬停效果 */
.orca-button,
.orca-input-input,
nav#sidebar .item,
nav#sidebar a,
.orca-settings .item {
    transition: background-color ${this.duration.fast}ms ${this.easing.easeOut},
                color ${this.duration.fast}ms ${this.easing.easeOut},
                border-color ${this.duration.fast}ms ${this.easing.easeOut},
                box-shadow ${this.duration.fast}ms ${this.easing.easeOut};
}

/* 按钮悬停效果 */
.orca-button:hover {
    transform: translateY(-1px);
    transition: background-color ${this.duration.fast}ms ${this.easing.easeOut},
                color ${this.duration.fast}ms ${this.easing.easeOut},
                transform ${this.duration.fast}ms ${this.easing.easeOut};
}

/* 侧边栏项目悬停效果 */
nav#sidebar .item:hover,
nav#sidebar a:hover {
    background-color: ${colors.ui.hover} !important;
    color: ${colors.text.primary} !important;
}

/* 输入框聚焦效果 */
.orca-input-input:focus-within {
    box-shadow: 0 0 0 2px ${colors.semantic.blue}35 !important;
    border-color: ${colors.semantic.blue} !important;
}

/* 尊重用户的减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
    .orca-button:hover {
        transform: none !important;
    }
    
    .orca-button,
    .orca-input-input,
    nav#sidebar .item,
    nav#sidebar a,
    .orca-settings .item {
        transition: none !important;
    }
}`;
  }

  /**
   * 生成模态框动画的CSS
   * @param variant 主题变体
   * @returns 模态框动画CSS字符串
   */
  generateModalAnimations(variant: ThemeVariant): string {
    const colors = getVariantColors(variant);
    
    return `
/* 模态框淡入动画 */
.orca-modal,
.orca-settings,
.orca-popup {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
    animation: modalFadeIn ${this.duration.slow}ms ${this.easing.easeOut} forwards;
}

@keyframes modalFadeIn {
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

/* 模态框背景遮罩淡入 */
.orca-modal-backdrop,
.orca-overlay {
    opacity: 0;
    animation: backdropFadeIn ${this.duration.normal}ms ${this.easing.ease} forwards;
}

@keyframes backdropFadeIn {
    to {
        opacity: 1;
    }
}

/* 面板滑入效果 */
.orca-panel,
.orca-sidebar-panel {
    transform: translateX(-100%);
    animation: panelSlideIn ${this.duration.slow}ms ${this.easing.easeOut} forwards;
}

@keyframes panelSlideIn {
    to {
        transform: translateX(0);
    }
}

/* 下拉菜单展开效果 */
.orca-dropdown,
.orca-menu {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
    animation: dropdownExpand ${this.duration.normal}ms ${this.easing.easeOut} forwards;
}

@keyframes dropdownExpand {
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* 尊重用户的减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
    .orca-modal,
    .orca-settings,
    .orca-popup,
    .orca-modal-backdrop,
    .orca-overlay,
    .orca-panel,
    .orca-sidebar-panel,
    .orca-dropdown,
    .orca-menu {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
    }
}`;
  }

  /**
   * 生成焦点指示器的CSS
   * @param variant 主题变体
   * @returns 焦点指示器CSS字符串
   */
  generateFocusIndicators(variant: ThemeVariant): string {
    const colors = getVariantColors(variant);
    
    return `
/* 通用焦点指示器 */
*:focus {
    outline: 2px solid ${colors.semantic.blue};
    outline-offset: 2px;
    transition: outline-color ${this.duration.fast}ms ${this.easing.ease};
}

/* 按钮焦点指示器 */
.orca-button:focus {
    outline: 2px solid ${colors.semantic.blue};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px ${colors.semantic.blue}25;
}

/* 输入框焦点指示器 */
.orca-input-input:focus-within {
    outline: 2px solid ${colors.semantic.blue};
    outline-offset: 1px;
    box-shadow: 0 0 0 3px ${colors.semantic.blue}25;
}

/* 链接焦点指示器 */
a:focus {
    outline: 2px solid ${colors.semantic.blue};
    outline-offset: 2px;
    text-decoration: underline;
    text-decoration-color: ${colors.semantic.blue};
}

/* 侧边栏项目焦点指示器 */
nav#sidebar .item:focus,
nav#sidebar a:focus {
    outline: 2px solid ${colors.semantic.blue};
    outline-offset: -2px;
    background-color: ${colors.ui.selection} !important;
}

/* 开关组件焦点指示器 */
.orca-switch:focus {
    outline: 2px solid ${colors.semantic.blue};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px ${colors.semantic.blue}25;
}

/* 分段控件焦点指示器 */
.orca-segmented-item:focus {
    outline: 2px solid ${colors.semantic.blue};
    outline-offset: 1px;
    z-index: 1;
}

/* 确保焦点指示器在高对比度模式下可见 */
@media (prefers-contrast: high) {
    *:focus {
        outline-width: 3px;
        outline-color: ${colors.text.primary};
    }
}

/* 尊重用户的减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
    *:focus,
    .orca-button:focus,
    .orca-input-input:focus-within,
    a:focus,
    nav#sidebar .item:focus,
    nav#sidebar a:focus,
    .orca-switch:focus,
    .orca-segmented-item:focus {
        transition: none !important;
    }
}`;
  }

  /**
   * 生成微交互效果的CSS
   * @param variant 主题变体
   * @returns 微交互CSS字符串
   */
  generateMicroInteractions(variant: ThemeVariant): string {
    const colors = getVariantColors(variant);
    
    return `
/* 按钮按下效果 */
.orca-button:active {
    transform: translateY(1px) scale(0.98);
    transition: transform ${this.duration.fast}ms ${this.easing.easeIn};
}

/* 开关切换动画 */
.orca-switch-toggle {
    transition: transform ${this.duration.normal}ms ${this.easing.easeInOut},
                background-color ${this.duration.normal}ms ${this.easing.ease};
}

.orca-switch.orca-switch-on .orca-switch-toggle {
    transform: translateX(100%);
}

/* 复选框勾选动画 */
.orca-checkbox input:checked + .orca-checkbox-mark {
    animation: checkboxCheck ${this.duration.normal}ms ${this.easing.easeOut};
}

@keyframes checkboxCheck {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* 加载指示器旋转动画 */
.orca-loading-spinner {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* 进度条填充动画 */
.orca-progress-bar {
    transition: width ${this.duration.slow}ms ${this.easing.easeOut};
}

/* 标签页切换效果 */
.orca-tab {
    transition: color ${this.duration.fast}ms ${this.easing.ease},
                border-color ${this.duration.fast}ms ${this.easing.ease};
}

.orca-tab.active {
    border-bottom-color: ${colors.semantic.blue};
}

/* 工具提示淡入效果 */
.orca-tooltip {
    opacity: 0;
    transform: translateY(5px);
    transition: opacity ${this.duration.normal}ms ${this.easing.easeOut},
                transform ${this.duration.normal}ms ${this.easing.easeOut};
}

.orca-tooltip.visible {
    opacity: 1;
    transform: translateY(0);
}

/* 尊重用户的减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
    .orca-button:active {
        transform: none !important;
    }
    
    .orca-switch-toggle,
    .orca-checkbox input:checked + .orca-checkbox-mark,
    .orca-progress-bar,
    .orca-tab,
    .orca-tooltip {
        transition: none !important;
        animation: none !important;
    }
    
    .orca-loading-spinner {
        animation: none !important;
    }
}`;
  }

  /**
   * 生成完整的动画系统CSS
   * @param variant 主题变体
   * @returns 完整的动画CSS字符串
   */
  generateAnimationCSS(variant: ThemeVariant): string {
    return `
/* Tokyo Night 动画系统 - ${variant} 变体 */
/* 由 AnimationSystem 类生成 */

${this.generateHoverEffects(variant)}

${this.generateModalAnimations(variant)}

${this.generateFocusIndicators(variant)}

${this.generateMicroInteractions(variant)}

/* 全局动画性能优化 */
* {
    /* 启用硬件加速 */
    will-change: auto;
}

/* 为经常变化的元素启用硬件加速 */
.orca-button,
.orca-modal,
.orca-dropdown,
.orca-switch-toggle {
    will-change: transform, opacity;
}

/* 动画完成后移除will-change */
.animation-complete {
    will-change: auto;
}`;
  }

  /**
   * 移除动画系统样式（为了兼容性）
   * 注意：AnimationSystem 不直接管理DOM样式，此方法为空实现
   */
  remove(): void {
    // AnimationSystem 不直接管理DOM样式
    // 样式的移除由使用它的组件负责
  }
}

/**
 * 创建动画系统实例
 * @param pluginId 插件ID
 * @returns AnimationSystem实例
 */
export function createAnimationSystem(pluginId: string): AnimationSystem {
  return new AnimationSystem(pluginId);
}