---
name: manga-ocr-scanner
description: "Specialized Japanese manga and comic OCR scanner for vertical text, varied handwriting, and speech bubble reading using kha-white/manga-ocr."
---

# Manga & Real-World Japanese OCR Skill (manga-ocr)

This skill guides the implementation of optical character recognition (OCR) specifically tuned for Japanese comic books, light novels, and street signage using **Manga OCR** (`kha-white/manga-ocr`).

## 1. Why Manga OCR over Generic OCR
- Handles vertical text (*tategaki* 縦書き) naturally without rotation preprocessing.
- Robust against non-standard manga fonts, sound effects (onomatopoeia / *gitaigo*), and small low-contrast furigana.
- Output is clean UTF-8 text ready for parsing by `japanese-morphology-parser` and `kuromoji`.

## 2. Running Manga OCR via Python / `uv`
```bash
# Process a cropped speech bubble image
uv run python -c "
from PIL import Image
from manga_ocr import MangaOcr

mocr = MangaOcr()
text = mocr('scratch/sample_bubble.png')
print('Extracted Japanese:', text)
"
```

## 3. End-to-End "Scan-to-Flashcard" Flow
1. **Client Image Upload:** The student takes a photo or crops an image in the PWA.
2. **OCR Extraction:** Manga OCR extracts the Japanese string.
3. **Morphology Tokenization:** `kuromoji.js` breaks the string into vocabulary tokens and attaches dictionary readings.
4. **FSRS Card Creation:** The student taps "Add to Review Deck", creating an immediate FSRS study card.
