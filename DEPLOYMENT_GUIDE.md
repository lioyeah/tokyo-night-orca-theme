# 🚀 Tokyo Night 主题部署指南

## 📋 部署选项

### 选项 1: 本地演示（快速预览）

1. **打开演示页面**
   ```bash
   # 在项目根目录下，直接用浏览器打开
   open demo.html  # macOS
   start demo.html # Windows
   ```

2. **功能特性**
   - 三个主题变体切换（Night/Storm/Light）
   - 完整的 UI 组件展示
   - 颜色调色板预览
   - 实时主题切换效果

### 选项 2: Orca Notes 插件安装

#### 方法 A: 本地开发安装

1. **复制插件文件**
   ```bash
   # 将构建后的文件复制到 Orca 插件目录
   cp -r dist/ ~/.orca/plugins/tokyo-night-theme/
   cp package.json ~/.orca/plugins/tokyo-night-theme/
   ```

2. **在 Orca 中启用**
   - 打开 Orca Notes
   - 进入设置 → 插件
   - 找到 "Tokyo Night Theme" 并启用

#### 方法 B: 开发模式链接

1. **创建符号链接**
   ```bash
   # 在 Orca 插件目录中创建链接
   ln -s /path/to/tokyo-night-orca-theme ~/.orca/plugins/tokyo-night-theme
   ```

2. **重启 Orca Notes** 以加载插件

### 选项 3: 发布到插件市场

1. **准备发布包**
   ```bash
   npm run build
   npm pack
   ```

2. **上传到 Orca 插件市场**
   - 登录 Orca 开发者控制台
   - 上传 `.tgz` 文件
   - 填写插件信息和描述

## 🎯 使用指南

### 主题切换

在 Orca Notes 中安装后：

1. **手动切换**
   - 设置 → 外观 → 主题
   - 选择 "Tokyo Night"、"Tokyo Night Storm" 或 "Tokyo Night Light"

2. **自动切换**
   - 主题会根据系统深色/浅色模式自动切换
   - Night/Storm 用于深色模式
   - Light 用于浅色模式

### 自定义配置

主题支持以下配置选项：

```javascript
// 在 Orca 插件设置中
{
  "variant": "night",           // 默认变体
  "autoSwitch": true,          // 自动跟随系统主题
  "sidebarOpacity": 0.85,      // 侧边栏透明度
  "animationSpeed": "normal",   // 动画速度
  "customColors": {            // 自定义颜色（可选）
    "accent": "#7aa2f7"
  }
}
```

## 🔧 开发和调试

### 本地开发

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **实时预览**
   - 修改代码后自动重新构建
   - 在 demo.html 中查看效果

### 调试模式

1. **启用调试日志**
   ```javascript
   // 在浏览器控制台中
   localStorage.setItem('tokyo-night-debug', 'true');
   ```

2. **查看主题状态**
   ```javascript
   // 检查当前主题状态
   console.log(window.tokyoNightTheme?.getCurrentState());
   ```

## 📊 性能优化

### CSS 优化
- 使用 CSS 自定义属性实现高效的颜色切换
- 最小化重绘和重排
- 利用浏览器缓存

### JavaScript 优化
- 延迟加载非关键功能
- 使用事件委托减少内存占用
- 实现防抖和节流

## 🐛 故障排除

### 常见问题

1. **主题未生效**
   - 检查插件是否正确安装
   - 确认 Orca Notes 版本兼容性
   - 查看浏览器控制台错误信息

2. **颜色显示异常**
   - 清除浏览器缓存
   - 检查 CSS 文件是否完整加载
   - 验证颜色变量定义

3. **性能问题**
   - 禁用不必要的动画效果
   - 检查内存使用情况
   - 更新到最新版本

### 获取帮助

- **GitHub Issues**: 报告 bug 和功能请求
- **文档**: 查看完整的 API 文档
- **社区**: 加入 Orca Notes 社区讨论

## 📈 更新和维护

### 自动更新
- 插件支持自动更新检查
- 新版本发布时会收到通知

### 手动更新
```bash
# 拉取最新代码
git pull origin main

# 重新构建
npm run build

# 重新安装到 Orca
npm run install-to-orca
```

---

**享受你的 Tokyo Night 主题体验！** 🌃✨