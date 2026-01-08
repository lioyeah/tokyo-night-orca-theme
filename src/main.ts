/**
 * Tokyo Night Theme for Orca Notes
 */

let _name: string

export async function load(name: string) {
  _name = name

  orca.state.themes["Tokyo Night"] == null &&
    orca.themes.register(name, "Tokyo Night", "tokyo-night.css")
}

export async function unload() {
  orca.themes.unregister(_name)
}
