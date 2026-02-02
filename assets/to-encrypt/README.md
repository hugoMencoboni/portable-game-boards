# Temporary Images Folder

This folder is for **temporary storage** of images before encryption.

## Usage

1. **Save your screenshots/images here**
   - This folder is git-ignored, so images won't be committed
   - You can take screenshots directly here

2. **Encrypt the image**
   ```bash
   npm run encrypt-image add YOUR_KEY "game/category/key" "assets/to-encrypt/your-image.png"
   ```

3. **Delete the original** (optional)
   - Once encrypted, you can delete the original from this folder
   - The encrypted version is safely stored in `src/assets/encrypted/`

## Example

```bash
# 1. Save screenshot as assets/to-encrypt/final-score.png
# 2. Encrypt it:
npm run encrypt-image add YOUR_SECRET_KEY "next-station-london/rules/finalScore" "assets/to-encrypt/final-score.png"
# 3. Delete assets/to-encrypt/final-score.png (optional)
```

## Note

Files in this folder are **never committed to git** - they stay local only!
