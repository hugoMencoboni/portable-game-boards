#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesMapPath = path.join(__dirname, '..', 'src', 'utils', 'imagesMap.ts');
const encryptedDir = path.join(__dirname, '..', 'src', 'assets', 'encrypted');

// Create encrypted directory if it doesn't exist
if (!fs.existsSync(encryptedDir)) {
  fs.mkdirSync(encryptedDir, { recursive: true });
}

console.log('🔍 Reading imagesMap.ts...');

const content = fs.readFileSync(imagesMapPath, 'utf8');

// Find the encryptedImageMap section
const mapStart = content.indexOf('export const encryptedImageMap');
const mapEnd = content.lastIndexOf('};');
const mapContent = content.substring(mapStart, mapEnd + 2);

// Parse recursively
const extractedImages = [];

function extractFromObject(obj, gamePath = [], categoryPath = []) {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      // This is encrypted data
      const game = gamePath[0];
      const category = categoryPath.join('.');
      extractedImages.push({
        game,
        category: category || key,
        key,
        data: value,
        fullPath: [...gamePath, ...categoryPath, key].join('.')
      });
    } else if (typeof value === 'object' && value !== null) {
      // This is a nested object
      if (gamePath.length === 0) {
        // This is a game
        extractFromObject(value, [key], []);
      } else {
        // This is a category or subcategory
        extractFromObject(value, gamePath, [...categoryPath, key]);
      }
    }
  }
}

// Use eval to parse the map (yes, eval is dangerous, but this is our own code)
try {
  // Extract just the object part
  const objMatch = mapContent.match(/=\s*(\{[\s\S]*\});/);
  if (objMatch) {
    const objStr = objMatch[1];
    // Replace all the encrypted data with placeholder to make it parseable
    let simplified = objStr.replace(/"U2FsdGVkX1[^"]*"/g, '"DATA"');
    const parsedMap = eval(`(${simplified})`);
    
    // Now extract the actual data by matching with the simplified version
    // We'll re-parse line by line to get actual encrypted strings
  }
} catch (e) {
  console.error('Failed to parse with eval, using line-by-line approach');
}

// Fallback: Parse line by line
const lines = content.split('\n');
let inMap = false;
let currentGame = null;
let stack = []; // Track nesting: [{type: 'game'|'category', name: string}]
let currentKey = null;
let currentData = '';
let collectingData = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  
  if (trimmed.includes('export const encryptedImageMap')) {
    inMap = true;
    continue;
  }
  
  if (!inMap) continue;
  if (trimmed === '};' && stack.length === 0) break;
  
  // Opening brace increases depth
  if (trimmed.match(/^(["']?)([^"':]+)\1:\s*\{/)) {
    const match = trimmed.match(/^(["']?)([^"':]+)\1:\s*\{/);
    const name = match[2];
    
    if (stack.length === 0) {
      // Game level
      currentGame = name;
      stack.push({ type: 'game', name });
    } else {
      // Category/subcategory level
      stack.push({ type: 'category', name });
    }
    continue;
  }
  
  // Closing brace decreases depth
  if (trimmed.match(/^\},?$/)) {
    const popped = stack.pop();
    if (popped?.type === 'game') {
      currentGame = null;
    }
    continue;
  }
  
  // Single-line key-value: key: "data"
  const singleLineMatch = trimmed.match(/^(["']?)([^"':]+)\1:\s*"(U2FsdGVkX1[^"]+)"/);
  if (singleLineMatch && currentGame) {
    const key = singleLineMatch[2];
    const data = singleLineMatch[3];
    const categories = stack.slice(1).map(s => s.name);
    const category = categories.join('.');
    
    extractedImages.push({
      game: currentGame,
      category: category || key,
      key,
      data,
      fullPath: [currentGame, ...categories, key].join('.')
    });
    continue;
  }
  
  // Start of multi-line value: key:
  const multiStartMatch = trimmed.match(/^(["']?)([^"':]+)\1:\s*$/);
  if (multiStartMatch && currentGame && !collectingData) {
    currentKey = multiStartMatch[2];
    collectingData = true;
    currentData = '';
    continue;
  }
  
  // Collecting multi-line data
  if (collectingData) {
    const dataMatch = trimmed.match(/^"(U2FsdGVkX1[^"]+)"/);
    if (dataMatch) {
      currentData += dataMatch[1];
      
      // Check if more data follows
      if (i + 1 < lines.length && !lines[i + 1].trim().startsWith('"')) {
        // End of data
        const categories = stack.slice(1).map(s => s.name);
        const category = categories.join('.');
        
        extractedImages.push({
          game: currentGame,
          category: category || currentKey,
          key: currentKey,
          data: currentData,
          fullPath: [currentGame, ...categories, currentKey].join('.')
        });
        
        collectingData = false;
        currentKey = null;
        currentData = '';
      }
    }
  }
}

console.log(`\n📦 Found ${extractedImages.length} encrypted images\n`);

// Create separate files for each image
const imports = [];
const gameMap = new Map();

extractedImages.forEach(({ game, category, key, data, fullPath }) => {
  const safeCategory = category.replace(/\./g, '_');
  const filename = `${game}__${safeCategory}__${key}.ts`;
  const filepath = path.join(encryptedDir, filename);
  
  // Write encrypted data file
  const fileContent = `// Auto-generated encrypted image data\nexport const encryptedData = "${data}";\n`;
  fs.writeFileSync(filepath, fileContent, 'utf8');
  
  // Build import statement
  const importName = `${game}_${safeCategory}_${key}`.replace(/-/g, '_');
  imports.push(`import { encryptedData as ${importName} } from '../assets/encrypted/${filename.replace('.ts', '')}';`);
  
  // Build structure
  if (!gameMap.has(game)) {
    gameMap.set(game, []);
  }
  gameMap.get(game).push({ category, key, importName, fullPath });
  
  console.log(`✅ Created: ${filename}`);
});

console.log(`\n📝 Generating new imagesMap.ts...\n`);

// Read interface part
const interfaceEnd = content.indexOf('export const encryptedImageMap');
const interfacePart = content.substring(0, interfaceEnd).trim();

// Generate new file
let newContent = interfacePart + '\n\n';
newContent += '// Auto-generated imports\n';
newContent += imports.join('\n') + '\n\n';
newContent += 'export const encryptedImageMap: ImagesMap = {\n';

gameMap.forEach((items, game) => {
  newContent += `  "${game}": {\n`;
  
  // Group by top-level category
  const byCategory = new Map();
  items.forEach(item => {
    const topCategory = item.category.split('.')[0];
    if (!byCategory.has(topCategory)) {
      byCategory.set(topCategory, []);
    }
    byCategory.get(topCategory).push(item);
  });
  
  byCategory.forEach((catItems, topCat) => {
    const needsQuotes = topCat.includes('-') || !topCat.match(/^[a-zA-Z_]/);
    const catKey = needsQuotes ? `"${topCat}"` : topCat;
    
    // Check if all items are direct (no dots in category)
    const allDirect = catItems.every(item => !item.category.includes('.'));
    
    if (allDirect && catItems.length === 1 && catItems[0].key === topCat) {
      // Direct value like: button: data
      newContent += `    ${catKey}: ${catItems[0].importName},\n`;
    } else if (allDirect) {
      // Category with direct children like: cards: { blue_all: data, ... }
      newContent += `    ${catKey}: {\n`;
      catItems.forEach(({ key, importName }) => {
        const needsKeyQuotes = key.includes('-') || !key.match(/^[a-zA-Z_]/);
        const keyStr = needsKeyQuotes ? `"${key}"` : key;
        newContent += `      ${keyStr}: ${importName},\n`;
      });
      newContent += `    },\n`;
    } else {
      // Nested structure like: rules: { finalScore: data }
      newContent += `    ${catKey}: {\n`;
      catItems.forEach(({ category, key, importName }) => {
        const needsKeyQuotes = key.includes('-') || !key.match(/^[a-zA-Z_]/);
        const keyStr = needsKeyQuotes ? `"${key}"` : key;
        newContent += `      ${keyStr}: ${importName},\n`;
      });
      newContent += `    },\n`;
    }
  });
  
  newContent += `  },\n`;
});

newContent += '};\n';

// Write new imagesMap.ts
fs.writeFileSync(imagesMapPath, newContent, 'utf8');

console.log('✅ Updated imagesMap.ts');
console.log(`\n🎉 Migration complete! Extracted ${extractedImages.length} images to separate files.`);
