const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.resolve(root, "dist/extension");
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(root, "package.json"), "utf-8"),
);

/** Recursively copy directory. */
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Copy assets
const assetsSrc = path.resolve(root, "src/assets");
const assetsDest = path.resolve(dist, "assets");
copyDir(assetsSrc, assetsDest);
console.log("Copied assets");

// 2. Write manifest.json with version
const manifest = JSON.parse(
  fs.readFileSync(path.resolve(root, "src/extension/manifest.json"), "utf-8"),
);
manifest.version = pkg.version;
fs.writeFileSync(
  path.resolve(dist, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log("Wrote manifest.json");

// 3. Generate HTML files with CSP
const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
].join("; ");

const devtoolsHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy" content="${csp}" />
  </head>
  <body>
    <script src="devtools.js"><\/script>
  </body>
</html>`;

const panelHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Urql Devtools</title>
    <meta http-equiv="Content-Security-Policy" content="${csp}" />
    <link rel="stylesheet" href="panel.css" />
  </head>
  <body>
    <div id="root"></div>
    <div id="portal"></div>
    <script src="prism-panel.js"><\/script>
    <script src="panel.js"><\/script>
  </body>
</html>`;

fs.writeFileSync(path.resolve(dist, "devtools.html"), devtoolsHtml);
fs.writeFileSync(path.resolve(dist, "panel.html"), panelHtml);
console.log("Generated HTML files");

console.log("Extension build complete!");
