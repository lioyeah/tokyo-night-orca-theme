const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const srcDir = path.join(rootDir, "src", "theme-css");
const manifestPath = path.join(srcDir, "manifest.json");
const outputPath = path.join(rootDir, "public", "tokyo-night.css");

function readManifest(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed.parts) || parsed.parts.length === 0) {
    throw new Error("Invalid manifest: `parts` must be a non-empty array.");
  }
  return parsed.parts;
}

function concatCssParts(parts) {
  let combined = "";
  parts.forEach((part, index) => {
    const partPath = path.join(srcDir, part);
    if (!fs.existsSync(partPath)) {
      throw new Error(`Missing CSS part: ${partPath}`);
    }
    const css = fs.readFileSync(partPath, "utf8");
    combined += css;
    if (!css.endsWith("\n")) {
      combined += "\n";
    }
    if (index !== parts.length - 1) {
      combined += "\n";
    }
  });
  return combined;
}

const parts = readManifest(manifestPath);
const output = concatCssParts(parts);
fs.writeFileSync(outputPath, output, "utf8");

console.log(`Built ${outputPath} from ${parts.length} part(s).`);
