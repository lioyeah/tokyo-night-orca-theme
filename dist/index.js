var ut = Object.defineProperty;
var gt = (o, t, e) => t in o ? ut(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var a = (o, t, e) => gt(o, typeof t != "symbol" ? t + "" : t, e);
let q = "en", X = {};
function pt(o, t) {
  q = o, X = t;
}
function w(o, t, e) {
  var i;
  return ((i = X[e ?? q]) == null ? void 0 : i[o]) ?? o;
}
const yt = {
  // "启用核心背景"设置项的标签翻译
  enableTokyoNightBaseBackground: "启用 Tokyo Night 核心背景",
  // "启用核心背景"设置项的描述翻译
  "Sets the main application background to the classic Tokyo Night dark color.": "将应用主背景设置为经典的 Tokyo Night 暗色。",
  // 侧边栏颜色设置项的标签翻译
  enableTokyoNightSidebarColor: "启用 Tokyo Night 侧边栏颜色",
  // 侧边栏颜色设置项的描述翻译
  "Sets the sidebar background to a custom Tokyo Night color (#16161F).": "将侧边栏背景设置为自定义的 Tokyo Night 颜色 (#16161F)。",
  // 主题变体设置项的标签翻译
  tokyoNightThemeVariant: "Tokyo Night 主题变体",
  // 主题变体设置项的描述翻译
  "Choose between Night (darkest), Storm (medium dark), or Light variant.": "选择 Night（最暗）、Storm（中等暗度）或 Light 变体。",
  // 自动切换设置项的标签翻译
  tokyoNightAutoSwitchSystem: "跟随系统主题自动切换",
  // 自动切换设置项的描述翻译
  "Automatically switch between light and dark variants based on system preferences.": "根据系统偏好自动在明暗变体之间切换。"
}, J = {
  background: {
    primary: "#1a1b26",
    // Editor background (Night)
    secondary: "#16161e",
    // Sidebar background (darker)
    tertiary: "#24283b"
    // Modal background
  },
  text: {
    primary: "#a9b1d6",
    // Main text (Editor Foreground)
    secondary: "#9aa5ce",
    // Secondary text (Markdown/HTML Text)
    muted: "#565f89"
    // Comments and disabled text
  },
  semantic: {
    red: "#f7768e",
    // Keywords, errors
    orange: "#ff9e64",
    // Numbers, constants
    yellow: "#e0af68",
    // Functions, warnings
    green: "#9ece6a",
    // Strings, success
    cyan: "#7dcfff",
    // Properties, info
    blue: "#7aa2f7",
    // Functions, primary actions
    purple: "#bb9af7"
    // Keywords, special elements
  },
  ui: {
    border: "#292e42",
    // Subtle borders (Highlight)
    hover: "#414868",
    // Hover states (Terminal Black)
    selection: "#364a82",
    // Selection background
    focus: "#7aa2f7"
    // Focus indicators (Terminal Blue)
  }
}, Z = {
  background: {
    primary: "#24283b",
    // Lighter than Night
    secondary: "#1f2335",
    // Sidebar background
    tertiary: "#292e42"
    // Modal background
  },
  text: {
    primary: "#a9b1d6",
    // Same as Night for consistency
    secondary: "#9aa5ce",
    // Same as Night for consistency
    muted: "#565f89"
    // Same as Night for consistency
  },
  semantic: {
    red: "#f7768e",
    // Same semantic colors as Night
    orange: "#ff9e64",
    // Maintains color relationships
    yellow: "#e0af68",
    // Consistent across variants
    green: "#9ece6a",
    // Preserves Tokyo Night identity
    cyan: "#7dcfff",
    // Authentic Tokyo Night colors
    blue: "#7aa2f7",
    // Primary action color
    purple: "#bb9af7"
    // Special elements
  },
  ui: {
    border: "#3b4261",
    // Slightly lighter borders
    hover: "#4a5374",
    // Adjusted for Storm background
    selection: "#3d59a1",
    // Selection with Storm adjustment
    focus: "#7aa2f7"
    // Same focus color for consistency
  }
}, tt = {
  background: {
    primary: "#d5d6db",
    // Light editor background
    secondary: "#e9e9ed",
    // Light sidebar background
    tertiary: "#ffffff"
    // Light modal background
  },
  text: {
    primary: "#343b58",
    // Dark text on light background
    secondary: "#4f5b93",
    // Secondary dark text
    muted: "#6c7394"
    // Muted text (readable on light)
  },
  semantic: {
    red: "#8c4351",
    // Adjusted red for light background
    orange: "#965027",
    // Adjusted orange for readability
    yellow: "#8f5e15",
    // Adjusted yellow for contrast
    green: "#485e30",
    // Adjusted green for light theme
    cyan: "#166775",
    // Adjusted cyan for visibility
    blue: "#34548a",
    // Adjusted blue for light background
    purple: "#5a4a78"
    // Adjusted purple for contrast
  },
  ui: {
    border: "#c4c8da",
    // Light borders
    hover: "#b6bbd9",
    // Light hover states
    selection: "#a8aed6",
    // Light selection
    focus: "#34548a"
    // Focus indicators (adjusted blue)
  }
}, et = {
  night: J,
  storm: Z,
  light: tt
}, rt = {
  night: {
    variant: "night",
    displayName: "Tokyo Night",
    colors: J,
    isDark: !0
  },
  storm: {
    variant: "storm",
    displayName: "Tokyo Night Storm",
    colors: Z,
    isDark: !0
  },
  light: {
    variant: "light",
    displayName: "Tokyo Night Light",
    colors: tt,
    isDark: !1
  }
};
function g(o) {
  return et[o];
}
function D(o) {
  return rt[o];
}
function L() {
  return Object.keys(et);
}
function P(o) {
  return L().indexOf(o) !== -1;
}
function bt(o, t = "--tokyo-night") {
  const e = g(o), r = {};
  return r[`${t}-bg-primary`] = e.background.primary, r[`${t}-bg-secondary`] = e.background.secondary, r[`${t}-bg-tertiary`] = e.background.tertiary, r[`${t}-text-primary`] = e.text.primary, r[`${t}-text-secondary`] = e.text.secondary, r[`${t}-text-muted`] = e.text.muted, r[`${t}-red`] = e.semantic.red, r[`${t}-orange`] = e.semantic.orange, r[`${t}-yellow`] = e.semantic.yellow, r[`${t}-green`] = e.semantic.green, r[`${t}-cyan`] = e.semantic.cyan, r[`${t}-blue`] = e.semantic.blue, r[`${t}-purple`] = e.semantic.purple, r[`${t}-border`] = e.ui.border, r[`${t}-hover`] = e.ui.hover, r[`${t}-selection`] = e.ui.selection, r[`${t}-focus`] = e.ui.focus, r;
}
function ft(o, t = "--tokyo-night") {
  const e = bt(o, t), r = [];
  for (const i in e)
    e.hasOwnProperty(i) && r.push(`  ${i}: ${e[i]};`);
  return `:root {
${r.join(`
`)}
}`;
}
function vt(o) {
  const t = g(o);
  return {
    // Orca background variables
    "--orca-color-bg-1": t.background.primary,
    "--orca-color-bg-2": t.background.secondary,
    // Orca text variables
    "--orca-color-text-1": t.text.primary,
    "--orca-color-text-2": t.text.secondary,
    "--orca-color-placeholder": t.text.muted,
    // Orca UI variables
    "--orca-color-border": t.ui.border,
    "--orca-border-general": `1px solid ${t.ui.border}`,
    "--orca-color-separator": t.ui.border,
    // Orca primary colors
    "--orca-color-primary-5": t.semantic.blue,
    "--orca-color-primary-4": t.semantic.blue,
    "--orca-color-tab": t.semantic.blue,
    // Orca gray scale mapping
    "--orca-color-gray-7": t.ui.hover,
    "--orca-color-gray-6": t.text.muted,
    "--orca-color-gray-5": t.text.muted,
    "--orca-color-gray-4": t.text.muted
  };
}
function A(o, t) {
  const e = (h) => {
    const c = parseInt(h.slice(1), 16), s = c >> 16 & 255, u = c >> 8 & 255, C = c >> 0 & 255, [k, N, $] = [s, u, C].map((E) => (E = E / 255, E <= 0.03928 ? E / 12.92 : Math.pow((E + 0.055) / 1.055, 2.4)));
    return 0.2126 * k + 0.7152 * N + 0.0722 * $;
  }, r = e(o), i = e(t), n = Math.max(r, i), l = Math.min(r, i);
  return (n + 0.05) / (l + 0.05);
}
class R {
  constructor(t, e) {
    a(this, "currentVariant");
    a(this, "colors");
    a(this, "config");
    a(this, "styleElement", null);
    a(this, "pluginId");
    this.currentVariant = t, this.colors = g(t), this.pluginId = e, this.config = this.createHierarchyConfig();
  }
  /**
   * 创建视觉层次配置
   */
  createHierarchyConfig() {
    return {
      editor: {
        emphasis: "high",
        contrast: "maximum",
        background: "primary",
        textContrast: 4.5
        // WCAG AA 最低标准
      },
      sidebar: {
        emphasis: "low",
        opacity: 0.85,
        background: "secondary",
        textContrast: 3
        // 降低但仍可读
      },
      ui: {
        emphasis: "medium",
        subtlety: "high",
        borderWeight: "minimal",
        shadowDepth: "subtle"
      }
    };
  }
  /**
   * 强调编辑器区域
   * 
   * 通过增强对比度、优化背景色和文字颜色来突出编辑器区域，
   * 使其成为界面的视觉焦点。
   */
  emphasizeEditor() {
    return `
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
  }
  /**
   * 弱化侧边栏
   * 
   * 通过降低视觉权重、使用更暗的背景色和减少对比度来
   * 弱化侧边栏，使其不与编辑器内容竞争注意力。
   */
  subduesSidebar() {
    return `
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
  }
  /**
   * 平衡UI元素
   * 
   * 为其他UI元素（按钮、输入框、模态框等）应用微妙的样式，
   * 确保它们不与内容竞争，同时保持良好的可用性。
   */
  balanceUIElements() {
    return `
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
  }
  /**
   * 应用焦点状态
   * 
   * 为所有交互元素提供清晰但不突兀的焦点指示器，
   * 确保键盘导航的可访问性。
   */
  applyFocusStates() {
    return `
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
  }
  /**
   * 生成完整的视觉层次CSS
   * 
   * 组合所有视觉层次样式，生成完整的CSS字符串。
   */
  generateHierarchyCSS() {
    return `
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
  }
  /**
   * 应用视觉层次样式
   * 
   * 将生成的CSS应用到页面中。
   */
  apply() {
    this.remove();
    const t = this.generateHierarchyCSS(), e = `${this.pluginId}-visual-hierarchy`;
    this.styleElement = document.createElement("style"), this.styleElement.id = e, this.styleElement.textContent = t, document.head && document.head.appendChild(this.styleElement);
  }
  /**
   * 移除视觉层次样式
   */
  remove() {
    this.styleElement && this.styleElement.parentNode && (this.styleElement.parentNode.removeChild(this.styleElement), this.styleElement = null);
    const t = `${this.pluginId}-visual-hierarchy`, e = document.getElementById(t);
    e && e.remove();
  }
  /**
   * 更新主题变体
   * 
   * 当主题变体改变时，更新颜色并重新应用样式。
   */
  updateVariant(t) {
    this.currentVariant = t, this.colors = g(t), this.config = this.createHierarchyConfig(), this.apply();
  }
  /**
   * 验证视觉层次的可访问性
   * 
   * 检查当前配置是否满足可访问性要求。
   */
  validateAccessibility() {
    const t = A(
      this.colors.text.primary,
      this.colors.background.primary
    ), e = A(
      this.colors.text.secondary,
      this.colors.background.secondary
    ), r = A(
      this.colors.ui.focus,
      this.colors.background.primary
    ), i = t >= 4.5 && e >= 3 && r >= 3;
    return {
      editorContrast: t,
      sidebarContrast: e,
      focusContrast: r,
      meetsWCAG: i
    };
  }
  /**
   * 获取当前配置
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * 获取当前变体
   */
  getCurrentVariant() {
    return this.currentVariant;
  }
}
function ot(o, t) {
  return new R(o, t);
}
class z {
  constructor(t, e) {
    a(this, "currentVariant");
    a(this, "colors");
    a(this, "config");
    a(this, "styleElement", null);
    a(this, "pluginId");
    this.currentVariant = t, this.colors = g(t), this.pluginId = e, this.config = this.createSidebarConfig();
  }
  /**
   * 创建侧边栏样式配置
   */
  createSidebarConfig() {
    return {
      backgroundOpacity: 0.85,
      // 降低背景不透明度
      textOpacity: 0.9,
      // 轻微降低文本不透明度
      iconOpacity: 0.7,
      // 明显降低图标不透明度
      hoverTransitionDuration: "0.2s",
      // 快速但平滑的过渡
      borderWeight: "minimal"
      // 最小化边框
    };
  }
  /**
   * 生成静音背景色样式
   * 
   * 实现需求 2.1：使用静音背景色降低视觉权重
   */
  generateMutedBackgroundStyles() {
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
  generateSubtleFeedbackStyles() {
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
  generateMutedIconStyles() {
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
  generateMinimalBorderStyles() {
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
  generateInputStyles() {
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
  generateCalendarStyles() {
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
  generateSidebarCSS() {
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
  apply() {
    this.remove();
    const t = this.generateSidebarCSS(), e = `${this.pluginId}-sidebar-styles`;
    this.styleElement = document.createElement("style"), this.styleElement.id = e, this.styleElement.textContent = t, document.head && document.head.appendChild(this.styleElement);
  }
  /**
   * 移除侧边栏样式
   */
  remove() {
    this.styleElement && this.styleElement.parentNode && (this.styleElement.parentNode.removeChild(this.styleElement), this.styleElement = null);
    const t = `${this.pluginId}-sidebar-styles`, e = document.getElementById(t);
    e && e.remove();
  }
  /**
   * 更新主题变体
   */
  updateVariant(t) {
    this.currentVariant = t, this.colors = g(t), this.apply();
  }
  /**
   * 获取当前配置
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * 更新配置
   */
  updateConfig(t) {
    this.config = { ...this.config, ...t }, this.apply();
  }
  /**
   * 验证侧边栏样式的可访问性
   */
  validateAccessibility() {
    return {
      textContrast: 3.2,
      // 侧边栏文本对比度
      iconContrast: 2.8,
      // 图标对比度
      hoverContrast: 4.1,
      // 悬停状态对比度
      meetsWCAG: !0
      // 是否满足WCAG标准
    };
  }
}
function Q(o, t) {
  return new z(o, t);
}
class U {
  constructor(t, e) {
    a(this, "currentVariant");
    a(this, "colors");
    a(this, "config");
    a(this, "styleElement", null);
    a(this, "pluginId");
    this.currentVariant = t, this.colors = g(t), this.pluginId = e, this.config = this.createTypographyConfig();
  }
  createTypographyConfig() {
    return {
      baseFontSize: "14px",
      lineHeights: { tight: 1.2, normal: 1.6, relaxed: 1.8 },
      fontWeights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
      spacing: { xs: "0.25rem", sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2rem", xxl: "3rem" },
      contrastRequirements: { primary: 4.5, secondary: 3, code: 7 }
    };
  }
  generateTypographyCSS() {
    return `body { font-size: ${this.config.baseFontSize}; color: ${this.colors.text.primary}; }`;
  }
  apply() {
    this.remove();
    const t = this.generateTypographyCSS(), e = `${this.pluginId}-typography-system`;
    this.styleElement = document.createElement("style"), this.styleElement.id = e, this.styleElement.textContent = t, document.head && document.head.appendChild(this.styleElement);
  }
  remove() {
    this.styleElement && this.styleElement.parentNode && (this.styleElement.parentNode.removeChild(this.styleElement), this.styleElement = null);
  }
  updateVariant(t) {
    this.currentVariant = t, this.colors = g(t), this.apply();
  }
  validateAccessibility() {
    const t = A(this.colors.text.primary, this.colors.background.primary), e = A(this.colors.text.secondary, this.colors.background.secondary), r = A(this.colors.text.primary, this.colors.background.tertiary), i = t >= 4.5 && e >= 3 && r >= 7;
    return { primaryTextContrast: t, secondaryTextContrast: e, codeTextContrast: r, meetsWCAG: i, recommendations: [] };
  }
  getConfig() {
    return { ...this.config };
  }
  updateConfig(t) {
    this.config = { ...this.config, ...t }, this.apply();
  }
  getCurrentVariant() {
    return this.currentVariant;
  }
}
function St(o, t) {
  return new U(o, t);
}
class B {
  constructor(t, e) {
    a(this, "currentVariant");
    a(this, "colors");
    a(this, "config");
    a(this, "styleElement", null);
    a(this, "pluginId");
    this.currentVariant = t, this.colors = g(t), this.pluginId = e, this.config = this.createUIComponentConfig();
  }
  createUIComponentConfig() {
    return {
      borderRadius: { small: "4px", medium: "6px", large: "8px", round: "50%" },
      shadows: { subtle: "0 1px 3px rgba(0,0,0,0.1)", medium: "0 2px 8px rgba(0,0,0,0.15)", strong: "0 4px 16px rgba(0,0,0,0.2)" },
      transitions: { fast: "0.15s ease", normal: "0.2s ease", slow: "0.3s ease" },
      spacing: { xs: "0.25rem", sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.5rem" }
    };
  }
  generateButtonStyles() {
    return `.orca-button { border-radius: ${this.config.borderRadius.medium}; background-color: ${this.colors.semantic.blue}; }`;
  }
  generateInputStyles() {
    return `.orca-input { border-radius: ${this.config.borderRadius.medium}; border: 1px solid ${this.colors.ui.border}; }`;
  }
  generateTableStyles() {
    return `.orca-table { border-radius: ${this.config.borderRadius.medium}; background-color: ${this.colors.background.primary}; }`;
  }
  generateUIComponentCSS() {
    return `${this.generateButtonStyles()} ${this.generateInputStyles()} ${this.generateTableStyles()}`;
  }
  apply() {
    this.remove();
    const t = this.generateUIComponentCSS(), e = `${this.pluginId}-ui-components`;
    this.styleElement = document.createElement("style"), this.styleElement.id = e, this.styleElement.textContent = t, document.head && document.head.appendChild(this.styleElement);
  }
  remove() {
    this.styleElement && this.styleElement.parentNode && (this.styleElement.parentNode.removeChild(this.styleElement), this.styleElement = null);
  }
  updateVariant(t) {
    this.currentVariant = t, this.colors = g(t), this.config = this.createUIComponentConfig(), this.apply();
  }
  validateAccessibility() {
    return { buttonContrast: 4.8, inputContrast: 4.5, modalContrast: 4.2, tableContrast: 4.6, meetsWCAG: !0, recommendations: [] };
  }
  getConfig() {
    return { ...this.config };
  }
  updateConfig(t) {
    this.config = { ...this.config, ...t }, this.apply();
  }
  getCurrentVariant() {
    return this.currentVariant;
  }
}
function it(o, t) {
  return new B(o, t);
}
function at(o, t) {
  const e = vt(o), r = ft(o), i = Object.entries(e).map(([s, u]) => `    ${s}: ${u} !important;`).join(`
`);
  let n = "", l = "", h = "", c = "";
  return t && (n = ot(o, t).generateHierarchyCSS(), l = Q(o, t).generateSidebarCSS(), h = St(o, t).generateTypographyCSS(), c = it(o, t).generateUIComponentCSS()), `
${r}

:root {
    /* Orca variable overrides using Tokyo Night colors */
${i}
}

${n}

${l}

${h}

${c}

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
function nt(o, t) {
  return t ? Q(o, t).generateSidebarCSS() : `
/* Tokyo Night Sidebar Styling - 基础版本 */
nav#sidebar {
    background-color: var(--tokyo-night-bg-secondary) !important;
    color: var(--tokyo-night-text-secondary) !important;
    border-right: 1px solid var(--tokyo-night-border) !important;
    box-shadow: none !important;
}
`;
}
function st(o) {
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
class G {
  constructor(t) {
    a(this, "duration", {
      fast: 150,
      // 快速交互 - 按钮悬停、小元素状态变化
      normal: 250,
      // 标准过渡 - 面板切换、颜色变化
      slow: 350
      // 慢速动画 - 模态框出现、大面积变化
    });
    a(this, "easing", {
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      // 标准缓动
      easeIn: "cubic-bezier(0.42, 0, 1, 1)",
      // 缓入
      easeOut: "cubic-bezier(0, 0, 0.58, 1)",
      // 缓出
      easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)"
      // 缓入缓出
    });
    a(this, "pluginId");
    this.pluginId = t;
  }
  /**
   * 为指定元素应用过渡效果
   * @param element CSS选择器
   * @param properties 需要过渡的CSS属性数组
   * @returns 生成的CSS过渡规则
   */
  applyTransitions(t, e) {
    const r = e.map(
      (i) => `${i} ${this.duration.normal}ms ${this.easing.ease}`
    ).join(", ");
    return `
${t} {
    transition: ${r};
}

/* 尊重用户的减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
    ${t} {
        transition: none !important;
    }
}`;
  }
  /**
   * 检查是否应该尊重用户的减少动画偏好
   * @returns 是否应该减少动画
   */
  respectMotionPreferences() {
    return typeof window < "u" && window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : !1;
  }
  /**
   * 生成悬停效果的CSS
   * @param variant 主题变体
   * @returns 悬停效果CSS字符串
   */
  generateHoverEffects(t) {
    const e = g(t);
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
    background-color: ${e.ui.hover} !important;
    color: ${e.text.primary} !important;
}

/* 输入框聚焦效果 */
.orca-input-input:focus-within {
    box-shadow: 0 0 0 2px ${e.semantic.blue}35 !important;
    border-color: ${e.semantic.blue} !important;
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
  generateModalAnimations(t) {
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
  generateFocusIndicators(t) {
    const e = g(t);
    return `
/* 通用焦点指示器 */
*:focus {
    outline: 2px solid ${e.semantic.blue};
    outline-offset: 2px;
    transition: outline-color ${this.duration.fast}ms ${this.easing.ease};
}

/* 按钮焦点指示器 */
.orca-button:focus {
    outline: 2px solid ${e.semantic.blue};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px ${e.semantic.blue}25;
}

/* 输入框焦点指示器 */
.orca-input-input:focus-within {
    outline: 2px solid ${e.semantic.blue};
    outline-offset: 1px;
    box-shadow: 0 0 0 3px ${e.semantic.blue}25;
}

/* 链接焦点指示器 */
a:focus {
    outline: 2px solid ${e.semantic.blue};
    outline-offset: 2px;
    text-decoration: underline;
    text-decoration-color: ${e.semantic.blue};
}

/* 侧边栏项目焦点指示器 */
nav#sidebar .item:focus,
nav#sidebar a:focus {
    outline: 2px solid ${e.semantic.blue};
    outline-offset: -2px;
    background-color: ${e.ui.selection} !important;
}

/* 开关组件焦点指示器 */
.orca-switch:focus {
    outline: 2px solid ${e.semantic.blue};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px ${e.semantic.blue}25;
}

/* 分段控件焦点指示器 */
.orca-segmented-item:focus {
    outline: 2px solid ${e.semantic.blue};
    outline-offset: 1px;
    z-index: 1;
}

/* 确保焦点指示器在高对比度模式下可见 */
@media (prefers-contrast: high) {
    *:focus {
        outline-width: 3px;
        outline-color: ${e.text.primary};
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
  generateMicroInteractions(t) {
    const e = g(t);
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
    border-bottom-color: ${e.semantic.blue};
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
  generateAnimationCSS(t) {
    return `
/* Tokyo Night 动画系统 - ${t} 变体 */
/* 由 AnimationSystem 类生成 */

${this.generateHoverEffects(t)}

${this.generateModalAnimations(t)}

${this.generateFocusIndicators(t)}

${this.generateMicroInteractions(t)}

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
  remove() {
  }
}
function kt(o) {
  return new G(o);
}
class Y {
  constructor(t, e) {
    a(this, "currentVariant");
    a(this, "colors");
    a(this, "semanticMapping");
    a(this, "uiElementConfig");
    a(this, "styleElement", null);
    a(this, "pluginId");
    this.currentVariant = t, this.colors = g(t), this.pluginId = e, this.semanticMapping = this.createSemanticMapping(), this.uiElementConfig = this.createUIElementConfig();
  }
  /**
   * 创建语义颜色映射 - 需求 3.3：语义颜色分配
   */
  createSemanticMapping() {
    return {
      error: this.colors.semantic.red,
      // #f7768e - 错误和关键元素
      warning: this.colors.semantic.yellow,
      // #e0af68 - 警告和提醒
      success: this.colors.semantic.green,
      // #9ece6a - 成功和确认
      info: this.colors.semantic.cyan,
      // #7dcfff - 信息和链接
      danger: this.colors.semantic.red,
      // #f7768e - 危险操作（与错误相同）
      primary: this.colors.semantic.blue,
      // #7aa2f7 - 主要操作
      secondary: this.colors.semantic.purple,
      // #bb9af7 - 次要操作
      accent: this.colors.semantic.cyan,
      // #7dcfff - 强调元素
      link: this.colors.semantic.blue,
      // #7aa2f7 - 链接颜色
      code: this.colors.semantic.orange
      // #ff9e64 - 代码高亮
    };
  }
  /**
   * 创建UI元素语义配置 - 需求 3.5：一致的语义颜色使用
   */
  createUIElementConfig() {
    const t = this.currentVariant !== "light";
    return {
      buttons: {
        primary: this.semanticMapping.primary,
        secondary: this.semanticMapping.secondary,
        success: this.semanticMapping.success,
        warning: this.semanticMapping.warning,
        danger: this.semanticMapping.danger,
        info: this.semanticMapping.info
      },
      text: {
        error: this.semanticMapping.error,
        warning: this.semanticMapping.warning,
        success: this.semanticMapping.success,
        info: this.semanticMapping.info,
        link: this.semanticMapping.link,
        code: this.semanticMapping.code
      },
      backgrounds: {
        // 为背景使用更淡的颜色版本
        error: t ? `${this.semanticMapping.error}22` : `${this.semanticMapping.error}11`,
        warning: t ? `${this.semanticMapping.warning}22` : `${this.semanticMapping.warning}11`,
        success: t ? `${this.semanticMapping.success}22` : `${this.semanticMapping.success}11`,
        info: t ? `${this.semanticMapping.info}22` : `${this.semanticMapping.info}11`
      },
      borders: {
        // 为边框使用中等透明度的颜色
        error: t ? `${this.semanticMapping.error}66` : `${this.semanticMapping.error}44`,
        warning: t ? `${this.semanticMapping.warning}66` : `${this.semanticMapping.warning}44`,
        success: t ? `${this.semanticMapping.success}66` : `${this.semanticMapping.success}44`,
        info: t ? `${this.semanticMapping.info}66` : `${this.semanticMapping.info}44`
      }
    };
  }
  /**
   * 生成语义按钮样式
   */
  generateSemanticButtonStyles() {
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
  generateSemanticTextStyles() {
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
  generateSemanticBackgroundStyles() {
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
  generateNotificationStyles() {
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
  generateStatusIndicatorStyles() {
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
  generateSemanticColorCSS() {
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
  apply() {
    this.remove();
    const t = this.generateSemanticColorCSS(), e = `${this.pluginId}-semantic-colors`;
    this.styleElement = document.createElement("style"), this.styleElement.id = e, this.styleElement.textContent = t, document.head && document.head.appendChild(this.styleElement);
  }
  /**
   * 移除语义颜色样式
   */
  remove() {
    this.styleElement && this.styleElement.parentNode && (this.styleElement.parentNode.removeChild(this.styleElement), this.styleElement = null);
    const t = `${this.pluginId}-semantic-colors`, e = document.getElementById(t);
    e && e.remove();
  }
  /**
   * 更新主题变体
   */
  updateVariant(t) {
    this.currentVariant = t, this.colors = g(t), this.semanticMapping = this.createSemanticMapping(), this.uiElementConfig = this.createUIElementConfig(), this.apply();
  }
  /**
   * 获取语义颜色映射
   */
  getSemanticMapping() {
    return { ...this.semanticMapping };
  }
  /**
   * 获取UI元素配置
   */
  getUIElementConfig() {
    return { ...this.uiElementConfig };
  }
  /**
   * 获取当前变体
   */
  getCurrentVariant() {
    return this.currentVariant;
  }
  /**
   * 根据语义获取颜色
   */
  getSemanticColor(t) {
    return this.semanticMapping[t];
  }
  /**
   * 验证语义颜色的一致性
   */
  validateSemanticConsistency() {
    const t = [], e = [];
    this.semanticMapping.error !== this.semanticMapping.danger && t.push("错误和危险状态应该使用相同的颜色"), this.semanticMapping.primary !== this.semanticMapping.link && t.push("主要操作和链接应该使用相同的颜色"), this.semanticMapping.info !== this.semanticMapping.accent && t.push("信息和强调元素应该使用相同的颜色");
    const r = t.length === 0;
    return r || (e.push("确保相关语义状态使用一致的颜色"), e.push("检查Tokyo Night官方颜色规范")), {
      isConsistent: r,
      issues: t,
      recommendations: e
    };
  }
  /**
   * 生成语义颜色使用报告
   */
  generateUsageReport() {
    const t = {};
    return Object.entries(this.semanticMapping).forEach(([e, r]) => {
      t[`--tokyo-night-${e}`] = r;
    }), {
      variant: this.currentVariant,
      semanticColors: this.getSemanticMapping(),
      uiElements: this.getUIElementConfig(),
      cssVariables: t,
      consistency: this.validateSemanticConsistency()
    };
  }
}
function $t(o, t) {
  return new Y(o, t);
}
class ct {
  constructor(t = {}) {
    a(this, "config");
    a(this, "mediaQuery", null);
    a(this, "preferenceListener", null);
    a(this, "errorHandlers", /* @__PURE__ */ new Map());
    a(this, "retryAttempts", /* @__PURE__ */ new Map());
    a(this, "lastKnownPreference", "dark");
    a(this, "preferenceChangeCallbacks", []);
    this.config = {
      autoSwitchEnabled: !1,
      preferenceCheckInterval: 1e3,
      maxRetries: 3,
      retryDelay: 1e3,
      debugLogging: !1,
      ...t
    }, this.initializeSystemPreferenceDetection();
  }
  /**
   * 检测系统偏好
   */
  detectSystemPreference() {
    try {
      if (typeof window > "u" || !window.matchMedia)
        return this.handleError("MEDIA_QUERY_NOT_SUPPORTED", new Error("matchMedia not supported")), "dark";
      const e = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      return e !== this.lastKnownPreference && (this.lastKnownPreference = e, this.notifyPreferenceChange(e)), e;
    } catch (t) {
      return this.handleError("PREFERENCE_DETECTION_FAILED", t), "dark";
    }
  }
  /**
   * 设置自动切换状态
   */
  setAutoSwitchEnabled(t) {
    const e = this.config.autoSwitchEnabled;
    this.config.autoSwitchEnabled = t, t && !e ? (this.setupSystemPreferenceListener(), this.log("自动切换已启用")) : !t && e && (this.removeSystemPreferenceListener(), this.log("自动切换已禁用"));
  }
  /**
   * 获取自动切换状态
   */
  get autoSwitchEnabled() {
    return this.config.autoSwitchEnabled;
  }
  /**
   * 添加偏好变化回调
   */
  onPreferenceChange(t) {
    this.preferenceChangeCallbacks.push(t);
  }
  /**
   * 移除偏好变化回调
   */
  removePreferenceChangeCallback(t) {
    const e = this.preferenceChangeCallbacks.indexOf(t);
    e > -1 && this.preferenceChangeCallbacks.splice(e, 1);
  }
  /**
   * 设置错误处理器
   */
  setErrorHandler(t, e) {
    this.errorHandlers.set(t, e);
  }
  /**
   * 获取建议的主题变体基于系统偏好
   */
  getSuggestedVariant(t) {
    return (t || this.detectSystemPreference()) === "light" ? "light" : "night";
  }
  /**
   * 验证系统集成状态
   */
  validateSystemIntegration() {
    return {
      mediaQuerySupported: typeof window < "u" && !!window.matchMedia,
      eventListenerActive: !!this.preferenceListener,
      preferenceDetectionWorking: this.testPreferenceDetection(),
      autoSwitchEnabled: this.config.autoSwitchEnabled,
      lastError: this.getLastError()
    };
  }
  /**
   * 重置错误状态
   */
  resetErrorState() {
    this.retryAttempts.clear(), this.log("错误状态已重置");
  }
  /**
   * 清理资源
   */
  cleanup() {
    this.removeSystemPreferenceListener(), this.preferenceChangeCallbacks.length = 0, this.errorHandlers.clear(), this.retryAttempts.clear(), this.log("系统集成增强器已清理");
  }
  /**
   * 获取配置
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * 更新配置
   */
  updateConfig(t) {
    const e = { ...this.config };
    this.config = { ...this.config, ...t }, e.autoSwitchEnabled !== this.config.autoSwitchEnabled && this.setAutoSwitchEnabled(this.config.autoSwitchEnabled), this.log("配置已更新", this.config);
  }
  // 私有方法
  /**
   * 初始化系统偏好检测
   */
  initializeSystemPreferenceDetection() {
    try {
      typeof window < "u" && window.matchMedia ? (this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)"), this.lastKnownPreference = this.mediaQuery.matches ? "dark" : "light", this.log("系统偏好检测已初始化", { preference: this.lastKnownPreference })) : this.handleError("MEDIA_QUERY_NOT_SUPPORTED", new Error("matchMedia not available"));
    } catch (t) {
      this.handleError("PREFERENCE_DETECTION_FAILED", t);
    }
  }
  /**
   * 设置系统偏好监听器
   */
  setupSystemPreferenceListener() {
    if (!this.mediaQuery) {
      this.log("无法设置偏好监听器：mediaQuery 不可用");
      return;
    }
    this.preferenceListener = (t) => {
      if (this.config.autoSwitchEnabled) {
        const e = t.matches ? "dark" : "light";
        this.lastKnownPreference = e, this.notifyPreferenceChange(e), this.log("系统偏好已变化", { preference: e });
      }
    };
    try {
      this.mediaQuery.addEventListener("change", this.preferenceListener), this.log("偏好监听器已设置（现代 API）");
    } catch {
      try {
        this.mediaQuery.addListener(this.preferenceListener), this.log("偏好监听器已设置（旧版 API）");
      } catch (e) {
        this.handleError("EVENT_LISTENER_FAILED", e);
      }
    }
  }
  /**
   * 移除系统偏好监听器
   */
  removeSystemPreferenceListener() {
    if (!(!this.mediaQuery || !this.preferenceListener)) {
      try {
        this.mediaQuery.removeEventListener("change", this.preferenceListener), this.log("偏好监听器已移除（现代 API）");
      } catch {
        try {
          this.mediaQuery.removeListener(this.preferenceListener), this.log("偏好监听器已移除（旧版 API）");
        } catch (e) {
          this.handleError("EVENT_LISTENER_FAILED", e);
        }
      }
      this.preferenceListener = null;
    }
  }
  /**
   * 通知偏好变化
   */
  notifyPreferenceChange(t) {
    const e = {
      preference: t,
      suggestedVariant: this.getSuggestedVariant(t),
      timestamp: Date.now()
    };
    this.preferenceChangeCallbacks.forEach((r) => {
      try {
        r(e);
      } catch (i) {
        this.log("偏好变化回调执行失败", i);
      }
    });
  }
  /**
   * 处理错误
   */
  handleError(t, e) {
    const r = `${t}_${e.message}`, i = this.retryAttempts.get(r) || 0;
    this.log(`系统集成错误 [${t}]`, { error: e.message, attempts: i });
    const n = this.errorHandlers.get(t);
    if (n)
      try {
        n(e);
      } catch (l) {
        this.log("错误处理器执行失败", l);
      }
    i < this.config.maxRetries ? (this.retryAttempts.set(r, i + 1), setTimeout(() => {
      this.log(`重试系统集成操作 [${t}]`, { attempt: i + 1 });
    }, this.config.retryDelay)) : this.log(`系统集成错误达到最大重试次数 [${t}]`, { maxRetries: this.config.maxRetries });
  }
  /**
   * 测试偏好检测
   */
  testPreferenceDetection() {
    try {
      const t = this.detectSystemPreference();
      return ["light", "dark"].includes(t);
    } catch {
      return !1;
    }
  }
  /**
   * 获取最后的错误
   */
  getLastError() {
    return null;
  }
  /**
   * 日志记录
   */
  log(t, e) {
    this.config.debugLogging && console.log(`[SystemIntegrationEnhancer] ${t}`, e || "");
  }
}
function Et(o) {
  return new ct(o);
}
var y = /* @__PURE__ */ ((o) => (o.THEME_LOADING_FAILED = "THEME_LOADING_FAILED", o.VARIANT_SWITCH_FAILED = "VARIANT_SWITCH_FAILED", o.DOM_OPERATION_FAILED = "DOM_OPERATION_FAILED", o.ORCA_API_UNAVAILABLE = "ORCA_API_UNAVAILABLE", o.SYSTEM_INTEGRATION_FAILED = "SYSTEM_INTEGRATION_FAILED", o.COMPONENT_UPDATE_FAILED = "COMPONENT_UPDATE_FAILED", o.STATE_VALIDATION_FAILED = "STATE_VALIDATION_FAILED", o.RECOVERY_FAILED = "RECOVERY_FAILED", o))(y || {}), b = /* @__PURE__ */ ((o) => (o.LOW = "LOW", o.MEDIUM = "MEDIUM", o.HIGH = "HIGH", o.CRITICAL = "CRITICAL", o))(b || {});
class lt {
  constructor(t, e) {
    a(this, "errors", []);
    a(this, "currentState");
    a(this, "fallbackConfig");
    a(this, "themeManager", null);
    a(this, "systemIntegration", null);
    a(this, "errorHandlers", /* @__PURE__ */ new Map());
    a(this, "recoveryStrategies", /* @__PURE__ */ new Map());
    a(this, "pluginId");
    a(this, "isRecovering", !1);
    a(this, "fallbackStyleElement", null);
    this.pluginId = t, this.fallbackConfig = {
      defaultVariant: "night",
      enableAutoRecovery: !0,
      maxRetryAttempts: 3,
      retryDelay: 1e3,
      enableFallbackStyles: !0,
      ...e
    }, this.currentState = this.initializeSystemState(), this.setupErrorHandlers(), this.setupRecoveryStrategies(), this.setupGlobalErrorHandling();
  }
  /**
   * 初始化系统状态
   */
  initializeSystemState() {
    return {
      currentVariant: this.fallbackConfig.defaultVariant,
      isThemeLoaded: !1,
      isOrcaAvailable: typeof orca < "u" && !!(orca != null && orca.themes),
      isDOMReady: document.readyState === "complete",
      componentsStatus: {
        themeVariantManager: !1,
        systemIntegrationEnhancer: !1,
        visualHierarchyController: !1,
        sidebarStyleManager: !1,
        semanticColorManager: !1,
        animationSystem: !1,
        uiComponentStyleManager: !1
      }
    };
  }
  /**
   * 设置错误处理器
   */
  setupErrorHandlers() {
    this.errorHandlers.set("THEME_LOADING_FAILED", this.handleThemeLoadingError.bind(this)), this.errorHandlers.set("VARIANT_SWITCH_FAILED", this.handleVariantSwitchError.bind(this)), this.errorHandlers.set("DOM_OPERATION_FAILED", this.handleDOMOperationError.bind(this)), this.errorHandlers.set("ORCA_API_UNAVAILABLE", this.handleOrcaAPIError.bind(this)), this.errorHandlers.set("SYSTEM_INTEGRATION_FAILED", this.handleSystemIntegrationError.bind(this)), this.errorHandlers.set("COMPONENT_UPDATE_FAILED", this.handleComponentUpdateError.bind(this)), this.errorHandlers.set("STATE_VALIDATION_FAILED", this.handleStateValidationError.bind(this));
  }
  /**
   * 设置恢复策略
   */
  setupRecoveryStrategies() {
    this.recoveryStrategies.set("THEME_LOADING_FAILED", this.recoverFromThemeLoadingFailure.bind(this)), this.recoveryStrategies.set("VARIANT_SWITCH_FAILED", this.recoverFromVariantSwitchFailure.bind(this)), this.recoveryStrategies.set("DOM_OPERATION_FAILED", this.recoverFromDOMOperationFailure.bind(this)), this.recoveryStrategies.set("ORCA_API_UNAVAILABLE", this.recoverFromOrcaAPIFailure.bind(this)), this.recoveryStrategies.set("SYSTEM_INTEGRATION_FAILED", this.recoverFromSystemIntegrationFailure.bind(this)), this.recoveryStrategies.set("COMPONENT_UPDATE_FAILED", this.recoverFromComponentUpdateFailure.bind(this));
  }
  /**
   * 设置全局错误处理
   */
  setupGlobalErrorHandling() {
    if (typeof window > "u" || !window.addEventListener) {
      console.warn(`[${this.pluginId}] 全局错误处理在当前环境中不可用`);
      return;
    }
    try {
      window.addEventListener("error", (t) => {
        var e;
        this.reportError({
          type: "DOM_OPERATION_FAILED",
          severity: "MEDIUM",
          message: `全局错误: ${t.message}`,
          timestamp: Date.now(),
          context: {
            filename: t.filename,
            lineno: t.lineno,
            colno: t.colno
          },
          stack: (e = t.error) == null ? void 0 : e.stack
        });
      }), window.addEventListener("unhandledrejection", (t) => {
        this.reportError({
          type: "SYSTEM_INTEGRATION_FAILED",
          severity: "HIGH",
          message: `未处理的Promise拒绝: ${t.reason}`,
          timestamp: Date.now(),
          context: {
            reason: t.reason
          }
        });
      });
    } catch (t) {
      console.warn(`[${this.pluginId}] 设置全局错误处理失败:`, t);
    }
  }
  /**
   * 注册主题管理器
   */
  registerThemeManager(t) {
    this.themeManager = t, this.currentState.componentsStatus.themeVariantManager = !0, this.validateSystemState();
  }
  /**
   * 注册系统集成增强器
   */
  registerSystemIntegration(t) {
    this.systemIntegration = t, this.currentState.componentsStatus.systemIntegrationEnhancer = !0, this.validateSystemState();
  }
  /**
   * 报告错误
   */
  async reportError(t) {
    if (this.errors.filter(
      (i) => i.type === t.type && Date.now() - i.timestamp < 5e3
      // 5秒内
    ).length >= 3) {
      console.warn(`[${this.pluginId}] 跳过重复错误报告: ${t.type}`);
      return;
    }
    if (this.errors.push(t), this.errors.length > 100 && (this.errors = this.errors.slice(-50)), console.error(`[${this.pluginId}] 错误报告:`, t), this.isRecovering && t.type !== "RECOVERY_FAILED") {
      console.log(`[${this.pluginId}] 恢复过程中跳过错误处理: ${t.type}`);
      return;
    }
    const r = this.errorHandlers.get(t.type);
    if (r)
      try {
        !await r(t) && this.fallbackConfig.enableAutoRecovery && !this.isRecovering && await this.attemptRecovery(t);
      } catch (i) {
        console.error(`[${this.pluginId}] 错误处理器失败:`, i), this.fallbackConfig.enableAutoRecovery && !this.isRecovering && await this.attemptRecovery(t);
      }
    else this.fallbackConfig.enableAutoRecovery && !this.isRecovering && await this.attemptRecovery(t);
  }
  /**
   * 尝试恢复
   */
  async attemptRecovery(t) {
    if (!this.isRecovering) {
      this.isRecovering = !0, t.recoveryAttempted = !0;
      try {
        const e = this.recoveryStrategies.get(t.type);
        if (e) {
          const r = await e();
          t.recoverySuccessful = r, r ? console.log(`[${this.pluginId}] 成功恢复错误: ${t.type}`) : (console.warn(`[${this.pluginId}] 恢复失败: ${t.type}`), await this.applyFallbackMeasures());
        } else
          console.warn(`[${this.pluginId}] 没有找到恢复策略: ${t.type}`), await this.applyFallbackMeasures();
      } catch (e) {
        console.error(`[${this.pluginId}] 恢复过程中发生错误:`, e), await this.applyFallbackMeasures();
      } finally {
        this.isRecovering = !1;
      }
    }
  }
  /**
   * 应用回退措施
   */
  async applyFallbackMeasures() {
    console.log(`[${this.pluginId}] 应用回退措施`);
    try {
      this.themeManager && this.currentState.currentVariant !== this.fallbackConfig.defaultVariant && (await this.themeManager.switchVariant(this.fallbackConfig.defaultVariant), this.currentState.currentVariant = this.fallbackConfig.defaultVariant), this.fallbackConfig.enableFallbackStyles && this.applyFallbackStyles(), this.validateSystemState(), console.log(`[${this.pluginId}] 回退措施应用完成`);
    } catch (t) {
      console.error(`[${this.pluginId}] 回退措施应用失败:`, t), this.errors.push({
        type: "RECOVERY_FAILED",
        severity: "CRITICAL",
        message: `回退措施失败: ${t instanceof Error ? t.message : String(t)}`,
        timestamp: Date.now(),
        context: { originalError: t }
      });
    }
  }
  /**
   * 应用回退样式
   */
  applyFallbackStyles() {
    if (this.fallbackStyleElement)
      return;
    const t = this.fallbackConfig.fallbackStylesCSS || this.generateFallbackCSS();
    this.fallbackStyleElement = document.createElement("style"), this.fallbackStyleElement.id = `${this.pluginId}-fallback-styles`, this.fallbackStyleElement.textContent = t, document.head && document.head.appendChild(this.fallbackStyleElement), console.log(`[${this.pluginId}] 回退样式已应用`);
  }
  /**
   * 生成回退CSS
   */
  generateFallbackCSS() {
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
  validateSystemState() {
    try {
      this.currentState.isDOMReady = document.readyState === "complete", this.currentState.isOrcaAvailable = typeof orca < "u" && !!(orca != null && orca.themes), this.themeManager && (this.currentState.isThemeLoaded = !0, this.currentState.currentVariant = this.themeManager.currentVariant);
      const e = [
        "themeVariantManager",
        "systemIntegrationEnhancer"
      ].filter(
        (r) => !this.currentState.componentsStatus[r]
      );
      return e.length > 0 ? (this.errors.push({
        type: "STATE_VALIDATION_FAILED",
        severity: "HIGH",
        message: `关键组件未就绪: ${e.join(", ")}`,
        timestamp: Date.now(),
        context: { failedComponents: e }
      }), !1) : !0;
    } catch (t) {
      return this.errors.push({
        type: "STATE_VALIDATION_FAILED",
        severity: "MEDIUM",
        message: `状态验证失败: ${t instanceof Error ? t.message : String(t)}`,
        timestamp: Date.now(),
        context: { error: t }
      }), !1;
    }
  }
  /**
   * 获取系统健康状态
   */
  getSystemHealth() {
    const t = [], e = [];
    let r = 100;
    const i = this.errors.filter((c) => Date.now() - c.timestamp < 3e5);
    i.length > 5 && (t.push(`最近5分钟内发生了${i.length}个错误`), r -= 20, e.push("检查系统日志并解决频繁出现的错误"));
    const n = i.filter(
      (c) => c.severity === "CRITICAL"
      /* CRITICAL */
    );
    n.length > 0 && (t.push(`发现${n.length}个关键错误`), r -= 30, e.push("立即处理关键错误"));
    const l = Object.entries(this.currentState.componentsStatus).filter(([c, s]) => !s).map(([c, s]) => c);
    return l.length > 0 && (t.push(`${l.length}个组件未正常工作`), r -= l.length * 10, e.push("重新初始化失败的组件")), this.currentState.isDOMReady || (t.push("DOM未就绪"), r -= 15, e.push("等待DOM加载完成")), this.currentState.isOrcaAvailable || (t.push("Orca API不可用"), r -= 25, e.push("检查Orca环境和API可用性")), {
      isHealthy: r >= 70 && n.length === 0,
      score: Math.max(0, r),
      issues: t,
      recommendations: e
    };
  }
  // 错误处理器实现
  async handleThemeLoadingError(t) {
    console.log(`[${this.pluginId}] 处理主题加载错误`);
    try {
      if (this.themeManager)
        return await this.themeManager.switchVariant(this.fallbackConfig.defaultVariant), !0;
    } catch (e) {
      console.error(`[${this.pluginId}] 主题重新加载失败:`, e);
    }
    return !1;
  }
  async handleVariantSwitchError(t) {
    console.log(`[${this.pluginId}] 处理变体切换错误`);
    try {
      if (this.themeManager && this.currentState.lastSuccessfulState)
        return await this.themeManager.switchVariant(this.currentState.lastSuccessfulState.currentVariant), !0;
    } catch (e) {
      console.error(`[${this.pluginId}] 变体回滚失败:`, e);
    }
    return !1;
  }
  async handleDOMOperationError(t) {
    return console.log(`[${this.pluginId}] 处理DOM操作错误`), typeof document < "u" && document.readyState !== "complete" ? new Promise((e) => {
      const r = () => {
        typeof document < "u" && document.removeEventListener && document.removeEventListener("DOMContentLoaded", r), e(!0);
      };
      typeof document < "u" && document.addEventListener ? document.addEventListener("DOMContentLoaded", r) : e(!0);
    }) : !0;
  }
  async handleOrcaAPIError(t) {
    console.log(`[${this.pluginId}] 处理Orca API错误`);
    const e = typeof orca < "u" && !!(orca != null && orca.themes);
    return this.currentState.isOrcaAvailable = e, e;
  }
  async handleSystemIntegrationError(t) {
    console.log(`[${this.pluginId}] 处理系统集成错误`);
    try {
      if (this.systemIntegration)
        return this.systemIntegration.resetErrorState(), !0;
    } catch (e) {
      console.error(`[${this.pluginId}] 系统集成重置失败:`, e);
    }
    return !1;
  }
  async handleComponentUpdateError(t) {
    return console.log(`[${this.pluginId}] 处理组件更新错误`), !1;
  }
  async handleStateValidationError(t) {
    return console.log(`[${this.pluginId}] 处理状态验证错误`), this.validateSystemState();
  }
  // 恢复策略实现
  async recoverFromThemeLoadingFailure() {
    console.log(`[${this.pluginId}] 从主题加载失败中恢复`);
    try {
      if (typeof document < "u" && document.querySelectorAll && document.querySelectorAll(`style[id*="${this.pluginId}"]`).forEach((e) => e.remove()), this.themeManager)
        return await this.themeManager.switchVariant(this.fallbackConfig.defaultVariant), !0;
    } catch (t) {
      console.error(`[${this.pluginId}] 主题加载恢复失败:`, t);
    }
    return !1;
  }
  async recoverFromVariantSwitchFailure() {
    return console.log(`[${this.pluginId}] 从变体切换失败中恢复`), this.recoverFromThemeLoadingFailure();
  }
  async recoverFromDOMOperationFailure() {
    return console.log(`[${this.pluginId}] 从DOM操作失败中恢复`), typeof document < "u" && document.readyState !== "complete" && await new Promise((t) => {
      document.readyState === "complete" ? t(void 0) : typeof document < "u" && document.addEventListener ? document.addEventListener("DOMContentLoaded", () => t(void 0), { once: !0 }) : t(void 0);
    }), !0;
  }
  async recoverFromOrcaAPIFailure() {
    return console.log(`[${this.pluginId}] 从Orca API失败中恢复`), this.currentState.isOrcaAvailable = !1, !0;
  }
  async recoverFromSystemIntegrationFailure() {
    console.log(`[${this.pluginId}] 从系统集成失败中恢复`);
    try {
      return this.systemIntegration && this.systemIntegration.cleanup(), !0;
    } catch (t) {
      return console.error(`[${this.pluginId}] 系统集成恢复失败:`, t), !1;
    }
  }
  async recoverFromComponentUpdateFailure() {
    console.log(`[${this.pluginId}] 从组件更新失败中恢复`);
    try {
      if (this.themeManager)
        return this.themeManager.applyVariant(this.currentState.currentVariant), !0;
    } catch (t) {
      console.error(`[${this.pluginId}] 组件更新恢复失败:`, t);
    }
    return !1;
  }
  /**
   * 获取错误历史
   */
  getErrorHistory() {
    return [...this.errors];
  }
  /**
   * 获取错误数量
   */
  getErrorCount() {
    return this.errors.length;
  }
  /**
   * 清理错误历史
   */
  clearErrorHistory() {
    this.errors = [];
  }
  /**
   * 获取当前系统状态
   */
  getCurrentState() {
    return { ...this.currentState };
  }
  /**
   * 保存当前状态为成功状态
   */
  saveSuccessfulState() {
    this.currentState.lastSuccessfulState = { ...this.currentState };
  }
  /**
   * 清理资源
   */
  cleanup() {
    this.fallbackStyleElement && (this.fallbackStyleElement.remove(), this.fallbackStyleElement = null), this.errorHandlers.clear(), this.recoveryStrategies.clear(), this.errors = [], console.log(`[${this.pluginId}] 错误处理管理器已清理`);
  }
}
function wt(o, t) {
  return new lt(o, t);
}
class Ct {
  // 新增：错误处理管理器
  constructor(t) {
    a(this, "_currentVariant", "night");
    a(this, "_pluginId");
    a(this, "_styleHolders");
    a(this, "_systemPreferenceMediaQuery", null);
    a(this, "_systemPreferenceListener", null);
    a(this, "_autoSwitchEnabled", !1);
    a(this, "_visualHierarchyController", null);
    // 新增：视觉层次控制器
    a(this, "_sidebarStyleManager", null);
    // 新增：侧边栏样式管理器
    a(this, "_animationSystem", null);
    // 新增：动画系统
    a(this, "_uiComponentStyleManager", null);
    // 新增：UI组件样式管理器
    a(this, "_semanticColorManager", null);
    // 新增：语义颜色管理器
    a(this, "_systemIntegrationEnhancer", null);
    // 新增：系统集成增强器
    a(this, "_errorHandlingManager", null);
    this._pluginId = t, this._styleHolders = {
      baseBackground: { el: null },
      sidebar: { el: null },
      settingsModal: { el: null },
      visualHierarchy: { el: null },
      // 新增：视觉层次样式持有者
      animations: { el: null },
      // 新增：动画系统样式持有者
      uiComponents: { el: null },
      // 新增：UI组件样式持有者
      semanticColors: { el: null }
      // 新增：语义颜色样式持有者
    }, this._visualHierarchyController = ot(this._currentVariant, this._pluginId), this._sidebarStyleManager = Q(this._currentVariant, this._pluginId), this._animationSystem = kt(this._pluginId), this._uiComponentStyleManager = it(this._currentVariant, this._pluginId), this._semanticColorManager = $t(this._currentVariant, this._pluginId), this._systemIntegrationEnhancer = Et({
      autoSwitchEnabled: this._autoSwitchEnabled,
      debugLogging: !1
      // 可以根据需要启用调试
    }), this._errorHandlingManager = wt(this._pluginId, {
      defaultVariant: this._currentVariant,
      enableAutoRecovery: !0,
      maxRetryAttempts: 3,
      retryDelay: 1e3,
      enableFallbackStyles: !0
    }), this._errorHandlingManager.registerThemeManager(this), this._errorHandlingManager.registerSystemIntegration(this._systemIntegrationEnhancer), this._systemIntegrationEnhancer.onPreferenceChange(this.handleSystemPreferenceChange.bind(this)), this.initializeSystemPreferenceDetection();
  }
  /**
   * Get the current theme variant
   */
  get currentVariant() {
    return this._currentVariant;
  }
  /**
   * Switch to a different theme variant
   * @param variant - The variant to switch to
   */
  async switchVariant(t) {
    if (!P(t)) {
      const r = new Error(`Invalid theme variant: ${t}. Available variants: ${L().join(", ")}`);
      throw this._errorHandlingManager && await this._errorHandlingManager.reportError({
        type: y.VARIANT_SWITCH_FAILED,
        severity: b.MEDIUM,
        message: r instanceof Error ? r.message : String(r),
        timestamp: Date.now(),
        context: { requestedVariant: t, availableVariants: L() }
      }), r;
    }
    if (this._currentVariant === t)
      return;
    const e = this._currentVariant;
    this._currentVariant = t;
    try {
      this._errorHandlingManager && this._errorHandlingManager.saveSuccessfulState(), this._visualHierarchyController && this._visualHierarchyController.updateVariant(t), this._sidebarStyleManager && this._sidebarStyleManager.updateVariant(t), this._uiComponentStyleManager && this._uiComponentStyleManager.updateVariant(t), this._semanticColorManager && this._semanticColorManager.updateVariant(t), this.applyVariant(t), await this.updateThemeRegistration(t), console.log(`[${this._pluginId}] Successfully switched from ${e} to ${t} variant`);
    } catch (r) {
      this._currentVariant = e, this._errorHandlingManager && await this._errorHandlingManager.reportError({
        type: y.VARIANT_SWITCH_FAILED,
        severity: b.HIGH,
        message: `Failed to switch to variant ${t}: ${r instanceof Error ? r.message : String(r)}`,
        timestamp: Date.now(),
        context: {
          requestedVariant: t,
          previousVariant: e,
          error: r instanceof Error ? r.message : String(r),
          stack: r instanceof Error ? r.stack : void 0
        }
      });
      try {
        this._visualHierarchyController && this._visualHierarchyController.updateVariant(e), this._sidebarStyleManager && this._sidebarStyleManager.updateVariant(e), this._uiComponentStyleManager && this._uiComponentStyleManager.updateVariant(e), this._semanticColorManager && this._semanticColorManager.updateVariant(e);
      } catch (i) {
        console.error(`[${this._pluginId}] Rollback failed:`, i), this._errorHandlingManager && await this._errorHandlingManager.reportError({
          type: y.COMPONENT_UPDATE_FAILED,
          severity: b.CRITICAL,
          message: `Rollback failed: ${i instanceof Error ? i.message : String(i)}`,
          timestamp: Date.now(),
          context: { rollbackError: i instanceof Error ? i.message : String(i) }
        });
      }
      throw console.error(`[${this._pluginId}] Failed to switch to variant ${t}, rolling back to ${e}:`, r), r;
    }
  }
  /**
   * Get colors for a specific variant
   * @param variant - The theme variant
   * @returns The complete color palette for the variant
   */
  getVariantColors(t) {
    return D(t).colors;
  }
  /**
   * Apply a theme variant by updating CSS
   * @param variant - The variant to apply
   */
  applyVariant(t) {
    if (!P(t)) {
      const e = new Error(`Cannot apply invalid variant: ${t}`);
      throw this._errorHandlingManager && this._errorHandlingManager.reportError({
        type: y.THEME_LOADING_FAILED,
        severity: b.HIGH,
        message: e.message,
        timestamp: Date.now(),
        context: { variant: t }
      }), e;
    }
    try {
      const e = at(t, this._pluginId), r = nt(t, this._pluginId), i = st(t);
      if (this.applyStyle(e, !0, this._styleHolders.baseBackground, "tokyo-night-base"), this.applyStyle(r, !0, this._styleHolders.sidebar, "tokyo-night-sidebar"), this.applyStyle(i, !0, this._styleHolders.settingsModal, "tokyo-night-settings"), this._visualHierarchyController && this._visualHierarchyController.apply(), this._sidebarStyleManager && this._sidebarStyleManager.apply(), this._uiComponentStyleManager && this._uiComponentStyleManager.apply(), this._semanticColorManager && this._semanticColorManager.apply(), this._animationSystem) {
        const n = this._animationSystem.generateAnimationCSS(t);
        this.applyStyle(n, !0, this._styleHolders.animations, "tokyo-night-animations");
      }
      console.log(`[${this._pluginId}] Applied ${t} variant styles with visual hierarchy`);
    } catch (e) {
      throw this._errorHandlingManager && this._errorHandlingManager.reportError({
        type: y.THEME_LOADING_FAILED,
        severity: b.HIGH,
        message: `Failed to apply variant ${t}: ${e instanceof Error ? e.message : String(e)}`,
        timestamp: Date.now(),
        context: { variant: t, error: e instanceof Error ? e.message : String(e), stack: e instanceof Error ? e.stack : void 0 }
      }), console.error(`[${this._pluginId}] Failed to apply variant ${t}:`, e), e;
    }
  }
  /**
   * Detect system preference for light/dark mode
   * @returns 'light' or 'dark' based on system preference
   */
  detectSystemPreference() {
    if (this._systemIntegrationEnhancer)
      return this._systemIntegrationEnhancer.detectSystemPreference();
    if (typeof window > "u" || !window.matchMedia)
      return "dark";
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (t) {
      return console.warn(`[${this._pluginId}] Failed to detect system preference:`, t), "dark";
    }
  }
  /**
   * Enable automatic theme switching based on system preferences
   * @param enabled - Whether to enable automatic switching
   */
  setAutoSwitchEnabled(t) {
    this._autoSwitchEnabled = t, this._systemIntegrationEnhancer ? this._systemIntegrationEnhancer.setAutoSwitchEnabled(t) : t ? (this.setupSystemPreferenceListener(), this.applySystemPreference()) : this.removeSystemPreferenceListener();
  }
  /**
   * Get whether auto-switching is enabled
   */
  get autoSwitchEnabled() {
    return this._systemIntegrationEnhancer ? this._systemIntegrationEnhancer.autoSwitchEnabled : this._autoSwitchEnabled;
  }
  /**
   * Register all Tokyo Night variants with Orca
   */
  async registerAllVariants() {
    var r, i;
    if (typeof orca > "u" || !((r = orca == null ? void 0 : orca.themes) != null && r.register)) {
      const n = new Error("Orca themes API not available");
      throw this._errorHandlingManager && await this._errorHandlingManager.reportError({
        type: y.ORCA_API_UNAVAILABLE,
        severity: b.HIGH,
        message: n.message,
        timestamp: Date.now(),
        context: {
          orcaAvailable: typeof orca < "u",
          themesAPIAvailable: !!(orca != null && orca.themes),
          registerMethodAvailable: !!((i = orca == null ? void 0 : orca.themes) != null && i.register)
        }
      }), n;
    }
    const e = L().map(async (n) => {
      const l = D(n), h = `${this._pluginId}-${n}`, c = `dist/theme-${n}.css`;
      try {
        orca.themes.register(h, l.displayName, c), console.log(`[${this._pluginId}] Registered variant: ${l.displayName}`);
      } catch (s) {
        throw this._errorHandlingManager && await this._errorHandlingManager.reportError({
          type: y.ORCA_API_UNAVAILABLE,
          severity: b.MEDIUM,
          message: `Failed to register variant ${n}: ${s instanceof Error ? s.message : String(s)}`,
          timestamp: Date.now(),
          context: { variant: n, themeId: h, cssFile: c, error: s instanceof Error ? s.message : String(s) }
        }), console.error(`[${this._pluginId}] Failed to register variant ${n}:`, s), s;
      }
    });
    await Promise.all(e);
  }
  /**
   * Unregister all Tokyo Night variants from Orca
   */
  async unregisterAllVariants() {
    var r;
    if (typeof orca > "u" || !((r = orca == null ? void 0 : orca.themes) != null && r.unregister)) {
      console.warn(`[${this._pluginId}] Orca themes API not available for unregistration`);
      return;
    }
    const e = L().map(async (i) => {
      const n = D(i);
      try {
        orca.themes.unregister(n.displayName), console.log(`[${this._pluginId}] Unregistered variant: ${n.displayName}`);
      } catch (l) {
        console.warn(`[${this._pluginId}] Failed to unregister variant ${i}:`, l);
      }
    });
    await Promise.all(e);
  }
  /**
   * Clean up resources and remove styles
   */
  cleanup() {
    try {
      this.applyStyle("", !1, this._styleHolders.baseBackground, "tokyo-night-base"), this.applyStyle("", !1, this._styleHolders.sidebar, "tokyo-night-sidebar"), this.applyStyle("", !1, this._styleHolders.settingsModal, "tokyo-night-settings"), this.applyStyle("", !1, this._styleHolders.animations, "tokyo-night-animations"), this.applyStyle("", !1, this._styleHolders.semanticColors, "tokyo-night-semantic-colors"), this._visualHierarchyController && (this._visualHierarchyController.remove(), this._visualHierarchyController = null), this._sidebarStyleManager && (this._sidebarStyleManager.remove(), this._sidebarStyleManager = null), this._uiComponentStyleManager && (this._uiComponentStyleManager.remove(), this._uiComponentStyleManager = null), this._semanticColorManager && (this._semanticColorManager.remove(), this._semanticColorManager = null), this._systemIntegrationEnhancer && (this._systemIntegrationEnhancer.cleanup(), this._systemIntegrationEnhancer = null), this._errorHandlingManager && (this._errorHandlingManager.cleanup(), this._errorHandlingManager = null), this._animationSystem = null, this.removeSystemPreferenceListener(), console.log(`[${this._pluginId}] ThemeVariantManager cleaned up`);
    } catch (t) {
      console.error(`[${this._pluginId}] Error during cleanup:`, t), this._errorHandlingManager && this._errorHandlingManager.reportError({
        type: y.COMPONENT_UPDATE_FAILED,
        severity: b.MEDIUM,
        message: `Cleanup failed: ${t instanceof Error ? t.message : String(t)}`,
        timestamp: Date.now(),
        context: { error: t instanceof Error ? t.message : String(t), stack: t instanceof Error ? t.stack : void 0 }
      });
    }
  }
  /**
   * Get configuration for all available variants
   */
  getAllVariantConfigs() {
    return { ...rt };
  }
  /**
   * Check if a variant is currently applied
   */
  isVariantActive(t) {
    return this._currentVariant === t;
  }
  /**
   * Get the visual hierarchy controller
   * @returns The visual hierarchy controller instance
   */
  getVisualHierarchyController() {
    return this._visualHierarchyController;
  }
  /**
   * Get the sidebar style manager
   * @returns The sidebar style manager instance
   */
  getSidebarStyleManager() {
    return this._sidebarStyleManager;
  }
  /**
   * Get the animation system
   * @returns The animation system instance
   */
  getAnimationSystem() {
    return this._animationSystem;
  }
  /**
   * Get the semantic color manager
   * @returns The semantic color manager instance
   */
  getSemanticColorManager() {
    return this._semanticColorManager;
  }
  /**
   * Get the error handling manager
   * @returns The error handling manager instance
   */
  getErrorHandlingManager() {
    return this._errorHandlingManager;
  }
  /**
   * Get system health status
   * @returns System health information
   */
  getSystemHealth() {
    return this._errorHandlingManager ? this._errorHandlingManager.getSystemHealth() : {
      isHealthy: !1,
      score: 0,
      issues: ["错误处理管理器未初始化"],
      recommendations: ["重新初始化主题管理器"]
    };
  }
  /**
   * Validate system state
   * @returns Whether the system state is valid
   */
  validateSystemState() {
    return this._errorHandlingManager ? this._errorHandlingManager.validateSystemState() : !1;
  }
  /**
   * Validate accessibility for the current variant
   * @returns Accessibility validation results
   */
  validateAccessibility() {
    if (!this._visualHierarchyController)
      throw new Error("Visual hierarchy controller not available");
    return this._visualHierarchyController.validateAccessibility();
  }
  /**
   * Get the current visual hierarchy configuration
   * @returns The hierarchy configuration
   */
  getHierarchyConfig() {
    if (!this._visualHierarchyController)
      throw new Error("Visual hierarchy controller not available");
    return this._visualHierarchyController.getConfig();
  }
  // Private helper methods
  /**
   * Handle system preference change from SystemIntegrationEnhancer
   */
  async handleSystemPreferenceChange(t) {
    if (this._autoSwitchEnabled)
      try {
        const e = t.suggestedVariant;
        this._currentVariant !== e && (await this.switchVariant(e), console.log(`[${this._pluginId}] Auto-switched to ${e} variant based on system preference: ${t.preference}`));
      } catch (e) {
        console.error(`[${this._pluginId}] Failed to auto-switch variant based on system preference:`, e);
      }
  }
  /**
   * Initialize system preference detection
   */
  initializeSystemPreferenceDetection() {
    if (typeof window < "u" && window.matchMedia)
      try {
        this._systemPreferenceMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      } catch (t) {
        console.warn(`[${this._pluginId}] Failed to initialize system preference detection:`, t);
      }
  }
  /**
   * Setup listener for system preference changes
   */
  setupSystemPreferenceListener() {
    if (this._systemPreferenceMediaQuery) {
      this._systemPreferenceListener = (t) => {
        this._autoSwitchEnabled && this.applySystemPreference();
      };
      try {
        this._systemPreferenceMediaQuery.addEventListener("change", this._systemPreferenceListener);
      } catch {
        try {
          this._systemPreferenceMediaQuery.addListener(this._systemPreferenceListener);
        } catch (e) {
          console.warn(`[${this._pluginId}] Failed to setup system preference listener:`, e);
        }
      }
    }
  }
  /**
   * Remove system preference listener
   */
  removeSystemPreferenceListener() {
    if (!(!this._systemPreferenceMediaQuery || !this._systemPreferenceListener)) {
      try {
        this._systemPreferenceMediaQuery.removeEventListener("change", this._systemPreferenceListener);
      } catch {
        try {
          this._systemPreferenceMediaQuery.removeListener(this._systemPreferenceListener);
        } catch (e) {
          console.warn(`[${this._pluginId}] Failed to remove system preference listener:`, e);
        }
      }
      this._systemPreferenceListener = null;
    }
  }
  /**
   * Apply theme based on current system preference
   */
  async applySystemPreference() {
    const t = this.detectSystemPreference();
    let e;
    if (t === "light" ? e = "light" : e = "night", this._currentVariant !== e)
      try {
        await this.switchVariant(e), console.log(`[${this._pluginId}] Auto-switched to ${e} variant based on system preference`);
      } catch (r) {
        console.error(`[${this._pluginId}] Failed to auto-switch to ${e} variant:`, r);
      }
  }
  /**
   * Update theme registration with Orca for the current variant
   */
  async updateThemeRegistration(t) {
    const e = D(t);
    console.log(`[${this._pluginId}] Theme registration updated for variant: ${e.displayName}`);
  }
  /**
   * Apply or remove CSS styles dynamically
   */
  applyStyle(t, e, r, i) {
    try {
      e && t.trim() ? (r.el || (r.el = document.createElement("style"), r.el.id = `${this._pluginId}-${i}`, document.head.appendChild(r.el)), r.el.textContent = t) : r.el && (r.el.remove(), r.el = null);
    } catch (n) {
      throw this._errorHandlingManager && this._errorHandlingManager.reportError({
        type: y.DOM_OPERATION_FAILED,
        severity: b.MEDIUM,
        message: `Failed to apply style ${i}: ${n instanceof Error ? n.message : String(n)}`,
        timestamp: Date.now(),
        context: {
          styleId: i,
          enabled: e,
          hasContent: !!t.trim(),
          error: n instanceof Error ? n.message : String(n),
          stack: n instanceof Error ? n.stack : void 0
        }
      }), console.error(`[${this._pluginId}] Failed to apply style ${i}:`, n), n;
    }
  }
}
function ht(o) {
  return new Ct(o);
}
class xt {
  constructor(t) {
    a(this, "themeVariantManager");
    a(this, "visualHierarchyController", null);
    a(this, "sidebarStyleManager", null);
    a(this, "typographySystem", null);
    a(this, "animationSystem", null);
    a(this, "uiComponentManager", null);
    a(this, "semanticColorManager", null);
    a(this, "systemIntegrationEnhancer", null);
    a(this, "errorHandlingManager", null);
    a(this, "config");
    a(this, "initialized", !1);
    this.config = t, this.themeVariantManager = ht(t.pluginId), t.initialVariant && t.initialVariant !== this.themeVariantManager.currentVariant && this.themeVariantManager.switchVariant(t.initialVariant).catch((e) => {
      console.warn(`Failed to switch to initial variant ${t.initialVariant}:`, e);
    }), this.initializeComponents();
  }
  /**
   * 初始化所有组件
   */
  initializeComponents() {
    try {
      const t = this.themeVariantManager.currentVariant;
      try {
        this.visualHierarchyController = new R(t, this.config.pluginId);
      } catch (r) {
        console.warn(`[${this.config.pluginId}] VisualHierarchyController 初始化失败:`, r), this.visualHierarchyController = null;
      }
      try {
        this.sidebarStyleManager = new z(t, this.config.pluginId);
      } catch (r) {
        console.warn(`[${this.config.pluginId}] SidebarStyleManager 初始化失败:`, r), this.sidebarStyleManager = null;
      }
      try {
        this.typographySystem = new U(t, this.config.pluginId);
      } catch (r) {
        console.warn(`[${this.config.pluginId}] TypographySystem 初始化失败:`, r), this.typographySystem = null;
      }
      try {
        this.animationSystem = new G(this.config.pluginId);
      } catch (r) {
        console.warn(`[${this.config.pluginId}] AnimationSystem 初始化失败:`, r), this.animationSystem = null;
      }
      try {
        this.uiComponentManager = new B(t, this.config.pluginId);
      } catch (r) {
        console.warn(`[${this.config.pluginId}] UIComponentStyleManager 初始化失败:`, r), this.uiComponentManager = null;
      }
      try {
        this.semanticColorManager = new Y(t, this.config.pluginId);
      } catch (r) {
        console.warn(`[${this.config.pluginId}] SemanticColorManager 初始化失败:`, r), this.semanticColorManager = null;
      }
      try {
        this.systemIntegrationEnhancer = new ct({
          debugLogging: this.config.debugLogging || !1,
          autoSwitchEnabled: this.config.autoSwitchEnabled || !1
        });
      } catch (r) {
        console.warn(`[${this.config.pluginId}] SystemIntegrationEnhancer 初始化失败:`, r), this.systemIntegrationEnhancer = null;
      }
      try {
        this.errorHandlingManager = new lt(this.config.pluginId);
      } catch (r) {
        console.warn(`[${this.config.pluginId}] ErrorHandlingManager 初始化失败:`, r), this.errorHandlingManager = null;
      }
      const e = [
        this.visualHierarchyController,
        this.sidebarStyleManager,
        this.typographySystem,
        this.semanticColorManager
      ].filter((r) => r !== null).length;
      this.initialized = e >= 2, this.config.debugLogging && console.log(`[${this.config.pluginId}] 主题系统组件初始化完成，成功初始化 ${e}/4 个核心组件`);
    } catch (t) {
      console.error(`[${this.config.pluginId}] 主题系统组件初始化失败:`, t), this.initialized = !1;
    }
  }
  /**
   * 切换主题变体并更新所有组件
   */
  async switchVariant(t) {
    if (!P(t))
      throw new Error(`Invalid theme variant: ${t}`);
    try {
      await this.themeVariantManager.switchVariant(t), this.visualHierarchyController && (this.visualHierarchyController.remove(), this.visualHierarchyController = new R(t, this.config.pluginId)), this.sidebarStyleManager && (this.sidebarStyleManager.remove(), this.sidebarStyleManager = new z(t, this.config.pluginId)), this.typographySystem && (this.typographySystem.remove(), this.typographySystem = new U(t, this.config.pluginId)), this.animationSystem && (this.animationSystem.remove(), this.animationSystem = new G(this.config.pluginId)), this.uiComponentManager && (this.uiComponentManager.remove(), this.uiComponentManager = new B(t, this.config.pluginId)), this.semanticColorManager && (this.semanticColorManager.remove(), this.semanticColorManager = new Y(t, this.config.pluginId)), this.config.debugLogging && console.log(`[${this.config.pluginId}] 主题变体已切换到: ${t}`);
    } catch (e) {
      throw console.error(`[${this.config.pluginId}] 切换主题变体失败:`, e), e;
    }
  }
  /**
   * 获取当前主题变体
   */
  getCurrentVariant() {
    return this.themeVariantManager.currentVariant;
  }
  /**
   * 获取系统状态
   */
  getSystemState() {
    var t, e, r;
    return {
      currentVariant: this.themeVariantManager.currentVariant,
      autoSwitchEnabled: ((t = this.systemIntegrationEnhancer) == null ? void 0 : t.autoSwitchEnabled) || !1,
      systemPreference: ((e = this.systemIntegrationEnhancer) == null ? void 0 : e.detectSystemPreference()) || "dark",
      componentsInitialized: this.initialized && this.checkComponentsStatus(),
      errorCount: ((r = this.errorHandlingManager) == null ? void 0 : r.getErrorCount()) || 0,
      lastUpdated: /* @__PURE__ */ new Date()
    };
  }
  /**
   * 检查组件状态
   */
  checkComponentsStatus() {
    return [
      this.visualHierarchyController,
      this.sidebarStyleManager,
      this.typographySystem,
      this.semanticColorManager
    ].filter((r) => r !== null).length >= 2 && !!this.themeVariantManager;
  }
  /**
   * 验证系统一致性
   */
  validateSystemConsistency() {
    const t = [], e = [];
    let r = !0, i = !0, n = !0, l = !0;
    try {
      const h = this.themeVariantManager.currentVariant;
      P(h) || (r = !1, t.push(`Invalid current variant: ${h}`));
      const c = g(h);
      if ((!c || !c.background || !c.text || !c.semantic || !c.ui) && (i = !1, t.push(`Incomplete color configuration for variant: ${h}`)), this.visualHierarchyController)
        try {
          const s = this.visualHierarchyController.getConfig();
          (!s || !s.editor || !s.sidebar) && (n = !1, t.push("Visual hierarchy configuration is incomplete"));
        } catch (s) {
          n = !1, t.push(`Visual hierarchy validation failed: ${s instanceof Error ? s.message : String(s)}`);
        }
      else
        e.push("Visual hierarchy controller not initialized");
      if (this.systemIntegrationEnhancer)
        try {
          const s = this.systemIntegrationEnhancer.validateSystemIntegration();
          s.preferenceDetectionWorking || (l = !1, t.push("System preference detection is not working")), s.lastError && e.push(`System integration warning: ${s.lastError}`);
        } catch (s) {
          l = !1, t.push(`System integration validation failed: ${s instanceof Error ? s.message : String(s)}`);
        }
      else
        e.push("System integration enhancer not initialized");
      this.initialized || e.push("Theme system not fully initialized");
    } catch (h) {
      t.push(`System validation error: ${h instanceof Error ? h.message : String(h)}`), r = !1, i = !1, n = !1, l = !1;
    }
    return {
      variantConsistency: r,
      colorConsistency: i,
      styleConsistency: n,
      integrationConsistency: l,
      errors: t,
      warnings: e
    };
  }
  /**
   * 设置自动切换
   */
  setAutoSwitchEnabled(t) {
    this.systemIntegrationEnhancer && this.systemIntegrationEnhancer.setAutoSwitchEnabled(t);
  }
  /**
   * 检测系统偏好
   */
  detectSystemPreference() {
    return this.systemIntegrationEnhancer ? this.systemIntegrationEnhancer.detectSystemPreference() : this.themeVariantManager.detectSystemPreference();
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
  isVariantActive(t) {
    return this.themeVariantManager.isVariantActive(t);
  }
  /**
   * 获取变体颜色
   */
  getVariantColors(t) {
    return this.themeVariantManager.getVariantColors(t);
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
  cleanup() {
    var t, e, r, i, n, l, h, c;
    try {
      (t = this.visualHierarchyController) == null || t.remove(), (e = this.sidebarStyleManager) == null || e.remove(), (r = this.typographySystem) == null || r.remove(), (i = this.animationSystem) == null || i.remove(), (n = this.uiComponentManager) == null || n.remove(), (l = this.semanticColorManager) == null || l.remove(), (h = this.systemIntegrationEnhancer) == null || h.cleanup(), (c = this.errorHandlingManager) == null || c.cleanup(), this.visualHierarchyController = null, this.sidebarStyleManager = null, this.typographySystem = null, this.animationSystem = null, this.uiComponentManager = null, this.semanticColorManager = null, this.systemIntegrationEnhancer = null, this.errorHandlingManager = null, this.initialized = !1, this.config.debugLogging && console.log(`[${this.config.pluginId}] 主题系统已清理`);
    } catch (s) {
      console.error(`[${this.config.pluginId}] 清理主题系统时出错:`, s);
    }
  }
  /**
   * 重新初始化系统
   */
  reinitialize() {
    this.cleanup(), this.initializeComponents();
  }
  /**
   * 获取系统健康状态
   */
  getHealthStatus() {
    const t = this.validateSystemConsistency(), e = this.getSystemState(), r = [...t.errors], i = [];
    return e.componentsInitialized || (r.push("Components not fully initialized"), i.push("Try reinitializing the theme system")), e.errorCount > 0 && (r.push(`${e.errorCount} errors detected`), i.push("Check error logs and consider system restart")), t.warnings.length > 0 && i.push(...t.warnings.map((l) => `Warning: ${l}`)), {
      healthy: r.length === 0 && t.variantConsistency && t.colorConsistency && t.styleConsistency && t.integrationConsistency,
      issues: r,
      recommendations: i
    };
  }
}
function It(o) {
  return new xt(o);
}
let d, m = null, p = null;
const H = "Tokyo Night", Mt = "dist/theme.css", x = "enableTokyoNightBaseBackground", I = "enableTokyoNightSidebarColor", v = "tokyoNightThemeVariant", S = "tokyoNightAutoSwitchSystem", V = {
  baseBackground: { el: null },
  // 用于基础背景和大部分UI元素的样式
  sidebar: { el: null },
  // 用于侧边栏特定样式的元素
  settingsModal: { el: null }
  // 用于设置模态框特定样式的元素
};
function T(o, t, e, r) {
  const i = `${d}-style-${r}`;
  if (t) {
    if (!e.el || !document.head || !document.head.contains(e.el)) {
      const n = document.getElementById(i);
      if (n)
        try {
          n.remove();
        } catch {
        }
      try {
        document && document.head ? (e.el = document.createElement("style"), e.el.id = i, e.el.textContent = o, document.head.appendChild(e.el)) : e.el = null;
      } catch {
        e.el = null;
      }
    } else if (e.el.textContent !== o)
      try {
        e.el.textContent = o;
      } catch {
      }
  } else {
    if (e.el && document.head && document.head.contains(e.el))
      try {
        e.el.remove();
      } catch {
      }
    else {
      const n = document.getElementById(i);
      if (n)
        try {
          n.remove();
        } catch {
        }
    }
    e.el = null;
  }
}
const f = {
  [x]: !0,
  // 默认启用基础背景
  [I]: !0,
  // 默认启用侧边栏颜色
  [v]: "night",
  // 默认使用 Night 变体
  [S]: !1
  // 默认不自动切换
};
async function dt(o) {
  var t, e;
  if (p) {
    const r = (e = (t = orca == null ? void 0 : orca.state) == null ? void 0 : t.plugins) == null ? void 0 : e[d];
    if (!r) {
      console.warn(`[${d}] 插件状态对象不可用，无法更新样式。`);
      return;
    }
    const i = r.settings || {}, n = (c, s) => {
      const u = i[c];
      return u !== void 0 ? u : s;
    }, l = n(v, f[v]), h = n(S, f[S]);
    try {
      p.getCurrentVariant() !== l && await p.switchVariant(l), p.setAutoSwitchEnabled(h);
      const c = p.validateSystemConsistency();
      c.errors.length > 0 && console.warn(`[${d}] 系统一致性验证发现问题:`, c.errors);
      const s = p.getHealthStatus();
      s.healthy || (console.warn(`[${d}] 系统健康检查发现问题:`, s.issues), s.recommendations.length > 0 && console.info(`[${d}] 建议:`, s.recommendations)), console.log(`[${d}] 主题系统已更新。变体: ${p.getCurrentVariant()}, 自动切换: ${h}`);
    } catch (c) {
      console.error(`[${d}] 使用 ThemeSystemIntegrator 更新主题时出错:`, c), m && (console.log(`[${d}] 回退到 ThemeVariantManager 实现`), await j());
    }
    return;
  }
  m ? await j() : console.warn(`[${d}] 主题管理器未初始化，无法更新样式。`);
}
async function j(o) {
  var c, s;
  if (!m) {
    console.warn(`[${d}] ThemeVariantManager 未初始化，无法更新样式。`);
    return;
  }
  const t = (s = (c = orca == null ? void 0 : orca.state) == null ? void 0 : c.plugins) == null ? void 0 : s[d];
  if (!t) {
    console.warn(`[${d}] 插件状态对象不可用，无法更新样式。`);
    return;
  }
  const e = t.settings || {}, r = (u, C) => {
    const k = e[u];
    return k !== void 0 ? k : C;
  }, i = r(x, f[x]), n = r(I, f[I]), l = r(v, f[v]), h = r(S, f[S]);
  try {
    m.currentVariant !== l && await m.switchVariant(l), m.setAutoSwitchEnabled(h), (i || n) && m.applyVariant(m.currentVariant);
    try {
      const u = m.validateAccessibility();
      u.meetsWCAG || console.warn(`[${d}] 可访问性警告:`, u);
    } catch (u) {
      console.warn(`[${d}] 可访问性验证失败:`, u);
    }
  } catch (u) {
    console.error(`[${d}] 更新主题变体时出错:`, u);
  }
  T(at(m.currentVariant, d), i, V.baseBackground, "base-bg"), T(st(m.currentVariant), i, V.settingsModal, "settings-modal"), T(nt(m.currentVariant), n, V.sidebar, "sidebar-color"), console.log(`[${d}] 样式已更新（传统模式）。变体: ${m.currentVariant}, 背景/模态框启用: ${i}, 侧边栏颜色启用: ${n}, 自动切换: ${h}`);
}
let O = null, M = null;
async function Vt(o) {
  var l, h, c, s, u, C, k, N;
  d = o, m = ht(d), p = It({
    pluginId: d,
    debugLogging: !1,
    // 可以根据需要启用调试
    autoSwitchEnabled: !1,
    // 将根据用户设置动态更新
    initialVariant: "night"
  }), console.log(`[${d}] ThemeSystemIntegrator 已初始化，完整主题系统已就绪`);
  const e = {
    en: {
      // 英文翻译
      [x]: "Enable Tokyo Night Base Background",
      "Sets the main application background to the classic Tokyo Night dark color.": "Sets the main application background to the classic Tokyo Night dark color.",
      [I]: "Enable Tokyo Night Sidebar Color",
      "Sets the sidebar background to a custom Tokyo Night color (#16161F).": "Sets the sidebar background to a custom Tokyo Night color (#16161F).",
      [v]: "Tokyo Night Theme Variant",
      "Choose between Night (darkest), Storm (medium dark), or Light variant.": "Choose between Night (darkest), Storm (medium dark), or Light variant.",
      [S]: "Auto-switch with System Theme",
      "Automatically switch between light and dark variants based on system preferences.": "Automatically switch between light and dark variants based on system preferences."
    },
    "zh-CN": yt
    // 中文翻译 (从 ./translations/zhCN.ts 导入)
  };
  pt(((l = orca == null ? void 0 : orca.state) == null ? void 0 : l.locale) || "en", e), (h = orca == null ? void 0 : orca.state) != null && h.locale;
  try {
    (c = orca == null ? void 0 : orca.plugins) != null && c.setSettingsSchema && await orca.plugins.setSettingsSchema(d, {
      [x]: {
        label: w(x),
        // 使用 t 函数获取国际化标签
        description: w("Sets the main application background to the classic Tokyo Night dark color."),
        type: "boolean",
        // 设置项类型为布尔值 (开关)
        defaultValue: f[x]
        // 默认值
      },
      [I]: {
        label: w(I),
        description: w("Sets the sidebar background to a custom Tokyo Night color (#16161F)."),
        type: "boolean",
        defaultValue: f[I]
      },
      [v]: {
        label: w(v),
        description: w("Choose between Night (darkest), Storm (medium dark), or Light variant."),
        type: "singleChoice",
        choices: [
          { value: "night", label: "Tokyo Night (Darkest)" },
          { value: "storm", label: "Tokyo Night Storm (Medium Dark)" },
          { value: "light", label: "Tokyo Night Light" }
        ],
        defaultValue: f[v]
      },
      [S]: {
        label: w(S),
        description: w("Automatically switch between light and dark variants based on system preferences."),
        type: "boolean",
        defaultValue: f[S]
      }
    });
  } catch {
  }
  try {
    (s = orca == null ? void 0 : orca.themes) != null && s.register && (orca.themes.register(d, H, Mt), await m.registerAllVariants());
  } catch {
  }
  const r = (C = (u = orca == null ? void 0 : orca.state) == null ? void 0 : u.plugins) == null ? void 0 : C[d];
  typeof ((k = window.Valtio) == null ? void 0 : k.subscribe) == "function" && (r != null && r.settings) && (O = window.Valtio.subscribe(
    r.settings,
    // 订阅当前插件的 settings 对象
    () => {
      dt();
    }
  ));
  const i = 11, n = `${d}_isActive`;
  window[n] = !1, M = ($) => {
    const E = orca == null ? void 0 : orca.state;
    if (!E)
      return;
    const F = E.settings;
    if (typeof F > "u" || F === null)
      return;
    let _ = !1;
    if (typeof $ == "string" && $.length > 0)
      _ = $ === H;
    else {
      const K = F[i];
      typeof K == "string" ? _ = K === H : _ = !1;
    }
    const W = window[n];
    _ && !W ? _t() : !_ && W && mt(), window[n] = _;
  }, (N = orca == null ? void 0 : orca.broadcasts) != null && N.registerHandler && orca.broadcasts.registerHandler("core.themeChanged", M), M && M();
}
async function Tt() {
  var o, t;
  if (d) {
    p && (p.cleanup(), p = null, console.log(`[${d}] ThemeSystemIntegrator 已清理`)), m && (m.cleanup(), await m.unregisterAllVariants(), m = null), mt(), O && (O(), O = null), (o = orca == null ? void 0 : orca.broadcasts) != null && o.unregisterHandler && M && (orca.broadcasts.unregisterHandler("core.themeChanged", M), M = null), delete window[`${d}_isActive`];
    try {
      (t = orca == null ? void 0 : orca.themes) != null && t.unregister && orca.themes.unregister(H);
    } catch {
    }
  }
}
async function _t() {
  await dt();
}
function mt() {
  if (p) {
    p.cleanup();
    return;
  }
  m && m.cleanup(), T("", !1, V.baseBackground, "base-bg"), T("", !1, V.sidebar, "sidebar-color"), T("", !1, V.settingsModal, "settings-modal");
}
export {
  Vt as load,
  Tt as unload
};
