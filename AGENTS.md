# Portable Game Boards - Agent Guide

## Project Overview
Digital board game utilities for mobile, currently featuring:
- **Le Murmure des Feuilles** - Dice rolling game
- **Next Station London** - Metro planning game with encrypted assets

## Technology Stack
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 6 (migrated from Create React App)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Encryption:** CryptoJS (AES)

## Key Architecture Decisions

### Image Encryption System
All game assets (card images, backgrounds) are encrypted to prevent unauthorized use.

**How it works:**
1. Images are encrypted using AES encryption and stored in `src/utils/imagesMap.ts`
2. Users must enter an encryption key on first load (stored in localStorage)
3. The `EncryptWrapper` component decrypts the image map on mount
4. Images are accessed via the `useImage()` hook with dot-notation paths

**Example:**
```typescript
// Access encrypted image
const cardImage = useImage("next-station-london.cards.station-1");

// The encryption key is provided by users at runtime
// DO NOT hardcode the encryption key in the codebase
```

**Adding new encrypted images:**
1. Encrypt image URLs/base64 using the project's encryption key
2. Add to `src/utils/imagesMap.ts` following the existing structure
3. Access via `useImage()` hook with the appropriate path

### Modal System
Uses Zustand store for global modal management:
- `useModalStore` - Global state
- `useModal` - Hook for show/hide
- `ModalWrapper` - Renders modal overlay
- `Modal` - Styled container (z-index: 1000)

### Game Structure
Each game is in `src/games/[game-name]/`:
- `index.ts` - Game registration
- `[GameName].tsx` - Main component
- `types.ts` - TypeScript types
- `utils.ts` - Game logic
- Component files for game-specific UI

## Common Tasks

### Encrypting and Adding Images

**Architecture:**
- Encrypted images are stored as separate files in `src/assets/encrypted/`
- Each file is named: `game__category__key.ts` (e.g., `next-station-london__rules__finalScore.ts`)
- `src/utils/imagesMap.ts` imports these files and maps them to their paths
- Encrypted files are committed to git (they're safe since encrypted)
- The encryption key is **never** stored in code

**Workflow:**
1. Place screenshots/images in `assets/to-encrypt/` (this folder is git-ignored)
2. Run the encrypt-image script with the image path
3. The encrypted file is created in `src/assets/encrypted/` and added to the map
4. Delete the original image from `assets/to-encrypt/` (optional, since it's ignored anyway)

**Commands:**

Add an image:
```bash
npm run encrypt-image add <YOUR-KEY> <map-key> <image-path>
```

Remove an image:
```bash
npm run encrypt-image remove <YOUR-KEY> <map-key>
```

Check if an image exists:
```bash
npm run encrypt-image get <map-key>
```

**Examples:**
```bash
# Add image (from to-encrypt folder)
npm run encrypt-image add YOUR_SECRET_KEY "next-station-london/rules/finalScore" "assets/to-encrypt/screenshot.png"

# Remove image  
npm run encrypt-image remove YOUR_SECRET_KEY "next-station-london/rules/finalScore"

# Check if exists
npm run encrypt-image get "next-station-london/rules/finalScore"

# List all encrypted images
npm run encrypt-image list
```

**Map key format:** `game-name/category/key-name`
- `game-name`: e.g., "next-station-london", "le-murmure-des-feuilles"
- `category`: e.g., "cards", "rules", "button"
- `key-name`: specific identifier (e.g., "finalScore", "page1")

**Using encrypted images in components:**
```typescript
import useImage from "../../hooks/useImage";

const Component = () => {
  const image = useImage("next-station-london.rules.finalScore");
  return image ? <img src={image} alt="Description" /> : null;
};
```

**Migration:**
If you need to migrate existing images from the old format (all in imagesMap.ts) to separate files:
```bash
node scripts/migrate-images.mjs
```

**Security:** The encryption key must be provided by the user at runtime and should never be committed to version control.

### Adding a New Game
1. Create folder in `src/games/[game-name]/`
2. Create game component and export in `index.ts`
3. Register in `src/games/index.ts`
4. Add game icon/background to encrypted image map using the script above

### Updating Rules
Rules are displayed in modal components (e.g., `RulesModal.tsx`):
- Use official game PDFs as source
- Format in French (primary language)
- Keep mobile-friendly (large text: 1.8-2.5rem)
- Make scrollable for long content

### Styling Guidelines
- Use `rem` units for mobile compatibility
- Font sizes: 1.5-2.5rem for body, 2.5rem+ for headings
- Test on mobile viewport (default target)
- Buttons should be touch-friendly (min 44x44px)

## Development Commands
```bash
npm run dev            # Start dev server (HTTPS on port 3000)
npm run build          # Build for production
npm test               # Run Vitest tests
npm run preview        # Preview production build
npm run encrypt-image  # Encrypt image and add to imagesMap (see above)
```

## Deployment
- GitHub Pages deployment via GitHub Actions
- Workflow: `.github/workflows/deploy.yml`
- Base path: `/portable-game-boards/`

## Security Notes
- **Encryption keys are user-provided at runtime**
- Never commit encryption keys to the repository
- Images in `src/utils/imagesMap.ts` are already encrypted
- Key is stored in localStorage for convenience

## Migration History
- **Jan 2026:** Migrated from Create React App to Vite
  - Removed react-scripts dependency
  - Fixed 22 security vulnerabilities
  - Updated to Vitest for testing
  - Improved build performance (10-50x faster)

## Future Considerations
- Consider code splitting for large image maps
- Could add PWA features (service worker, offline support)
- Multi-language support (currently French only)
