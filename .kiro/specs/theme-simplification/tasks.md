# 实现计划：Tokyo Night 主题简化重构

## 概述

将 Tokyo Night 主题从复杂的 JavaScript 动态样式注入架构重构为官方推荐的纯静态 CSS 架构。

## 任务列表

- [x] 1. 创建静态 CSS 主题文件
  - [x] 1.1 将 `public/theme.css` 重命名为 `public/tokyo-night.css`
    - 重命名文件以匹配主题名称
    - _需求: 3.4_
  - [x] 1.2 将 `main.ts` 中的所有 CSS 字符串整合到 `tokyo-night.css`
    - 整合 `tokyoNightBaseBackgroundCssString` 的内容
    - 整合 `tokyoNightSidebarCssString` 的内容
    - 整合 `tokyoNightSettingsModalCssString` 的内容
    - 确保所有 Tokyo Night 颜色变量在 `:root` 中定义
    - _需求: 1.1, 1.2, 1.3, 4.1-4.7_

- [x] 2. 简化插件入口文件
  - [x] 2.1 重写 `src/main.ts` 为简化版本
    - 移除所有 CSS 字符串常量
    - 移除设置项相关代码（`setSettingsSchema`、设置键常量）
    - 移除 Valtio 状态订阅逻辑
    - 移除主题激活/停用事件处理
    - 移除 `applyStyle`、`styleHolders` 等动态样式注入逻辑
    - 保留简单的 `load()` 和 `unload()` 函数
    - 使用 `orca.themes.register()` 注册主题
    - 使用 `orca.themes.unregister()` 注销主题
    - _需求: 2.1-2.6_

- [x] 3. 清理不再需要的文件
  - [x] 3.1 删除 `src/translations/` 目录
    - 删除 `src/translations/zhCN.ts`
    - _需求: 3.1_
  - [x] 3.2 删除 `src/libs/` 目录
    - 删除 `src/libs/l10n.ts`
    - _需求: 3.2_
  - [x] 3.3 删除 `src/css/` 空目录
    - _需求: 3.3_

- [x] 4. 验证和测试
  - [x] 4.1 构建项目并验证输出
    - 运行 `npm run build`
    - 确认 `dist/index.js` 生成成功
    - 确认代码大小显著减少
  - [x] 4.2 检查点 - 确保构建成功，如有问题请询问用户

## 注意事项

- 所有样式应通过覆盖 Orca CSS 变量实现，避免过多使用 `!important`
- 参考官方主题的 CSS 结构和命名规范
- 确保重构后主题视觉效果与之前一致
