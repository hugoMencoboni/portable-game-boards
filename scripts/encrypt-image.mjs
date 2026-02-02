#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesMapPath = path.join(__dirname, '..', 'src', 'utils', 'imagesMap.ts');
const encryptedDir = path.join(__dirname, '..', 'src', 'assets', 'encrypted');

function encryptData(data, key) {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    key
  ).toString();
  return encryptedData;
}

function getBase64DataUrl(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const base64 = fileBuffer.toString('base64');
  const ext = path.extname(filePath).toLowerCase();
  
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };
  
  const mimeType = mimeTypes[ext] || 'application/octet-stream';
  return `data:${mimeType};base64,${base64}`;
}

function addToImageMap(imagePath, mapKey, encryptionKey) {
  const pathParts = mapKey.split('/');
  if (pathParts.length !== 3) {
    throw new Error('mapKey must be in format: game/category/key (e.g., "next-station-london/rules/finalScore")');
  }
  
  const [gameName, category, key] = pathParts;
  
  // Create encrypted directory if it doesn't exist
  if (!fs.existsSync(encryptedDir)) {
    fs.mkdirSync(encryptedDir, { recursive: true });
  }
  
  // Encrypt image
  const dataUrl = getBase64DataUrl(imagePath);
  const encrypted = encryptData(dataUrl, encryptionKey);
  
  // Create separate encrypted file
  const filename = `${gameName}__${category}__${key}.ts`;
  const filepath = path.join(encryptedDir, filename);
  const fileContent = `// Auto-generated encrypted image data
export const encryptedData = "${encrypted}";
`;
  
  fs.writeFileSync(filepath, fileContent, 'utf8');
  console.log(`✅ Created encrypted file: ${filename}`);
  
  // Update imagesMap.ts
  updateImageMap(gameName, category, key, filename);
  
  console.log(`✅ Successfully added image to map`);
  console.log(`   Game: "${gameName}"`);
  console.log(`   Category: "${category}"`);
  console.log(`   Key: "${key}"`);
  console.log(`   Image: ${path.basename(imagePath)}`);
  console.log(`   Encrypted length: ${encrypted.length} chars`);
}

function updateImageMap(gameName, category, key, filename) {
  const content = fs.readFileSync(imagesMapPath, 'utf8');
  const lines = content.split('\n');
  
  const importName = `${gameName}_${category}_${key}`.replace(/-/g, '_');
  const importStatement = `import { encryptedData as ${importName} } from '../assets/encrypted/${filename.replace('.ts', '')}';`;
  
  // Find where to insert import (after other imports, before encryptedImageMap)
  let importInsertIndex = -1;
  let mapStartIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('// Auto-generated imports')) {
      importInsertIndex = i + 1;
    }
    if (lines[i].includes('export const encryptedImageMap')) {
      mapStartIndex = i;
      if (importInsertIndex === -1) {
        importInsertIndex = i;
      }
      break;
    }
  }
  
  // Check if import already exists
  const importExists = lines.some(line => line.includes(importStatement));
  if (!importExists && importInsertIndex !== -1) {
    lines.splice(importInsertIndex, 0, importStatement);
    mapStartIndex++; // Adjust index after insertion
  }
  
  // Find or create the game/category/key structure in the map
  let inMap = false;
  let inGame = false;
  let inCategory = false;
  let gameIndent = '';
  let categoryIndent = '';
  let inserted = false;
  
  for (let i = mapStartIndex; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('export const encryptedImageMap')) {
      inMap = true;
      continue;
    }
    
    if (!inMap) continue;
    
    // Check if we're in the target game
    if (line.includes(`"${gameName}":`)) {
      inGame = true;
      gameIndent = line.match(/^(\s*)/)[1];
      continue;
    }
    
    // Check if we're in the target category
    if (inGame && line.includes(`${category}:`)) {
      inCategory = true;
      categoryIndent = line.match(/^(\s*)/)[1];
      // Insert the key entry after this line
      const keyEntry = `${categoryIndent}  "${key}": ${importName},`;
      
      // Check if key already exists
      let keyExists = false;
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].includes(`"${key}":`)) {
          lines[j] = keyEntry;
          keyExists = true;
          inserted = true;
          break;
        }
        if (lines[j].includes('},')) break;
      }
      
      if (!keyExists) {
        lines.splice(i + 1, 0, keyEntry);
        inserted = true;
      }
      break;
    }
    
    // If we're leaving the game without finding category, add it
    if (inGame && line.match(/^\s*},/) && !inserted) {
      const categoryBlock = [
        `${gameIndent}  ${category}: {`,
        `${gameIndent}    "${key}": ${importName},`,
        `${gameIndent}  },`
      ];
      lines.splice(i, 0, ...categoryBlock);
      inserted = true;
      break;
    }
  }
  
  // If game doesn't exist, add it before the closing brace
  if (!inserted) {
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes('};') && inMap) {
        const gameBlock = [
          `  "${gameName}": {`,
          `    ${category}: {`,
          `      "${key}": ${importName},`,
          `    },`,
          `  },`
        ];
        lines.splice(i, 0, ...gameBlock);
        break;
      }
    }
  }
  
  fs.writeFileSync(imagesMapPath, lines.join('\n'), 'utf8');
}

function removeFromImageMap(mapKey) {
  const pathParts = mapKey.split('/');
  if (pathParts.length !== 3) {
    throw new Error('mapKey must be in format: game/category/key (e.g., "next-station-london/rules/finalScore")');
  }
  
  const [gameName, category, key] = pathParts;
  
  // Delete encrypted file
  const filename = `${gameName}__${category}__${key}.ts`;
  const filepath = path.join(encryptedDir, filename);
  
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
    console.log(`✅ Deleted: ${filename}`);
  }
  
  // Remove from imagesMap.ts
  const content = fs.readFileSync(imagesMapPath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  
  const importName = `${gameName}_${category}_${key}`.replace(/-/g, '_');
  
  for (const line of lines) {
    // Skip import line
    if (line.includes(importName) && line.includes('import')) {
      continue;
    }
    // Skip key line in map
    if (line.includes(`"${key}":`) && line.includes(importName)) {
      continue;
    }
    newLines.push(line);
  }
  
  fs.writeFileSync(imagesMapPath, newLines.join('\n'), 'utf8');
  console.log(`✅ Removed from map: ${gameName}.${category}.${key}`);
}

function getFromImageMap(mapKey) {
  const pathParts = mapKey.split('/');
  if (pathParts.length !== 3) {
    throw new Error('mapKey must be in format: game/category/key (e.g., "next-station-london/rules/finalScore")');
  }
  
  const [gameName, category, key] = pathParts;
  const filename = `${gameName}__${category}__${key}.ts`;
  const filepath = path.join(encryptedDir, filename);
  
  if (fs.existsSync(filepath)) {
    const content = fs.readFileSync(filepath, 'utf8');
    const match = content.match(/encryptedData = "([^"]+)"/);
    if (match) {
      console.log(`✅ Found: ${filename}`);
      console.log(`   Encrypted length: ${match[1].length} chars`);
      return true;
    }
  }
  
  console.log(`❌ Not found: ${filename}`);
  return false;
}

function listImagesInMap() {
  const content = fs.readFileSync(imagesMapPath, 'utf8');
  const lines = content.split('\n');
  
  let inEncryptedMap = false;
  let currentGame = null;
  let currentCategory = null;
  const images = [];
  
  for (const line of lines) {
    if (line.includes('export const encryptedImageMap')) {
      inEncryptedMap = true;
      continue;
    }
    
    if (!inEncryptedMap) continue;
    
    const gameMatch = line.match(/^\s*["']([^"']+)["']:\s*\{/);
    if (gameMatch) {
      currentGame = gameMatch[1];
      continue;
    }
    
    const categoryMatch = line.match(/^\s*([a-zA-Z-]+):\s*\{/);
    if (categoryMatch && currentGame) {
      currentCategory = categoryMatch[1];
      continue;
    }
    
    const keyMatch = line.match(/^\s*["']([^"']+)["']:\s*["']?([^"',\s]+)/);
    if (keyMatch && currentGame && currentCategory) {
      images.push({
        game: currentGame,
        category: currentCategory,
        key: keyMatch[1]
      });
    }
    
    if (line.includes('},') && currentCategory) {
      currentCategory = null;
    } else if (line.includes('},') && currentGame) {
      currentGame = null;
    }
  }
  
  console.log(`\n📋 Found ${images.length} images in imagesMap.ts:\n`);
  images.forEach(({ game, category, key }) => {
    console.log(`   ${game}/${category}/${key}`);
  });
  
  return images;
}

// Main script
const args = process.argv.slice(2);
const command = args[0];

if (!command || !['add', 'remove', 'get', 'list'].includes(command)) {
  console.error('Usage: node scripts/encrypt-image.mjs <command> [options]');
  console.error('');
  console.error('Commands:');
  console.error('  add <encryption-key> <map-key> <image-path>  - Add image to map');
  console.error('  remove <encryption-key> <map-key>            - Remove image from map');
  console.error('  get <map-key>                                - Check if image exists');
  console.error('  list                                         - List all images in map');
  console.error('');
  console.error('Examples:');
  console.error('  node scripts/encrypt-image.mjs add YOUR_KEY "next-station-london/rules/finalScore" ./assets/example.png');
  console.error('  node scripts/encrypt-image.mjs remove YOUR_KEY "next-station-london/rules/finalScore"');
  console.error('  node scripts/encrypt-image.mjs get "next-station-london/rules/finalScore"');
  console.error('  node scripts/encrypt-image.mjs list');
  process.exit(1);
}

if (command === 'add') {
  const [, encryptionKey, mapKey, imagePath] = args;
  if (!encryptionKey || !mapKey || !imagePath) {
    console.error('❌ Missing arguments for add command');
    console.error('Usage: node scripts/encrypt-image.mjs add <encryption-key> <map-key> <image-path>');
    process.exit(1);
  }
  if (!fs.existsSync(imagePath)) {
    console.error(`❌ Image file not found: ${imagePath}`);
    process.exit(1);
  }
  try {
    addToImageMap(imagePath, mapKey, encryptionKey);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
} else if (command === 'remove') {
  const [, encryptionKey, mapKey] = args;
  if (!encryptionKey || !mapKey) {
    console.error('❌ Missing arguments for remove command');
    console.error('Usage: node scripts/encrypt-image.mjs remove <encryption-key> <map-key>');
    process.exit(1);
  }
  try {
    removeFromImageMap(mapKey);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
} else if (command === 'get') {
  const [, mapKey] = args;
  if (!mapKey) {
    console.error('❌ Missing map-key argument');
    console.error('Usage: node scripts/encrypt-image.mjs get <map-key>');
    process.exit(1);
  }
  try {
    getFromImageMap(mapKey);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
} else if (command === 'list') {
  try {
    listImagesInMap();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}
