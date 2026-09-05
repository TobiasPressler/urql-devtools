const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const shellDir = path.resolve(root, "dist/electron/shell");

// Ensure shell directory exists
fs.mkdirSync(shellDir, { recursive: true });

// Generate panel.html for electron
const panelHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Urql Devtools</title>
    <link rel="stylesheet" href="panel.css" />
  </head>
  <body>
    <div id="root"></div>
    <div id="portal"></div>
    <script src="prism-panel.js"><\/script>
    <script src="panel.js"><\/script>
  </body>
</html>`;

fs.writeFileSync(path.resolve(shellDir, "panel.html"), panelHtml);
console.log("Generated electron panel.html");
