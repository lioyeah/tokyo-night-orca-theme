/**
 * Tokyo Night Theme for Orca Notes
 *
 * 插件入口文件，采用官方推荐的架构。
 * 所有主题样式定义在 public/tokyo-night.css 中。
 */

const { subscribe } = window.Valtio

let pluginName: string
let unsubscribe: () => void

export async function load(_name: string) {
  pluginName = _name

  orca.plugins.setSettingsSchema(pluginName, {})

  unsubscribe = subscribe(orca.state.plugins[pluginName]!, async () => {
    // 设置变化时的回调（当前不需要额外操作）
  })

  // 检查主题是否已注册，避免重复注册
  if (orca.state.themes["Tokyo Night"] == null) {
    orca.themes.register(pluginName, "Tokyo Night", "tokyo-night.css")
  }
}

export async function unload() {
  if (unsubscribe) {
    unsubscribe()
  }
  orca.themes.unregister("Tokyo Night")
}
