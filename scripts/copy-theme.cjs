const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "public", "tokyo-night.css");
const destDir = path.join(__dirname, "..", "dist");
const dest = path.join(destDir, "tokyo-night.css");

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log(`Copied ${src} -> ${dest}`);
