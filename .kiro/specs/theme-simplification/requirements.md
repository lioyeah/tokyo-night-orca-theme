# Requirements Document

## Introduction

重构 Tokyo Night 主题插件，采用官方主题的实现模式。将所有样式从 JavaScript 动态注入改为纯静态 CSS 文件，移除设置项和复杂的状态管理逻辑，使代码更简洁、高效且符合官方风格。

## Glossary

- **Theme_Plugin**: Tokyo Night 主题插件，为 Orca Notes 提供 Tokyo Night 配色方案
- **Static_CSS**: 存放在 `public/` 目录下的静态 CSS 文件，通过 `orca.themes.register()` 注册
- **Orca_Variables**: Orca Notes 定义的 CSS 自定义属性（如 `--orca-color-bg-1`），主题通过覆盖这些变量实现配色

## Requirements

### Requirement 1: 重构为纯静态 CSS 架构

**User Story:** As a theme developer, I want to move all styles to a static CSS file, so that the theme follows the official implementation pattern and is easier to maintain.

#### Acceptance Criteria

1. THE Theme_Plugin SHALL create a new `public/tokyo-night.css` file containing all theme styles
2. THE Theme_Plugin SHALL define Tokyo Night color palette as CSS custom properties in `:root`
3. THE Theme_Plugin SHALL override Orca CSS variables (e.g., `--orca-color-bg-1`, `--orca-color-text-1`) to apply the theme
4. THE Theme_Plugin SHALL remove all CSS string constants from `main.ts` (e.g., `tokyoNightBaseBackgroundCssString`, `tokyoNightSidebarCssString`, `tokyoNightSettingsModalCssString`)

### Requirement 2: 简化插件入口代码

**User Story:** As a theme developer, I want to simplify the main.ts file, so that it only handles theme registration and follows the official pattern.

#### Acceptance Criteria

1. THE Theme_Plugin SHALL reduce `main.ts` to only contain `load()` and `unload()` functions
2. WHEN the Theme_Plugin loads, THE Theme_Plugin SHALL call `orca.themes.register()` with the theme name and CSS file path
3. WHEN the Theme_Plugin unloads, THE Theme_Plugin SHALL call `orca.themes.unregister()` to clean up
4. THE Theme_Plugin SHALL remove all dynamic style injection logic (`applyStyle`, `styleHolders`, etc.)
5. THE Theme_Plugin SHALL remove all settings-related code (`setSettingsSchema`, Valtio subscriptions, setting constants)
6. THE Theme_Plugin SHALL remove theme activation/deactivation event handling (`themeChangedHandlerRef`, `enableThemeFeatures`, `disableThemeFeatures`)

### Requirement 3: 清理不再需要的文件和依赖

**User Story:** As a theme developer, I want to remove unused code and files, so that the project remains clean and lightweight.

#### Acceptance Criteria

1. THE Theme_Plugin SHALL remove the `src/translations/` directory (no longer needed without settings)
2. THE Theme_Plugin SHALL remove the `src/libs/` directory (no longer needed without settings)
3. THE Theme_Plugin SHALL remove the `src/css/` directory (empty directory)
4. THE Theme_Plugin SHALL rename `public/theme.css` to `public/tokyo-night.css` to match the theme name
5. THE Theme_Plugin SHALL keep only essential files in `src/`: `main.ts`, `orca.d.ts`, `vite-env.d.ts`

### Requirement 4: 保持主题视觉效果

**User Story:** As a user, I want the theme to look the same after refactoring, so that my visual experience is not affected.

#### Acceptance Criteria

1. THE Static_CSS SHALL preserve all Tokyo Night color definitions (background, text, accent colors)
2. THE Static_CSS SHALL preserve sidebar styling
3. THE Static_CSS SHALL preserve settings modal styling
4. THE Static_CSS SHALL preserve heading colors (H1-H6)
5. THE Static_CSS SHALL preserve list marker colors
6. THE Static_CSS SHALL preserve code block and inline code styling
7. THE Static_CSS SHALL preserve button, input, and other UI component styling
