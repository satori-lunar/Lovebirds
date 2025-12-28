#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');

  // Add type="module" to the script tag
  html = html.replace(
    /<script src="(\/_expo\/static\/js\/web\/[^"]+)" defer><\/script>/,
    '<script type="module" src="$1"></script>'
  );

  fs.writeFileSync(indexPath, html);
  console.log('Fixed index.html: Added type="module" to script tag');
} else {
  console.error('index.html not found at', indexPath);
  process.exit(1);
}
