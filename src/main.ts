/**
 * Tokyo Night Theme for Orca Notes
 */

const THEME_NAME = "Tokyo Night";
let pluginName: string;

export async function load(name: string) {
  pluginName = name;

  // 使用官方推荐的方式注册主题,避免重复注册
  if (orca.state.themes[THEME_NAME] == null) {
    orca.themes.register(pluginName, THEME_NAME, "tokyo-night.css");
  }
}

export async function unload() {
  // 使用主题名称卸载,让插件 API 处理缓存清理
  orca.themes.unregister(THEME_NAME);
}
