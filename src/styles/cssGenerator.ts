/**
 * CSS Generation Module for Tokyo Night Theme
 * 
 * This module generates CSS strings using the Tokyo Night color system,
 * replacing hardcoded CSS with dynamic generation based on theme variants.
 * 
 * 集成了视觉层次控制器、侧边栏样式管理器和排版系统，实现编辑器优先、侧边栏弱化的设计哲学。
 */

import { ThemeVariant } from '../types/colors';
import { getVariantColors, generateOrcaColorMapping, generateCSSCustomPropertiesString } from '../utils/colors';
import { createVisualHierarchyController } from '../components/VisualHierarchyController';
import { createSidebarStyleManager } from '../components/SidebarStyleManager';
import { createTypographySystem } from '../components/TypographySystem';
import { createUIComponentStyleManager } from '../components/UIComponentStyleManager';

/**
 * Generate base background and UI element CSS for a specific variant
 * 集成视觉层次控制器、侧边栏样式管理器和排版系统，实现编辑器优先的设计
 * @param variant - The theme variant to generate CSS for
 * @param pluginId - Plugin ID for visual hierarchy controller, sidebar manager, and typography system
 * @returns CSS string with base styling, visual hierarchy, enhanced sidebar, and typography improvements
 */
export function generateBaseBackgroundCSS(variant: ThemeVariant, pluginId?: string): string {
  const colors = getVariantColors(variant);
  const orcaMapping = generateOrcaColorMapping(variant);
  const customProperties = generateCSSCustomPropertiesString(variant);
  
  // Generate Orca variable overrides
  const orcaVariables = Object.entries(orcaMapping)
    .map(([property, value]) => `    ${property}: ${value} !important;`)
    .join('\n');

  // Generate visual hierarchy CSS if plugin ID is provided
  let hierarchyCSS = '';
  let sidebarCSS = '';
  let typographyCSS = '';
  let uiComponentCSS = '';
  if (pluginId) {
    const hierarchyController = createVisualHierarchyController(variant, pluginId);
    hierarchyCSS = hierarchyController.generateHierarchyCSS();
    
    // Generate enhanced sidebar CSS
    const sidebarManager = createSidebarStyleManager(variant, pluginId);
    sidebarCSS = sidebarManager.generateSidebarCSS();
    
    // Generate typography and spacing improvements
    const typographySystem = createTypographySystem(variant, pluginId);
    typographyCSS = typographySystem.generateTypographyCSS();
    
    // Generate UI component styles
    const uiComponentManager = createUIComponentStyleManager(variant, pluginId);
    uiComponentCSS = uiComponentManager.generateUIComponentCSS();
  }
  
  return `
${customProperties}

:root {
    /* Orca variable overrides using Tokyo Night colors */
${orcaVariables}
}

${hierarchyCSS}

${sidebarCSS}

${typographyCSS}

${uiComponentCSS}

/* Enhanced styling with visual hierarchy integration */
mark, .orca-highlight {
    background-color: var(--tokyo-night-hover) !important;
    color: var(--tokyo-night-red) !important;
    border-radius: 2px;
    padding: 0 2px;
}

/* Global cursor color with enhanced visibility */
* {
    caret-color: var(--tokyo-night-blue) !important;
}
`;
}

/**
 * Generate sidebar-specific CSS for a variant
 * 使用侧边栏样式管理器，实现增强的侧边栏设计
 * @param variant - The theme variant to generate CSS for
 * @param pluginId - Plugin ID for sidebar style manager
 * @returns CSS string with enhanced sidebar styling
 */
export function generateSidebarCSS(variant: ThemeVariant, pluginId?: string): string {
  if (pluginId) {
    // 使用新的侧边栏样式管理器
    const sidebarManager = createSidebarStyleManager(variant, pluginId);
    return sidebarManager.generateSidebarCSS();
  }
  
  // 如果没有插件ID，返回基础样式
  const colors = getVariantColors(variant);
  
  return `
/* Tokyo Night Sidebar Styling - 基础版本 */
nav#sidebar {
    background-color: var(--tokyo-night-bg-secondary) !important;
    color: var(--tokyo-night-text-secondary) !important;
    border-right: 1px solid var(--tokyo-night-border) !important;
    box-shadow: none !important;
}
`;
}

/**
 * Generate settings modal CSS for a variant
 * 集成视觉层次控制，确保设置界面的清晰度
 * @param variant - The theme variant to generate CSS for
 * @returns CSS string with settings modal styling and visual hierarchy
 */
export function generateSettingsModalCSS(variant: ThemeVariant): string {
  const colors = getVariantColors(variant);
  
  return `
/* Tokyo Night Settings Modal Styling - 清晰的层次结构 */
div.orca-settings {
    background-color: var(--tokyo-night-bg-tertiary) !important;
    color: var(--tokyo-night-text-primary) !important;
    border: 1px solid var(--tokyo-night-border) !important;
    /* 增强模态框的视觉层次 */
    box-shadow: 0 12px 32px rgba(0,0,0,0.4) !important;
    border-radius: var(--orca-radius-lg) !important;
    overflow: hidden !important;
    padding: 0 !important;
    /* 确保设置模态框在最高层 */
    z-index: 1000;
}

/* 设置模态框头部 */
.orca-settings > .headbar,
.orca-settings > .header,
.orca-settings > .head {
    background-color: var(--tokyo-night-bg-primary) !important;
    color: var(--tokyo-night-text-primary) !important;
    border-bottom: 1px solid var(--tokyo-night-border) !important;
    /* 增强头部的视觉权重 */
    font-weight: 600 !important;
    padding: 1rem 1.5rem !important;
}

/* 设置侧边栏 */
.orca-settings > .sections {
    background-color: var(--tokyo-night-bg-secondary) !important;
    border-right: 1px solid var(--tokyo-night-border) !important;
    border-top-left-radius: var(--orca-radius-lg) !important;
    border-bottom-left-radius: var(--orca-radius-lg) !important;
    overflow: hidden !important;
    padding-top: 0 !important;
    margin: 0 !important;
}

/* 设置内容区域 */
.orca-settings > .views {
    background-color: var(--tokyo-night-bg-tertiary) !important;
    color: var(--tokyo-night-text-primary) !important;
}

/* 表格头部 */
.orca-settings > .views .orca-table-header-cell,
.orca-settings .orca-table-header-cell,
.orca-settings > .views .orca-settings-shortcuts-header,
.orca-settings .orca-settings-shortcuts-header {
    background-color: var(--tokyo-night-bg-primary) !important;
    color: var(--tokyo-night-text-primary) !important;
    border-bottom: 1px solid var(--tokyo-night-border) !important;
    font-weight: 600 !important;
    padding: 0.75rem 1rem !important;
}

/* 设置项行 */
.orca-settings .orca-table-row {
    border-bottom: 1px solid var(--tokyo-night-border) !important;
    transition: background-color 0.15s ease !important;
}

.orca-settings .orca-table-row:hover {
    background-color: var(--tokyo-night-hover) !important;
}

.orca-settings .orca-table-row.selected {
    background-color: var(--tokyo-night-selection) !important;
    color: var(--tokyo-night-text-primary) !important;
}

/* 设置分段控件 */
.orca-settings .orca-segmented {
    background-color: var(--tokyo-night-bg-secondary) !important;
    border: 1px solid var(--tokyo-night-border) !important;
    border-radius: 6px !important;
    padding: 2px !important;
}

.orca-settings .orca-segmented .orca-segmented-item {
    color: var(--tokyo-night-text-secondary) !important;
    background-color: transparent !important;
    border: none !important;
    border-radius: 4px !important;
    padding: 0.5rem 1rem !important;
    transition: all 0.2s ease !important;
    font-weight: 500 !important;
}

.orca-settings .orca-segmented .orca-segmented-item:hover {
    background-color: var(--tokyo-night-hover) !important;
    color: var(--tokyo-night-text-primary) !important;
}

.orca-settings .orca-segmented .orca-segmented-item.orca-selected {
    background-color: var(--tokyo-night-blue) !important;
    color: var(--tokyo-night-bg-primary) !important;
    font-weight: 600 !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2) !important;
}

.orca-settings .orca-segmented .orca-segmented-item.orca-selected .ti {
    color: var(--tokyo-night-bg-primary) !important;
}

/* 设置输入框 */
.orca-settings .orca-input-input {
    background-color: var(--tokyo-night-bg-primary) !important;
    border: 1px solid var(--tokyo-night-border) !important;
    border-radius: 6px !important;
    color: var(--tokyo-night-text-primary) !important;
    transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
}

.orca-settings .orca-input-input:focus-within {
    border-color: var(--tokyo-night-focus) !important;
    box-shadow: 0 0 0 2px var(--tokyo-night-focus)33 !important;
}

/* 设置按钮 */
.orca-settings .orca-button {
    border-radius: 6px !important;
    font-weight: 500 !important;
    transition: all 0.2s ease !important;
}

.orca-settings .orca-button.primary {
    background-color: var(--tokyo-night-blue) !important;
    color: var(--tokyo-night-bg-primary) !important;
    border-color: var(--tokyo-night-blue) !important;
}

.orca-settings .orca-button.primary:hover {
    filter: brightness(1.1) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 2px 8px var(--tokyo-night-blue)44 !important;
}

.orca-settings .orca-button.soft {
    background-color: var(--tokyo-night-hover) !important;
    color: var(--tokyo-night-text-primary) !important;
    border-color: var(--tokyo-night-border) !important;
}

.orca-settings .orca-button.soft:hover {
    background-color: var(--tokyo-night-selection) !important;
}

/* 设置标签和描述 */
.orca-settings .setting-label {
    color: var(--tokyo-night-text-primary) !important;
    font-weight: 500 !important;
}

.orca-settings .setting-description {
    color: var(--tokyo-night-text-secondary) !important;
    font-size: 0.9em !important;
    line-height: 1.4 !important;
}

/* 设置开关 */
.orca-settings .orca-switch {
    background-color: var(--tokyo-night-border) !important;
    border-radius: 12px !important;
    transition: background-color 0.2s ease !important;
}

.orca-settings .orca-switch.checked {
    background-color: var(--tokyo-night-blue) !important;
}

.orca-settings .orca-switch .orca-switch-thumb {
    background-color: var(--tokyo-night-bg-primary) !important;
    border-radius: 50% !important;
    transition: transform 0.2s ease !important;
}

/* 设置选择框 */
.orca-settings .orca-select {
    background-color: var(--tokyo-night-bg-primary) !important;
    border: 1px solid var(--tokyo-night-border) !important;
    border-radius: 6px !important;
    color: var(--tokyo-night-text-primary) !important;
}

.orca-settings .orca-select:focus {
    border-color: var(--tokyo-night-focus) !important;
    box-shadow: 0 0 0 2px var(--tokyo-night-focus)33 !important;
}

/* 设置滚动条 */
.orca-settings *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.orca-settings *::-webkit-scrollbar-track {
    background: var(--tokyo-night-bg-secondary);
}

.orca-settings *::-webkit-scrollbar-thumb {
    background-color: var(--tokyo-night-border);
    border-radius: 4px;
    transition: background-color 0.2s ease;
}

.orca-settings *::-webkit-scrollbar-thumb:hover {
    background-color: var(--tokyo-night-hover);
}
`;
}