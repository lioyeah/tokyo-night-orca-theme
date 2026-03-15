# Tokyo Night 主题 for Orca Notes

适用于 [Orca Notes](https://orca.sh/) 的 Tokyo Night 双模主题，支持 Light / Dark 自动切换。

## 功能特性

- Tokyo Night Light + Dark 自动切换（跟随系统或 Orca 亮暗模式）
- 全局 UI 覆盖：侧边栏、弹层、设置页、主编辑区
- 查询条件框动态霓虹效果与多光源流动背景
- 行内代码 keycap 质感与按压交互反馈
- 构建流程内置 `postbuild`，自动同步 `dist/tokyo-night.css`

## 安装

1. 前往 [Releases](https://github.com/lioyeah/tokyo-night-orca-theme/releases) 下载最新发行包。
2. 解压后将插件目录放入 Orca Notes 插件目录：
   - Windows: `C:\Users\<用户名>\AppData\Roaming\Orca\plugins`
   - macOS: `/Users/<用户名>/Library/Application Support/Orca/plugins`
   - Linux: `~/.config/Orca/plugins`
3. 重启 Orca Notes，在 `设置 -> 外观 -> 主题` 选择 `Tokyo Night`。

## 开发与构建

```bash
npm install
npm run dev
npm run build
```

构建后产物位于 `dist/`，并会自动同步 `dist/tokyo-night.css`。

## 许可证

[MIT](LICENSE)
