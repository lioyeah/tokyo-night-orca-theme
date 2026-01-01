/**
 * Tokyo Night Theme for Orca Notes
 * 
 * 简化版插件入口文件，采用官方推荐的纯静态 CSS 架构。
 * 所有主题样式定义在 public/tokyo-night.css 中。
 */

let pluginName: string

export async function load(_name: string) {
  pluginName = _name
  orca.themes.register(pluginName, "Tokyo Night", "tokyo-night.css")
}

export async function unload() {
  orca.themes.unregister("Tokyo Night")
}
