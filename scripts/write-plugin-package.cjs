const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const pkgPath = path.join(root, "package.json");

const rootPkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

const pluginPkg = {
  name: "tokyo-night-orca-theme",
  displayName: "Tokyo Night",
  version: rootPkg.version || "0.0.0",
  description: rootPkg.description || "A Tokyo Night theme for Orca Notes.",
  type: "module",
  main: "dist/index.js",
  icon: "icon.png",
  files: ["dist/index.js", "dist/theme.css", "icon.png"],
};

fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(path.join(dist, "package.json"), JSON.stringify(pluginPkg, null, 2));
console.log("[postbuild] Wrote dist/package.json");
