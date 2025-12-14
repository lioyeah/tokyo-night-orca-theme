param(
  [string]$Target = "C:\Users\刘玥\OneDrive\文档\orca\plugins\tokyo-night-orca-theme"
)

$ErrorActionPreference = "Stop"

function Join($a, $b) { return [System.IO.Path]::Combine($a, $b) }

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = (Resolve-Path (Join $scriptDir "..")).Path
$dist = (Join $root "dist")

if (!(Test-Path -LiteralPath $dist)) {
  Write-Error "未找到构建产物：$dist，请先在仓库根目录运行 npm run build"
  exit 1
}

if (!(Test-Path -LiteralPath $Target)) {
  New-Item -ItemType Directory -Path $Target -Force | Out-Null
}

# Desired structure (like orca-tune-theme):
# target/
#   ├─ dist/ (index.js, theme.css, etc.)
#   ├─ icon.png
#   ├─ LICENSE
#   ├─ package.json
#   └─ README.md

$targetDist = (Join $Target "dist")
if (!(Test-Path -LiteralPath $targetDist)) {
  New-Item -ItemType Directory -Path $targetDist -Force | Out-Null
}

# Clean unexpected root-level index.js/theme.css
@("index.js","theme.css") | ForEach-Object {
  $p = (Join $Target $_)
  if (Test-Path -LiteralPath $p) { Remove-Item -LiteralPath $p -Force -ErrorAction SilentlyContinue }
}

# Copy dist runtime files into target/dist
@("index.js","theme.css") | ForEach-Object {
  $src = (Join $dist $_)
  if (Test-Path -LiteralPath $src) {
    Copy-Item -LiteralPath $src -Destination $targetDist -Force
  } else {
    Write-Warning "缺少文件：$src"
  }
}

# Copy package manifest and assets into target root
@("package.json","icon.png","LICENSE","README.md") | ForEach-Object {
  $src = (Join $dist $_)
  if (Test-Path -LiteralPath $src) {
    Copy-Item -LiteralPath $src -Destination $Target -Force
  }
}

Write-Host ("Deployed to: " + $Target) -ForegroundColor Green
