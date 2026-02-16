const fs = require('fs');
const path = require('path');

// Check if pdfkit is available
try {
  const PDFDocument = require('pdfkit');
  console.log('pdfkit is available');
} catch (e) {
  console.log('pdfkit NOT available:', e.message);
}

// Check node_modules
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
console.log('node_modules exists:', fs.existsSync(nodeModulesPath));

// Check if public dir exists
const publicPath = path.join(__dirname, '..', 'public');
console.log('public exists:', fs.existsSync(publicPath));

// List available modules
try {
  const mods = fs.readdirSync(nodeModulesPath).filter(m => !m.startsWith('.')).slice(0, 30);
  console.log('Some modules:', mods.join(', '));
} catch(e) {
  console.log('Cannot read node_modules:', e.message);
}
