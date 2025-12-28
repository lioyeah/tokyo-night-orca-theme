import { setupL10N, t } from "./libs/l10n";
import zhCNTranslations from "./translations/zhCN";
import { ThemeVariant, TokyoNightColors } from "./types/colors";
import { getVariantColors, generateOrcaColorMapping, generateCSSCustomPropertiesString } from "./utils/colors";
import { colorPalette } from "./colors/variants";
import { generateBaseBackgroundCSS, generateSidebarCSS, generateSettingsModalCSS } from "./styles/cssGenerator";
import { ThemeVariantManager, createThemeVariantManager } from "./theme/ThemeVariantManager";
import { ThemeSystemIntegrator, createThemeSystemIntegrator, ThemeSystemConfig } from "./components/ThemeSystemIntegrator";

// --- TypeScript 类型定义增强 ---
// 声明全局变量，使得在代码中可以直接访问 window 对象下自定义的属性，
// 而不会引发 TypeScript 在编译阶段的类型检查错误。
declare global {
  interface Window {
    [key: string]: any; // 允许 window 对象拥有任意以字符串为键的属性
  }
}

// --- 全局插件变量 ---
let pluginIdFromOrca: string; // 用于存储从 Orca 应用传递过来的本插件的唯一ID
let themeVariantManager: ThemeVariantManager | null = null; // 主题变体管理器实例
let themeSystemIntegrator: ThemeSystemIntegrator | null = null; // 主题系统集成器实例

// --- 主题常量 ---
const THEME_DISPLAY_NAME = "Tokyo Night"; // 主题在 Orca 设置中显示的名称
const THEME_CSS_FILE = "dist/theme.css";     // 注册到 Orca 的静态 CSS 文件名。
                                        // 注意：此文件的内容不由本 main.ts 动态生成，而是作为插件资产的一部分。
                                        // 如果主题的大部分样式是静态的，应放在此文件中。
                                        // 本 main.ts 主要处理基于用户设置的动态样式。

// --- 设置项的键名 ---
// 定义在插件设置中使用的键，用于让用户通过开关控制主题的某些动态方面。
const SETTING_KEY_ENABLE_BASE_BACKGROUND = "enableTokyoNightBaseBackground"; // 控制是否启用主题的基础背景和相关UI元素样式
const SETTING_KEY_ENABLE_SIDEBAR_COLOR = "enableTokyoNightSidebarColor";   // 控制是否启用自定义的侧边栏颜色
const SETTING_KEY_THEME_VARIANT = "tokyoNightThemeVariant";                // 控制当前使用的主题变体
const SETTING_KEY_AUTO_SWITCH_SYSTEM = "tokyoNightAutoSwitchSystem";       // 控制是否根据系统偏好自动切换主题

// --- 动态样式管理 ---
// 这些对象用于持有动态插入到文档 <head> 中的 <style> 元素的引用。
// 使用对象包装器 ({ el: ... }) 是为了在函数中修改其属性时，能改变原始对象的引用，
// 类似于传递引用（因为对象本身是引用类型）。
const styleHolders = {
    baseBackground: { el: null as HTMLStyleElement | null },  // 用于基础背景和大部分UI元素的样式
    sidebar: { el: null as HTMLStyleElement | null },         // 用于侧边栏特定样式的元素
    settingsModal: { el: null as HTMLStyleElement | null },   // 用于设置模态框特定样式的元素
};
 

// --- 核心CSS字符串定义 ---
// CSS strings are now generated dynamically using the color system
// See src/styles/cssGenerator.ts for CSS generation functions

// 东京之夜侧边栏颜色的CSS定义
const tokyoNightSidebarCssString = `
/* Tokyo Night - 主应用侧边栏颜色 */
/* 统一使用 CSS 变量，不再使用硬编码 HEX */
nav#sidebar {
    background-color: var(--tokyo-night-bg-dark) !important;
    color: var(--tokyo-night-foreground) !important;
    border-right: 1px solid var(--tokyo-night-bg-storm) !important;
    box-shadow: none !important;
}
nav#sidebar .orca-select-button-text {
    color: var(--tokyo-night-red) !important;
    font-weight: 600 !important;
}

/* 强制侧边栏内大部分文本使用主文字色，避免白色 */
nav#sidebar .item,
nav#sidebar a,
nav#sidebar .orca-tags-tag-name,
nav#sidebar .day,
nav#sidebar .title,
nav#sidebar span {
    color: var(--tokyo-night-foreground) !important;
}

nav#sidebar .item:hover,
nav#sidebar a:hover {
    background-color: var(--tokyo-night-terminal-black) !important;
    color: var(--tokyo-night-white) !important;
}
nav#sidebar .item:hover .ti,
nav#sidebar a:hover .ti {
    color: var(--tokyo-night-white) !important;
}

nav#sidebar .item.active,
nav#sidebar a.active {
    background-color: var(--orca-color-primary-5) !important;
    color: var(--tokyo-night-bg-night) !important;
}
nav#sidebar .item.active .ti,
nav#sidebar a.active .ti {
    color: var(--tokyo-night-bg-night) !important;
}

/* 侧边栏搜索框及所有输入框样式优化 */
nav#sidebar .orca-input-input,
nav#sidebar .search-box .orca-input-input {
    background-color: var(--tokyo-night-bg-night) !important;
    border: 1px solid var(--tokyo-night-terminal-black) !important;
    border-radius: var(--orca-radius-md) !important;
    box-shadow: none !important;
}
nav#sidebar .orca-input-input input,
nav#sidebar .search-box .orca-input-input input,
nav#sidebar input.orca-input-actualinput {
    color: var(--tokyo-night-foreground) !important;
    background-color: transparent !important;
}
nav#sidebar .orca-input-input .ti,
nav#sidebar .search-box .orca-input-input .ti {
    color: var(--orca-color-gray-6) !important;
}
nav#sidebar .orca-input-input:focus-within,
nav#sidebar .search-box .orca-input-input:focus-within {
    border-color: var(--orca-color-primary-5) !important;
    box-shadow: 0 0 0 2px rgba(122,162,247,0.35) !important;
}

/* 侧边栏顶部的标签页选项 */
.orca-sidebar-tab-options {
    background-color: transparent !important;
    border: none !important;
}
.orca-sidebar-tab-options .orca-segmented-item {
    color: var(--tokyo-night-comment) !important;
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
}
.orca-sidebar-tab-options .orca-segmented-item .ti {
    color: var(--tokyo-night-comment) !important;
}
.orca-sidebar-tab-options .orca-segmented-item.orca-selected {
    background-color: transparent !important;
    color: var(--orca-color-primary-5) !important;
    font-weight: bold !important;
}
.orca-sidebar-tab-options .orca-segmented-item.orca-selected .ti {
    color: var(--orca-color-primary-5) !important;
}

/* 侧边栏收藏夹项目图标 */
nav#sidebar .orca-fav-item-icon {
    background-color: var(--orca-color-gray-7) !important;
}

/* 侧边栏图标颜色优化 */
nav#sidebar .ti:not([style*="color"]),
nav#sidebar .search-box .ti:not([style*="color"]),
nav#sidebar .toolbar .ti:not([style*="color"]) {
    color: var(--orca-color-text-2) !important;
}
nav#sidebar .search-box .ti.ti-reload,
nav#sidebar .search-box .ti.ti-x {
    color: var(--orca-color-text-2) !important;
}
nav#sidebar .search-box .ti.ti-reload:hover,
nav#sidebar .search-box .ti.ti-x:hover {
    color: var(--tokyo-night-white) !important;
}

/* 悬浮或选中时变亮 */
nav#sidebar .item:hover .ti,
nav#sidebar a:hover .ti,
nav#sidebar .ti:hover {
    color: var(--tokyo-night-white) !important;
}
/* 激活项保持深色对比 */
nav#sidebar .item.active .ti,
nav#sidebar a.active .ti {
    color: var(--tokyo-night-bg-night) !important;
}

/* 日历组件优化 */
/* 头部标题 (年份/月份) */
nav#sidebar .vc-title,
nav#sidebar .title {
    color: var(--tokyo-night-cyan) !important;
    font-weight: 600 !important;
}

/* 年份使用 H5 颜色 (Blue) */
nav#sidebar .choosen-year {
    color: var(--tokyo-night-blue) !important;
    font-weight: 600 !important;
}

/* 月份和"本月"使用正文颜色 */
nav#sidebar .choosen-month,
nav#sidebar .go-now {
    color: var(--tokyo-night-foreground) !important;
    font-weight: 600 !important;
}
/* 头部箭头 */
nav#sidebar .vc-arrow,
nav#sidebar .arrow {
    color: var(--orca-color-text-2) !important;
}
nav#sidebar .vc-arrow:hover,
nav#sidebar .arrow:hover {
    color: var(--tokyo-night-blue) !important;
}

/* 星期头 (Mo Tu We...) */
nav#sidebar .vc-weekday,
nav#sidebar .weekday,
nav#sidebar .weekdays,
nav#sidebar th {
    color: var(--tokyo-night-comment) !important;
    font-weight: normal !important;
}

/* 日期数字 */
nav#sidebar .vc-day,
nav#sidebar .day {
    color: var(--tokyo-night-foreground) !important;
}
/* 非本月日期 */
nav#sidebar .vc-day.is-not-in-month,
nav#sidebar .day.prev-month,
nav#sidebar .day.next-month {
    color: var(--tokyo-night-terminal-black) !important;
    opacity: 0.5 !important;
}
/* 今天 */
nav#sidebar .vc-day.is-today .vc-day-content,
nav#sidebar .day.today {
    color: var(--tokyo-night-cyan) !important;
    font-weight: bold !important;
    background-color: transparent !important;
    border: none !important;
}
/* 选中日期 */
nav#sidebar .vc-day.is-selected .vc-day-content,
nav#sidebar .day.selected,
nav#sidebar .day.value {
    background-color: transparent !important;
    color: var(--tokyo-night-red) !important;
    font-weight: bold !important;
    border: none !important;
}

/* 年份和月份选择网格视图优化 */
/* 统一使用圆角矩形，使其与日历日期的选中风格在视觉上协调 */
nav#sidebar .months .month,
nav#sidebar .years .year {
    color: var(--tokyo-night-foreground) !important;
    border-radius: 6px !important;
    transition: background-color 0.2s, color 0.2s !important;
}

/* 悬浮状态 */
nav#sidebar .months .month:hover,
nav#sidebar .years .year:hover {
    background-color: var(--tokyo-night-terminal-black) !important;
    color: var(--tokyo-night-white) !important;
}

/* 选中状态 (当前年份/月份) */
nav#sidebar .months .month.value,
nav#sidebar .years .year.value,
nav#sidebar .months .month.selected,
nav#sidebar .years .year.selected {
    background-color: transparent !important;
    border: none !important;
    color: var(--tokyo-night-cyan) !important;
    font-weight: bold !important;
}
`;

// 东京之夜设置模态框及内部组件的CSS定义
const tokyoNightSettingsModalCssString = `
/* Tokyo Night - 设置模态框主题化 */
/* div.orca-settings 的主背景、文字、边框颜色已由 :root 变量 (--tokyo-night-bg-storm, --orca-color-text-1, --tokyo-night-terminal-black) 控制 */
div.orca-settings {
    background-color: var(--tokyo-night-bg-storm) !important;
    color: var(--orca-color-text-1) !important;
    border: 1px solid var(--tokyo-night-terminal-black) !important;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3) !important; /* 保留明确的阴影 */
    border-radius: var(--orca-radius-lg) !important;
    overflow: hidden !important;
    padding: 0 !important;
}

.orca-settings > .headbar,
.orca-settings > .header,
.orca-settings > .head {
    background-color: var(--tokyo-night-bg-night) !important;
    color: var(--orca-color-text-1) !important;
    border-bottom: 1px solid var(--tokyo-night-terminal-black) !important;
}

.orca-settings > .sections { /* 左侧导航区 */
    background-color: var(--tokyo-night-bg-dark) !important; /* 使用侧边栏专用深色背景 */
    border-right: 1px solid var(--tokyo-night-terminal-black) !important;
    border-top-left-radius: var(--orca-radius-lg) !important;
    border-bottom-left-radius: var(--orca-radius-lg) !important;
    overflow: hidden !important;
    padding-top: 0 !important;
    margin: 0 !important;
}

.orca-settings > .sections .headbar,
.orca-settings > .sections .header,
.orca-settings > .sections .head,
.orca-settings > .sections .title {
    background-color: var(--tokyo-night-bg-dark) !important; /* 与 sections 背景一致 */
    border-bottom: 1px solid var(--tokyo-night-terminal-black) !important;
}

/* 强制头部内的所有子元素背景透明，防止遮挡 */
.orca-settings > .sections .headbar *,
.orca-settings > .sections .header *,
.orca-settings > .sections .head *,
.orca-settings > .sections .title * {
    background-color: transparent !important;
}

.orca-settings > .sections .item,
.orca-settings > .sections .plugin-item { /* 导航项 */
    color: var(--orca-color-text-1) !important;
    padding: var(--orca-spacing-sm) var(--orca-spacing-md) !important;
    border-radius: var(--orca-radius-md) !important;
    transition: background-color 0.2s ease, color 0.2s ease; /* 保留过渡效果 */
}
.orca-settings > .sections .item .ti, /* 导航项内图标 */
.orca-settings > .sections .plugin-item .ti {
    color: var(--orca-color-text-1) !important; /* 默认与文字同色 */
}

.orca-settings > .sections .item:hover,
.orca-settings > .sections .plugin-item:hover { /* 导航项悬浮 */
    background-color: var(--tokyo-night-terminal-black) !important;
    color: var(--tokyo-night-white) !important; /* 使用更亮的白色 */
}
.orca-settings > .sections .item:hover .ti,
.orca-settings > .sections .plugin-item:hover .ti {
    color: var(--tokyo-night-white) !important;
}

.orca-settings > .sections .item.selected,
.orca-settings > .sections .plugin-item.selected { /* 导航项选中 */
    background-color: var(--tokyo-night-terminal-black) !important; /* 与悬浮状态一致，或可选择其他强调色 */
    color: var(--tokyo-night-white) !important;
}
.orca-settings > .sections .item.selected .ti,
.orca-settings > .sections .plugin-item.selected .ti {
    color: var(--tokyo-night-white) !important;
}

.orca-settings > .views { /* 右侧内容视图区 */
    /* 背景和文字颜色已由 :root 中的 --tokyo-night-bg-night 和 --orca-color-text-1 控制 */
    background-color: var(--tokyo-night-bg-night) !important; /* 使用主内容背景 (Night) 而非 Storm */
    color: var(--orca-color-text-1) !important;
    border-top-right-radius: var(--orca-radius-lg) !important;
    border-bottom-right-radius: var(--orca-radius-lg) !important;
}

.orca-settings > .views h1,
.orca-settings > .views h2,
.orca-settings > .views h3,
.orca-settings > .views .settings-group-title { /* 视图区标题 */
    color: var(--tokyo-night-white) !important; /* 使用更亮的白色 */
    border-bottom: 1px solid var(--tokyo-night-terminal-black) !important;
    padding-bottom: 0.5em !important;
    margin-bottom: 1em !important;
}
.orca-settings > .views h2 { /* 确保 h2 背景与视图背景一致 */
    background-color: var(--tokyo-night-bg-night) !important;
}

.orca-settings > .views .setting-item-label { /* 设置项标签 */
    color: var(--tokyo-night-white) !important;
}
.orca-settings > .views div.desc { /* 设置项描述 */
    color: var(--tokyo-night-comment) !important; /* 使用注释颜色 */
    font-size: var(--orca-fontsize-xs) !important;
}

/* 设置界面中的普通按钮 (非开关) */
.orca-settings > .views button:not(.orca-switch),
.orca-settings button:not(.orca-switch) {
    background-color: var(--tokyo-night-terminal-black) !important; /* 使用较深的背景 */
    color: var(--tokyo-night-white) !important;
    border: 1px solid var(--tokyo-night-comment) !important; /* 使用柔和的注释色作为边框 */
    padding: 0.5em 1em !important;
    border-radius: 4px !important;
}
.orca-settings > .views button:not(.orca-switch):hover,
.orca-settings button:not(.orca-switch):hover {
    background-color: var(--tokyo-night-comment) !important; /* 悬浮时使用注释色背景 */
}
.orca-settings > .views button:not(.orca-switch) .ti, /* 按钮内图标 */
.orca-settings button:not(.orca-switch) .ti {
    color: var(--tokyo-night-white) !important; /* 与按钮文字颜色一致 */
}

/* 快捷方式设置中的特定按钮 */
.orca-settings > .views .shortcut-input button.orca-button.plain {
    padding: var(--orca-spacing-xs) var(--orca-spacing-sm) !important; /* Orca默认的更小padding */
    color: var(--tokyo-night-white) !important; /* 文字颜色已通过全局 .orca-button.plain 设置 */
    background-color: var(--tokyo-night-terminal-black) !important; /* 给予一个明确的背景 */
    border: 1px solid var(--tokyo-night-comment) !important; /* 协调边框 */
}
.orca-settings > .views .shortcut-input button.orca-button.plain:hover {
    background-color: var(--tokyo-night-comment) !important;
}
.orca-settings > .views .shortcut-input button.orca-button.plain .ti {
    color: var(--tokyo-night-white) !important; /* 图标颜色已通过全局 .ti 设置 */
}

/* 输入框包裹层 (.orca-input-input) */
/* 其背景、文字、边框颜色已由 :root 变量 (--tokyo-night-bg-night, --orca-color-text-1, --tokyo-night-terminal-black) 控制 */
.orca-settings > .views .orca-input-input,
.orca-settings .orca-input-input {
    background-color: var(--tokyo-night-bg-night) !important;
    color: var(--orca-color-text-1) !important;
    border: 1px solid var(--tokyo-night-terminal-black) !important;
    padding: var(--orca-spacing-sm) var(--orca-spacing-md) !important; /* 遵循Orca的内边距 */
    border-radius: var(--orca-radius-sm) !important; /* 遵循Orca的圆角 */
}
.orca-settings > .views .orca-input-input:focus-within,
.orca-settings .orca-input-input:focus-within {
    border-color: var(--orca-color-primary-5) !important;
    box-shadow: 0 0 0 2px rgba(122,162,247,0.35) !important;
    outline: none !important;
}

/* 实际的 <input> 元素 (位于 .orca-input-input 内部) */
.orca-settings > .views .orca-input-input .orca-input-actualinput,
.orca-settings .orca-input-input .orca-input-actualinput {
    background-color: transparent !important; /* 使其背景透明，从而显示父级 .orca-input-input 的背景色 */
    color: var(--orca-color-text-1) !important; /* 文字颜色继承或与父级一致 */
}
.orca-settings > .views .orca-input-input .orca-input-actualinput:focus,
.orca-settings .orca-input-input .orca-input-actualinput:focus {
    outline: none !important;
}

/* 颜色选择器 input[type="color"] 的特定内边距调整 */
.orca-settings > .views .orca-input-input[type="color"],
.orca-settings .orca-input-input[type="color"] {
    padding: 0 var(--orca-spacing-xs) !important; /* 保持Orca为颜色选择器设定的紧凑内边距 */
    background-color: var(--tokyo-night-bg-night) !important; /* 确保它也有背景，以防父级背景不适用 */
}

/* 未被 .orca-input-input 包裹的通用输入控件的备用样式 (如独立的 <select>) */
.orca-settings > .views input[type="text"],
.orca-settings > .views input[type="password"],
.orca-settings > .views textarea,
.orca-settings > .views select {
    background-color: var(--tokyo-night-bg-night) !important;
    color: var(--orca-color-text-1) !important;
    border: 1px solid var(--tokyo-night-terminal-black) !important;
    padding: 0.5em !important; /* 这些控件的内边距 */
    border-radius: 4px !important;
}

/* 开关组件 - 仅应用Tokyo Night配色，保留Orca默认形状 */
.orca-settings .orca-switch { /* 开关轨道 */
    background-color: var(--tokyo-night-terminal-black) !important; /* 关闭时的轨道背景色 */
    transition: background-color 0.2s ease !important; /* 保留过渡 */
}

.orca-settings .orca-switch .orca-switch-toggle { /* 开关滑块 */
    background-color: var(--orca-color-text-1) !important; /* 关闭时滑块颜色 (使用主文字色，较柔和) */
    transition: background-color 0.2s ease, transform 0.1s ease-in-out !important; /* 保留过渡 */
}

.orca-settings .orca-switch.orca-switch-on { /* 开启状态的轨道 */
    background-color: var(--orca-color-primary-5) !important; /* 主题蓝 */
}

.orca-settings .orca-switch.orca-switch-on .orca-switch-toggle { /* 开启状态的滑块 */
    background-color: var(--tokyo-night-white) !important; /* 使用更亮的白色 */
}

/* 设置界面中的分段控件 (Tabs) */
.orca-settings > .views .orca-segmented {
    background-color: var(--tokyo-night-bg-night) !important; /* 整体背景 */
    border-radius: var(--orca-radius-md) !important;
    padding: 3px !important; /* 内部留白 */
}

.orca-settings > .views .orca-segmented .orca-segmented-item { /* 单个标签项 */
    color: var(--orca-color-text-1) !important; /* 默认文字颜色 */
    /* 其他尺寸和圆角属性尽量依赖Orca的默认变量或样式 */
    height: var(--orca-height-segmented, 22px) !important;
    line-height: var(--orca-height-segmented, 22px) !important;
    border-radius: var(--orca-radius-sm) !important;
    transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out !important;
    background-color: transparent !important; /* 未选中时透明 */
}
.orca-settings > .views .orca-segmented .orca-segmented-item .ti { /* 标签项内图标 */
    color: var(--orca-color-text-1) !important;
}

.orca-settings > .views .orca-segmented .orca-segmented-item:hover { /* 标签项悬浮 */
    background-color: var(--tokyo-night-terminal-black) !important;
    color: var(--tokyo-night-white) !important;
}
.orca-settings > .views .orca-segmented .orca-segmented-item:hover .ti {
    color: var(--tokyo-night-white) !important;
}

.orca-settings > .views .orca-segmented .orca-segmented-item.orca-selected { /* 选中的标签项 */
    background-color: var(--orca-color-primary-5) !important; /* 主题蓝背景 */
    color: var(--tokyo-night-bg-night) !important;          /* 深色文字形成对比 */
    box-shadow: var(--orca-shadow-segmented, 0 1px 3px rgba(0,0,0,0.1)) !important; /* 保留Orca阴影 */
}
.orca-settings > .views .orca-segmented .orca-segmented-item.orca-selected .ti {
    color: var(--tokyo-night-bg-night) !important;
}

/* 设置界面中的表格头部 */
/* 其背景、文字、边框颜色已由 :root 变量控制 */
.orca-settings > .views .orca-table-header-cell,
.orca-settings .orca-table-header-cell,
.orca-settings > .views .orca-settings-shortcuts-header,
.orca-settings .orca-settings-shortcuts-header {
    background-color: var(--tokyo-night-bg-night) !important;
    color: var(--tokyo-night-white) !important;
    border-bottom: 1px solid var(--tokyo-night-terminal-black) !important;
}

/* 设置界面中表格的列宽调整器 (拖动条) */
/* 其颜色已由 :root 中的 --orca-color-separator 控制 */
`;

 

// --- 辅助函数：应用/移除样式 ---
// 参数:
//   cssString: 要应用的CSS规则字符串。
//   enabled: 布尔值，为true则应用样式，为false则移除样式。
//   styleHolder: 一个包含 { el: HTMLStyleElement | null } 的对象，用于持有和更新<style>元素的引用。
//   styleIdSuffix: 用于构成<style>元素ID的后缀，确保ID唯一性。
function applyStyle(cssString: string, enabled: boolean, styleHolder: {el: HTMLStyleElement | null}, styleIdSuffix: string): void {
    const fullStyleId = `${pluginIdFromOrca}-style-${styleIdSuffix}`; // 拼接完整的样式ID

    if (enabled) { // 如果要启用样式
        // 检查styleHolder中是否已有关联的<style>元素，或者该元素是否还在文档头部
        if (!styleHolder.el || !document.head || !document.head.contains(styleHolder.el)) {
            // 如果没有或已丢失，先尝试通过ID移除可能残留的旧<style>元素
            const oldElById = document.getElementById(fullStyleId);
            if (oldElById) {
                try {
                    oldElById.remove();
                } catch (e) { 
                    // 移除旧样式元素失败
                }
            }

            // 创建新的<style>元素
            try {
                if (document && document.head) { // 确保 document 和 document.head 存在
                    styleHolder.el = document.createElement("style");
                    styleHolder.el.id = fullStyleId;
                    styleHolder.el.textContent = cssString;
                    document.head.appendChild(styleHolder.el);
                    // console.log(`[${pluginIdFromOrca}] 应用样式: ${fullStyleId}`);
                } else {
                    // console.error(`[${pluginIdFromOrca}] document 或 document.head 不可用，无法应用样式 ${fullStyleId}`);
                    styleHolder.el = null;
                }
            } catch (e) {
                // console.error(`[${pluginIdFromOrca}] 创建并应用样式 ${fullStyleId} 失败:`, e);
                styleHolder.el = null; // 创建失败则重置
            }
        } else if (styleHolder.el.textContent !== cssString) { // 如果<style>元素存在且内容不同，则更新内容
            try {
                styleHolder.el.textContent = cssString;
                // console.log(`[${pluginIdFromOrca}] 更新样式: ${fullStyleId}`);
            } catch (e) {
                // console.error(`[${pluginIdFromOrca}] 更新样式 ${fullStyleId} 内容失败:`, e);
            }
        }
    } else { // 如果要禁用样式
        if (styleHolder.el && document.head && document.head.contains(styleHolder.el)) { // 如果通过引用能找到元素且在DOM中
            try {
                styleHolder.el.remove();
                // console.log(`[${pluginIdFromOrca}] 移除样式 (通过引用): ${fullStyleId}`);
            } catch (e) { /* console.warn(`移除样式元素 (引用, ID: ${fullStyleId}) 失败:`, e); */ }
        } else { // 否则，尝试通过ID查找并移除，作为备用方案
            const elById = document.getElementById(fullStyleId);
            if (elById) {
                try {
                    elById.remove();
                    // console.log(`[${pluginIdFromOrca}] 移除样式 (通过ID): ${fullStyleId}`);
                } catch (e) { /* console.warn(`移除样式元素 (ID: ${fullStyleId}) 失败:`, e); */ }
            }
        }
        styleHolder.el = null; // 无论如何，将引用置空
    }
}


// --- 默认设置值 ---
// 定义插件各项设置的默认状态。
const settingsSchemaDefaults = {
    [SETTING_KEY_ENABLE_BASE_BACKGROUND]: true, // 默认启用基础背景
    [SETTING_KEY_ENABLE_SIDEBAR_COLOR]: true,   // 默认启用侧边栏颜色
    [SETTING_KEY_THEME_VARIANT]: 'night' as ThemeVariant, // 默认使用 Night 变体
    [SETTING_KEY_AUTO_SWITCH_SYSTEM]: false,    // 默认不自动切换
};

// --- 更新所有动态样式 ---
// 根据当前插件的设置，统一更新所有受控的动态<style>标签。
async function updateAllDynamicStyles(calledBy?: string) { // calledBy参数用于调试，追踪调用来源
    // console.log(`[${pluginIdFromOrca}] 进入 updateAllDynamicStyles. 调用来源: ${calledBy || '未知'}`);

    // 优先使用 ThemeSystemIntegrator 进行统一管理
    if (themeSystemIntegrator) {
        // 确保orca对象和相关插件状态存在
        const currentPluginState = orca?.state?.plugins?.[pluginIdFromOrca];
        if (!currentPluginState) {
            console.warn(`[${pluginIdFromOrca}] 插件状态对象不可用，无法更新样式。`);
            return;
        }
        const pluginSettings = currentPluginState.settings || {}; // 获取当前插件的设置，如果为空则使用空对象

        // 辅助函数，用于安全获取设置值
        const getSetting = (key: string, defaultValue: any): any => {
            const value = pluginSettings[key];
            return value !== undefined ? value : defaultValue;
        };

        // 获取各项设置的当前值
        const themeVariant = getSetting(SETTING_KEY_THEME_VARIANT, settingsSchemaDefaults[SETTING_KEY_THEME_VARIANT]) as ThemeVariant;
        const autoSwitchSystem = getSetting(SETTING_KEY_AUTO_SWITCH_SYSTEM, settingsSchemaDefaults[SETTING_KEY_AUTO_SWITCH_SYSTEM]);

        try {
            // 使用 ThemeSystemIntegrator 进行统一的主题管理
            if (themeSystemIntegrator.getCurrentVariant() !== themeVariant) {
                await themeSystemIntegrator.switchVariant(themeVariant);
            }

            // 更新自动切换设置
            themeSystemIntegrator.setAutoSwitchEnabled(autoSwitchSystem);

            // 验证系统一致性
            const validation = themeSystemIntegrator.validateSystemConsistency();
            if (validation.errors.length > 0) {
                console.warn(`[${pluginIdFromOrca}] 系统一致性验证发现问题:`, validation.errors);
            }

            // 获取系统健康状态
            const healthStatus = themeSystemIntegrator.getHealthStatus();
            if (!healthStatus.healthy) {
                console.warn(`[${pluginIdFromOrca}] 系统健康检查发现问题:`, healthStatus.issues);
                if (healthStatus.recommendations.length > 0) {
                    console.info(`[${pluginIdFromOrca}] 建议:`, healthStatus.recommendations);
                }
            }

            console.log(`[${pluginIdFromOrca}] 主题系统已更新。变体: ${themeSystemIntegrator.getCurrentVariant()}, 自动切换: ${autoSwitchSystem}`);
        } catch (error) {
            console.error(`[${pluginIdFromOrca}] 使用 ThemeSystemIntegrator 更新主题时出错:`, error);
            
            // 回退到原始的 ThemeVariantManager 实现
            if (themeVariantManager) {
                console.log(`[${pluginIdFromOrca}] 回退到 ThemeVariantManager 实现`);
                await updateAllDynamicStylesLegacy(calledBy);
            }
        }
        return;
    }

    // 回退到原始实现
    if (themeVariantManager) {
        await updateAllDynamicStylesLegacy(calledBy);
    } else {
        console.warn(`[${pluginIdFromOrca}] 主题管理器未初始化，无法更新样式。`);
    }
}

// 原始的样式更新实现（作为回退方案）
async function updateAllDynamicStylesLegacy(calledBy?: string) {
    if (!themeVariantManager) {
        console.warn(`[${pluginIdFromOrca}] ThemeVariantManager 未初始化，无法更新样式。`);
        return;
    }

    // 确保orca对象和相关插件状态存在
    const currentPluginState = orca?.state?.plugins?.[pluginIdFromOrca];
    if (!currentPluginState) {
        console.warn(`[${pluginIdFromOrca}] 插件状态对象不可用，无法更新样式。`);
        return;
    }
    const pluginSettings = currentPluginState.settings || {}; // 获取当前插件的设置，如果为空则使用空对象

    // 辅助函数，用于安全获取设置值
    const getSetting = (key: string, defaultValue: any): any => {
        const value = pluginSettings[key];
        return value !== undefined ? value : defaultValue;
    };

    // 获取各项设置的当前值
    const enableBaseBg = getSetting(SETTING_KEY_ENABLE_BASE_BACKGROUND, settingsSchemaDefaults[SETTING_KEY_ENABLE_BASE_BACKGROUND]);
    const enableSidebarColor = getSetting(SETTING_KEY_ENABLE_SIDEBAR_COLOR, settingsSchemaDefaults[SETTING_KEY_ENABLE_SIDEBAR_COLOR]);
    const themeVariant = getSetting(SETTING_KEY_THEME_VARIANT, settingsSchemaDefaults[SETTING_KEY_THEME_VARIANT]) as ThemeVariant;
    const autoSwitchSystem = getSetting(SETTING_KEY_AUTO_SWITCH_SYSTEM, settingsSchemaDefaults[SETTING_KEY_AUTO_SWITCH_SYSTEM]);

    // 更新主题变体管理器设置
    try {
        // 检查是否需要切换变体
        if (themeVariantManager.currentVariant !== themeVariant) {
            await themeVariantManager.switchVariant(themeVariant);
        }

        // 更新自动切换设置
        themeVariantManager.setAutoSwitchEnabled(autoSwitchSystem);

        // 应用当前变体（这会处理样式的启用/禁用，包括视觉层次）
        if (enableBaseBg || enableSidebarColor) {
            themeVariantManager.applyVariant(themeVariantManager.currentVariant);
        }

        // 验证可访问性（可选，用于调试）
        try {
            const accessibilityResults = themeVariantManager.validateAccessibility();
            if (!accessibilityResults.meetsWCAG) {
                console.warn(`[${pluginIdFromOrca}] 可访问性警告:`, accessibilityResults);
            }
        } catch (accessibilityError) {
            // 可访问性验证失败不应阻止主题应用
            console.warn(`[${pluginIdFromOrca}] 可访问性验证失败:`, accessibilityError);
        }

    } catch (error) {
        console.error(`[${pluginIdFromOrca}] 更新主题变体时出错:`, error);
    }

    // 应用或移除各个部分的样式（保持向后兼容的方式）
    // 基础背景和设置模态框的样式通常一起控制，因为它们可能共享基础颜色或主题开关
    applyStyle(generateBaseBackgroundCSS(themeVariantManager.currentVariant, pluginIdFromOrca), enableBaseBg, styleHolders.baseBackground, "base-bg");
    applyStyle(generateSettingsModalCSS(themeVariantManager.currentVariant), enableBaseBg, styleHolders.settingsModal, "settings-modal"); // 设置模态框样式也受基础背景开关控制
    applyStyle(generateSidebarCSS(themeVariantManager.currentVariant), enableSidebarColor, styleHolders.sidebar, "sidebar-color");

    console.log(`[${pluginIdFromOrca}] 样式已更新（传统模式）。变体: ${themeVariantManager.currentVariant}, 背景/模态框启用: ${enableBaseBg}, 侧边栏颜色启用: ${enableSidebarColor}, 自动切换: ${autoSwitchSystem}`);
}

// --- Orca Notes 插件生命周期函数 ---
// 这些变量用于持有事件监听器或订阅的引用，以便在插件卸载时正确清理。
let valtioUnsubscribeSettings: (() => void) | null = null; // Valtio状态订阅的取消函数
let themeChangedHandlerRef: (() => void) | null = null;   // Orca主题变更事件的处理函数引用


// `load` 函数：当插件被加载或启用时由 Orca 调用。
export async function load(_name: string) { // _name 参数是 Orca 传递的插件ID
    pluginIdFromOrca = _name; // 保存插件ID
    // console.log(`插件 "${pluginIdFromOrca}" 正在加载... (显示名称: "${THEME_DISPLAY_NAME}")`);

    // 初始化 ThemeVariantManager
    themeVariantManager = createThemeVariantManager(pluginIdFromOrca);
    // console.log(`[${pluginIdFromOrca}] ThemeVariantManager 已初始化`);

    // 初始化 ThemeSystemIntegrator - 统一管理所有主题组件
    const themeSystemConfig: ThemeSystemConfig = {
        pluginId: pluginIdFromOrca,
        debugLogging: false, // 可以根据需要启用调试
        autoSwitchEnabled: false, // 将根据用户设置动态更新
        initialVariant: 'night'
    };
    
    themeSystemIntegrator = createThemeSystemIntegrator(themeSystemConfig);
    console.log(`[${pluginIdFromOrca}] ThemeSystemIntegrator 已初始化，完整主题系统已就绪`);

    // 定义国际化翻译资源
    const translationsForL10N = {
        "en": { // 英文翻译
            [SETTING_KEY_ENABLE_BASE_BACKGROUND]: "Enable Tokyo Night Base Background",
            "Sets the main application background to the classic Tokyo Night dark color.": "Sets the main application background to the classic Tokyo Night dark color.",
            [SETTING_KEY_ENABLE_SIDEBAR_COLOR]: "Enable Tokyo Night Sidebar Color",
            "Sets the sidebar background to a custom Tokyo Night color (#16161F).": "Sets the sidebar background to a custom Tokyo Night color (#16161F).",
            [SETTING_KEY_THEME_VARIANT]: "Tokyo Night Theme Variant",
            "Choose between Night (darkest), Storm (medium dark), or Light variant.": "Choose between Night (darkest), Storm (medium dark), or Light variant.",
            [SETTING_KEY_AUTO_SWITCH_SYSTEM]: "Auto-switch with System Theme",
            "Automatically switch between light and dark variants based on system preferences.": "Automatically switch between light and dark variants based on system preferences."
        },
        "zh-CN": zhCNTranslations // 中文翻译 (从 ./translations/zhCN.ts 导入)
    };

    // 初始化国际化设置，如果Orca状态中没有语言设置，则默认为英文
    setupL10N(orca?.state?.locale || "en", translationsForL10N);
    if (!orca?.state?.locale) {
        // console.warn(`[${pluginIdFromOrca}] orca.state.locale 在加载时不可用，l10n 使用英文初始化。`);
    }

    // 注册插件的设置项到 Orca 系统
    try {
        if (orca?.plugins?.setSettingsSchema) { // 检查 Orca API 是否可用
            await orca.plugins.setSettingsSchema(pluginIdFromOrca, {
                [SETTING_KEY_ENABLE_BASE_BACKGROUND]: {
                    label: t(SETTING_KEY_ENABLE_BASE_BACKGROUND), // 使用 t 函数获取国际化标签
                    description: t("Sets the main application background to the classic Tokyo Night dark color."),
                    type: "boolean", // 设置项类型为布尔值 (开关)
                    defaultValue: settingsSchemaDefaults[SETTING_KEY_ENABLE_BASE_BACKGROUND] // 默认值
                },
                [SETTING_KEY_ENABLE_SIDEBAR_COLOR]: {
                    label: t(SETTING_KEY_ENABLE_SIDEBAR_COLOR),
                    description: t("Sets the sidebar background to a custom Tokyo Night color (#16161F)."),
                    type: "boolean",
                    defaultValue: settingsSchemaDefaults[SETTING_KEY_ENABLE_SIDEBAR_COLOR]
                },
                [SETTING_KEY_THEME_VARIANT]: {
                    label: t(SETTING_KEY_THEME_VARIANT),
                    description: t("Choose between Night (darkest), Storm (medium dark), or Light variant."),
                    type: "singleChoice",
                    choices: [
                        { value: "night", label: "Tokyo Night (Darkest)" },
                        { value: "storm", label: "Tokyo Night Storm (Medium Dark)" },
                        { value: "light", label: "Tokyo Night Light" }
                    ],
                    defaultValue: settingsSchemaDefaults[SETTING_KEY_THEME_VARIANT]
                },
                [SETTING_KEY_AUTO_SWITCH_SYSTEM]: {
                    label: t(SETTING_KEY_AUTO_SWITCH_SYSTEM),
                    description: t("Automatically switch between light and dark variants based on system preferences."),
                    type: "boolean",
                    defaultValue: settingsSchemaDefaults[SETTING_KEY_AUTO_SWITCH_SYSTEM]
                }
            });
            // console.log(`[${pluginIdFromOrca}] 设置 schema 注册成功。`);
        } else {
            // console.error(`[${pluginIdFromOrca}] Orca plugins API (setSettingsSchema) 不可用。`);
        }
    } catch (error) {
        // console.error(`[${pluginIdFromOrca}] 注册设置 schema 失败。`, error);
    }

    // 注册主题到 Orca 系统
    try {
        if (orca?.themes?.register) { // 检查 Orca API 是否可用
            // Register the main theme (backward compatibility)
            orca.themes.register(pluginIdFromOrca, THEME_DISPLAY_NAME, THEME_CSS_FILE);
            // console.log(`[${pluginIdFromOrca}] 主题 "${THEME_DISPLAY_NAME}" 已注册，CSS 文件: "${THEME_CSS_FILE}".`);
            
            // Register all variants using ThemeVariantManager
            await themeVariantManager.registerAllVariants();
        } else {
            // console.error(`[${pluginIdFromOrca}] Orca themes API (register) 不可用。`);
        }
    } catch (error) {
        // console.error(`[${pluginIdFromOrca}] 注册主题失败。`, error);
    }

    // 使用 Valtio 订阅插件设置对象的变化，以便实时更新样式
    const pluginStateForSubscription = orca?.state?.plugins?.[pluginIdFromOrca];
    if (typeof window.Valtio?.subscribe === 'function' && pluginStateForSubscription?.settings) {
        valtioUnsubscribeSettings = window.Valtio.subscribe(
            pluginStateForSubscription.settings, // 订阅当前插件的 settings 对象
            () => { // 当 settings 变化时执行的回调
                // console.log(`[${pluginIdFromOrca}] Valtio 检测到 settings 对象更改。`);
                updateAllDynamicStyles("Valtio_PluginSettings_Subscription"); // 更新所有动态样式
            }
        );
        // console.log(`[${pluginIdFromOrca}] 已通过 Valtio 订阅 settings 对象。`);
    } else {
        // console.warn(`[${pluginIdFromOrca}] Valtio subscribe 不可用或插件 settings 对象不存在或不是对象。`);
    }

    // 处理主题激活/停用状态的逻辑
    const ORCA_APP_THEME_SETTING_KEY = 11; // 假设这是 Orca 存储当前选用主题的设置键 (需要确认此键是否正确)
    const themeIsActiveKeyOnWindow = `${pluginIdFromOrca}_isActive`; // 用于在 window 对象上标记本主题是否激活
    window[themeIsActiveKeyOnWindow] = false; // 初始化为未激活

    themeChangedHandlerRef = (themeName?: string) => { // 定义处理 Orca 主题变化的函数
        const currentOrcaState = orca?.state;
        if (!currentOrcaState) {
            // console.warn(`[${pluginIdFromOrca}] orca.state 不可用（在 themeChangedHandlerRef 中），无法检查主题更改。`);
            return;
        }

        const currentSettings = currentOrcaState.settings;
        if (typeof currentSettings === 'undefined' || currentSettings === null) {
            // console.warn(`[${pluginIdFromOrca}] orca.state.settings 对象不可用（在 themeChangedHandlerRef 中），无法检查主题更改。`);
            return;
        }

        // 优先使用广播提供的主题名称，其次回退到设置键
        let isActiveNow = false;
        if (typeof themeName === 'string' && themeName.length > 0) {
            isActiveNow = (themeName === THEME_DISPLAY_NAME);
        } else {
            const currentOrcaThemeSetting = currentSettings[ORCA_APP_THEME_SETTING_KEY];
            if (typeof currentOrcaThemeSetting === 'string') {
                isActiveNow = (currentOrcaThemeSetting === THEME_DISPLAY_NAME);
            } else {
                isActiveNow = false;
            }
        }
        const previouslyActive = window[themeIsActiveKeyOnWindow] as boolean;

        if (isActiveNow && !previouslyActive) {
            // console.log(`[${pluginIdFromOrca}] 主题 "${THEME_DISPLAY_NAME}" 已激活。正在应用样式。`);
            enableThemeFeatures();
        } else if (!isActiveNow && previouslyActive) {
            // console.log(`[${pluginIdFromOrca}] 主题 "${THEME_DISPLAY_NAME}" 已停用。正在移除样式。`);
            disableThemeFeatures();
        }
        window[themeIsActiveKeyOnWindow] = isActiveNow;
    };

    // 注册 Orca 的全局主题变更事件监听器
    if (orca?.broadcasts?.registerHandler) {
        const globalThemeChangeEvent = "core.themeChanged"; // Orca 主题选择变化时发出的广播事件名
        orca.broadcasts.registerHandler(globalThemeChangeEvent, themeChangedHandlerRef);
        // console.log(`[${pluginIdFromOrca}] 已注册全局事件处理器: ${globalThemeChangeEvent}.`);
    } else {
        // console.warn(`[${pluginIdFromOrca}] Orca broadcasts API 不可用，无法监听全局主题变更。`);
    }

    // 首次加载时，立即执行一次主题状态检查和样式应用
    if (themeChangedHandlerRef) {
        themeChangedHandlerRef();
    }
}

// `unload` 函数：当插件被禁用或卸载时由 Orca 调用。
export async function unload() {
    if (!pluginIdFromOrca) { // 如果插件ID未设置 (可能 load 失败)
        // console.warn("卸载函数被调用，但 pluginIdFromOrca 未设置。");
        return;
    }
    // console.log(`插件 "${pluginIdFromOrca}" 正在卸载...`);
    
    // 清理 ThemeSystemIntegrator
    if (themeSystemIntegrator) {
        themeSystemIntegrator.cleanup();
        themeSystemIntegrator = null;
        console.log(`[${pluginIdFromOrca}] ThemeSystemIntegrator 已清理`);
    }
    
    // 清理 ThemeVariantManager
    if (themeVariantManager) {
        themeVariantManager.cleanup();
        await themeVariantManager.unregisterAllVariants();
        themeVariantManager = null;
        // console.log(`[${pluginIdFromOrca}] ThemeVariantManager 已清理`);
    }
    
    disableThemeFeatures(); // 移除所有动态样式

    // 取消 Valtio 订阅
    if (valtioUnsubscribeSettings) {
        valtioUnsubscribeSettings();
        valtioUnsubscribeSettings = null; // 清理引用
        // console.log(`[${pluginIdFromOrca}] 已取消 Valtio settings 的订阅。`);
    }

    // 取消 Orca 全局主题变更事件的监听
    if (orca?.broadcasts?.unregisterHandler && themeChangedHandlerRef) {
        const globalThemeChangeEvent = "core.themeChanged";
        orca.broadcasts.unregisterHandler(globalThemeChangeEvent, themeChangedHandlerRef);
        themeChangedHandlerRef = null; // 清理引用
    }

    // 清理在 window 对象上设置的标记
    delete window[`${pluginIdFromOrca}_isActive`];

    // 从 Orca 系统注销本主题
    try {
        if (orca?.themes?.unregister) { // 检查 Orca API 是否可用
            orca.themes.unregister(THEME_DISPLAY_NAME);
            // console.log(`[${pluginIdFromOrca}] 主题 "${THEME_DISPLAY_NAME}" 注销成功。`);
        } else {
            // console.error(`[${pluginIdFromOrca}] Orca themes API (unregister) 不可用。`);
        }
    } catch (e) {
        // console.warn(`[${pluginIdFromOrca}] 注销主题 "${THEME_DISPLAY_NAME}" 时出错。`, e);
    }
    // console.log(`插件 "${pluginIdFromOrca}" 卸载成功。`);
}

// 启用主题特性 (主要是应用所有动态样式)
async function enableThemeFeatures() {
    // console.log(`[${pluginIdFromOrca}] 正在启用主题特性...`);
    await updateAllDynamicStyles("enableThemeFeatures");
}

// 禁用主题特性 (主要是移除所有动态样式)
function disableThemeFeatures() {
    // console.log(`[${pluginIdFromOrca}] 正在禁用主题特性 (清理动态样式)...`);
    
    // 优先使用 ThemeSystemIntegrator 进行清理
    if (themeSystemIntegrator) {
        themeSystemIntegrator.cleanup();
        return;
    }
    
    // Use ThemeVariantManager cleanup if available
    if (themeVariantManager) {
        themeVariantManager.cleanup();
    }
    
    // Fallback to manual cleanup for backward compatibility
    applyStyle("", false, styleHolders.baseBackground, "base-bg");
    applyStyle("", false, styleHolders.sidebar, "sidebar-color");
    applyStyle("", false, styleHolders.settingsModal, "settings-modal");
    // console.log(`[${pluginIdFromOrca}] 所有动态样式已清理。`);
}
