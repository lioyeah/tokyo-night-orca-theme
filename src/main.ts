/**
 * Tokyo Night Theme for Orca Notes
 */

const THEME_NAME = "Tokyo Night"
let _name: string

export async function load(name: string) {
  _name = name

  orca.state.themes[THEME_NAME] == null &&
    orca.themes.register(name, THEME_NAME, "tokyo-night.css")
}

export async function unload() {
  orca.themes.unregister(THEME_NAME)
}