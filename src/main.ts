/**
 * Tokyo Night Theme for Orca Notes
 */

const THEME_NAME = "Tokyo Night";
const THEME_CLASS = "t-tokyo-night";
let pluginName: string;

export async function load(name: string) {
  pluginName = name;

  if (orca.state.themes[THEME_NAME] == null) {
    orca.themes.register(pluginName, THEME_NAME, "tokyo-night.css");
  }
  document.documentElement.classList.add(THEME_CLASS);
}

export async function unload() {
  orca.themes.unregister(THEME_NAME);
  document.documentElement.classList.remove(THEME_CLASS);
}
