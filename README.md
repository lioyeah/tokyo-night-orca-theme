# Tokyo Night 主题 for Orca Notes

一款适用于 [Orca Notes](https://orca.sh/) 的精致 Tokyo Night 暗色主题，旨在提供舒适的视觉体验并提升笔记的专注度。

[![GitHub Stars](https://img.shields.io/github/stars/lioyeah/tokyo-night-orca-theme?style=social)](https://github.com/lioyeah/tokyo-night-orca-theme/stargazers)

## ✨ 功能特性

* **经典的 Tokyo Night 配色**：精心调校的颜色方案，带来标志性的视觉感受。
    * 主背景：`#1a1b26` (Night)
    * 次背景/UI 元素：`#24283b` (Storm), `#1f2335` (Float)
    * 主要文字：`#a9b1d6`
    * 高亮/强调文字：`#c0caf5`
    * 注释/次要文字：`#565f89`
    * 强调色 (蓝)：`#7aa2f7`
    * 以及更多符合 Tokyo Night 规范的颜色应用于各种 UI 组件。
* **全面的 UI 覆盖**：
    * 应用整体背景和文字颜色。
    * 自定义侧边栏样式。
    * 美化设置界面，包括输入框、按钮、开关、标签页、表格等。
    * 调整主界面元素，如查询构建器、占位符文本、标签页、图标按钮等。
* **动态样式**：通过 CSS 自定义属性（变量）实现，确保颜色应用的一致性和可维护性。
* **可配置选项**：
    * 开关：是否启用主题的基础背景和大部分 UI 元素样式。
    * 开关：是否启用自定义的侧边栏颜色。
* **国际化支持**：设置选项的标签和描述支持中英文。

## 📦 安装

### 手动安装

1.  前往本项目的 [GitHub Releases 页面](https://github.com/lioyeah/tokyo-night-orca-theme/releases)。
    2.  下载最新的 `tokyo-night-orca-theme.zip` (或类似名称的) 发行包。
3.  解压下载的文件，您会得到一个名为 `tokyo-night-orca-theme` (或其他插件 ID 对应的名称) 的文件夹。
4.  找到您的 Orca Notes 插件目录。通常位于：
    * Windows: `C:\Users\<您的用户名>\AppData\Roaming\Orca\plugins`
    * macOS: `/Users/<您的用户名>/Library/Application Support/Orca/plugins`
    * Linux: `~/.config/Orca/plugins`
5.  将解压得到的 `tokyo-night-orca-theme` 文件夹完整复制到 Orca Notes 的 `plugins` 目录下。
6.  重启 Orca Notes。

## 🚀 使用方法

1.  安装并启用插件后，进入 Orca Notes 的 `设置` > `外观`。
2.  在 `主题` 下拉菜单中，选择 `Tokyo Night`。
3.  主题将立即应用。

## ⚙️ 配置选项

您可以在 Orca Notes 的 `设置` > `插件` > `Tokyo Night Theme` 中找到以下配置选项：

* **启用 Tokyo Night 基础背景和 UI 样式**:
    * 默认：开启
    * 作用：控制是否应用主题的核心背景色以及大部分 UI 元素的 Tokyo Night 风格（包括设置界面、查询构建器等）。如果关闭，主题将主要依赖 `theme.css` 中的静态样式（如果存在）。
* **启用 Tokyo Night 侧边栏颜色**:
    * 默认：开启
    * 作用：控制是否应用自定义的 Tokyo Night 风格侧边栏背景色和项目颜色。如果关闭，侧边栏将尝试继承基础背景或 Orca 的默认样式。

## 🛠️ 开发与构建

如果您想为此主题贡献代码或自行构建：

1.  **克隆仓库**:
    ```bash
    git clone [https://github.com/lioyeah/tokyo-night-orca-theme.git](https://github.com/lioyeah/tokyo-night-orca-theme.git)
    cd tokyo-night-orca-theme
    ```
    2.  **安装依赖**:
    ```bash
    npm install
    # 或者
    # yarn install
    ```

3.  **开发模式**:
    ```bash
    npm run dev
    # 或者
    # yarn dev
    ```
    这将启动 Vite 的开发服务器。您可能需要将构建目标（通常是 `dist/` 目录下的 `index.js` 和 `theme.css`）链接或复制到您的 Orca Notes 插件目录中，以便在 Orca Notes 中实时查看更改。

4.  **构建插件**:
    ```bash
    npm run build
    # 或者
    # yarn build
    ```
    构建产物将输出到 `dist/` 文件夹。您需要将 `dist/index.js` (插件主逻辑)、`theme.css` (静态样式，如果使用) 和 `icon.png` 一起打包到插件文件夹中。

    最终用于 Orca 的插件文件夹结构应类似于：
    ```
    tokyo-night-orca-theme/  (或者您的插件 ID 命名的文件夹)
    ├── index.js             (来自 dist/)
    ├── theme.css            (如果您的主题有静态CSS部分)
    └── icon.png
    ```

## 🤝 贡献

欢迎各种形式的贡献！如果您有任何建议、发现错误或希望添加新功能，请随时：

* 提交 [Issues](https://github.com/liyoeah/tokyo-night-orca-theme/issues)
* 创建 [Pull Requests](https://github.com/lioyeah/tokyo-night-orca-theme/pulls)
## 📜 许可证

本项目采用 [MIT](LICENSE) 许可证。
---

希望这款 Tokyo Night 主题能为您在 Orca Notes 中的使用带来愉悦！

