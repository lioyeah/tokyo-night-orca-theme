const fs = require("fs");
const path = require("path");

function copy(src, destDir) {
  const base = path.basename(src);
  const dest = path.join(destDir, base);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
}

const root = __dirname ? path.resolve(__dirname, "..") : process.cwd();
const distDir = path.join(root, "dist");

try {
  copy(path.join(root, "theme.css"), distDir);
  copy(path.join(root, "icon.png"), distDir);
  if (fs.existsSync(path.join(root, "README.md"))) {
    copy(path.join(root, "README.md"), distDir);
  }
  if (fs.existsSync(path.join(root, "LICENSE"))) {
    copy(path.join(root, "LICENSE"), distDir);
  }
  console.log("[postbuild] Copied static assets to dist/");
} catch (e) {
  console.error("[postbuild] Failed to copy assets:", e);
  process.exitCode = 1;
}
