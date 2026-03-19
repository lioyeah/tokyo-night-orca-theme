/**
 * Tokyo Night Theme for Orca Notes
 */

const THEME_NAME = "Tokyo Night";
const THEME_CLASS = "t-tokyo-night";
let pluginName: string;
let hasRegisteredTheme = false;
let hoveredScopeBlock: HTMLElement | null = null;
let onPointerMove: ((event: PointerEvent) => void) | null = null;
let onMouseLeave: (() => void) | null = null;
let mainRoot: HTMLElement | null = null;
let pendingPointerTarget: EventTarget | null = null;
let pointerFrameId: number | null = null;

function setHoveredScopeBlock(next: HTMLElement | null) {
  if (hoveredScopeBlock === next) return;
  hoveredScopeBlock?.classList.remove("tn-scope-line-hover");
  hoveredScopeBlock = next;
  hoveredScopeBlock?.classList.add("tn-scope-line-hover");
}

function getMainRoot() {
  if (mainRoot?.isConnected) return mainRoot;
  const candidate = document.querySelector("#main");
  mainRoot = candidate instanceof HTMLElement ? candidate : null;
  return mainRoot;
}

function flushPointerMove() {
  pointerFrameId = null;
  const target = pendingPointerTarget;
  pendingPointerTarget = null;

  if (!(target instanceof Element)) {
    setHoveredScopeBlock(null);
    return;
  }

  const main = getMainRoot();
  if (main == null || !main.contains(target)) {
    setHoveredScopeBlock(null);
    return;
  }

  const block = target.closest(".orca-block.orca-container");
  setHoveredScopeBlock(block instanceof HTMLElement ? block : null);
}

function bindScopeLineHoverTracking() {
  if (onPointerMove != null) return;
  getMainRoot();

  onPointerMove = (event: PointerEvent) => {
    pendingPointerTarget = event.target;
    if (pointerFrameId != null) return;
    pointerFrameId = window.requestAnimationFrame(flushPointerMove);
  };

  onMouseLeave = () => {
    pendingPointerTarget = null;
    if (pointerFrameId != null) {
      window.cancelAnimationFrame(pointerFrameId);
      pointerFrameId = null;
    }
    setHoveredScopeBlock(null);
  };

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
  if (pointerFrameId != null) {
    window.cancelAnimationFrame(pointerFrameId);
    pointerFrameId = null;
  }
  pendingPointerTarget = null;
  mainRoot = null;
  setHoveredScopeBlock(null);
}

export async function load(name: string) {
  pluginName = name;
  hasRegisteredTheme = false;

  if (orca.state.themes[THEME_NAME] == null) {
    orca.themes.register(pluginName, THEME_NAME, "tokyo-night.css");
    hasRegisteredTheme = true;
  }
  document.documentElement.classList.add(THEME_CLASS);
  bindScopeLineHoverTracking();
}

export async function unload() {
  unbindScopeLineHoverTracking();
  if (hasRegisteredTheme) {
    orca.themes.unregister(THEME_NAME);
    hasRegisteredTheme = false;
  }
  document.documentElement.classList.remove(THEME_CLASS);
}
