/**
 * Tokyo Night Theme for Orca Notes
 */

const THEME_NAME = "Tokyo Night";
const THEME_CLASS = "t-tokyo-night";
let pluginName: string;
let hoveredScopeBlock: HTMLElement | null = null;
let onPointerMove: ((event: PointerEvent) => void) | null = null;
let onMouseLeave: (() => void) | null = null;

function setHoveredScopeBlock(next: HTMLElement | null) {
  if (hoveredScopeBlock === next) return;
  hoveredScopeBlock?.classList.remove("tn-scope-line-hover");
  hoveredScopeBlock = next;
  hoveredScopeBlock?.classList.add("tn-scope-line-hover");
}

function bindScopeLineHoverTracking() {
  if (onPointerMove != null) return;

  onPointerMove = (event: PointerEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      setHoveredScopeBlock(null);
      return;
    }

    const main = document.querySelector("#main");
    if (!(main instanceof HTMLElement) || !main.contains(target)) {
      setHoveredScopeBlock(null);
      return;
    }

    const block = target.closest(".orca-block.orca-container");
    setHoveredScopeBlock(block instanceof HTMLElement ? block : null);
  };

  onMouseLeave = () => setHoveredScopeBlock(null);

  document.addEventListener("pointermove", onPointerMove, true);
  document.addEventListener("mouseleave", onMouseLeave, true);
}

function unbindScopeLineHoverTracking() {
  if (onPointerMove != null) {
    document.removeEventListener("pointermove", onPointerMove, true);
    onPointerMove = null;
  }
  if (onMouseLeave != null) {
    document.removeEventListener("mouseleave", onMouseLeave, true);
    onMouseLeave = null;
  }
  setHoveredScopeBlock(null);
}

export async function load(name: string) {
  pluginName = name;

  if (orca.state.themes[THEME_NAME] == null) {
    orca.themes.register(pluginName, THEME_NAME, "tokyo-night.css");
  }
  document.documentElement.classList.add(THEME_CLASS);
  bindScopeLineHoverTracking();
}

export async function unload() {
  unbindScopeLineHoverTracking();
  orca.themes.unregister(THEME_NAME);
  document.documentElement.classList.remove(THEME_CLASS);
}
