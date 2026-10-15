---
name: document-converter-markitdown
description: "Convert PDF textbooks, official JFT/JLPT test sheets, Word docs, Excel tables, images, and audio into clean structured Markdown using Microsoft MarkItDown (microsoft/markitdown)."
---

# Document Converter Skill (Microsoft MarkItDown)

This skill provides guides and recipes for converting varied document formats (PDFs, Excel tables, PowerPoint slides, Word documents, images, and audio files) into clean, LLM-ready Markdown using **Microsoft MarkItDown** (`microsoft/markitdown`).

## 1. Supported File Formats in Nugget Nihongo

| Source Format | Example in Project | Converted Markdown Output |
| :--- | :--- | :--- |
| **PDF** | `reference-books/*.pdf`, JFT-Basic exam sheets | Headers, tables, Japanese example sentences, clean text |
| **Excel (`.xlsx`)** | Vocab spreadsheets, curriculum matrices | GitHub-flavored Markdown tables |
| **Word (`.docx`)** | Lesson plans, syllabus notes | Semantic Markdown sections |
| **Audio (`.mp3`, `.wav`)** | Choukai listening tracks, pronunciation clips | Markdown transcription with speech-to-text |
| **Images (`.png`, `.jpg`)** | Scanned dialogue prompts, illustrated test cards | OCR-extracted text and visual metadata |

---

## 2. Python API Usage

The tool is installed in the isolated virtual environment at `scratch/tooling-lab/.venv`:

```python
from markitdown import MarkItDown

md = MarkItDown()

# Convert a PDF textbook or test sheet to Markdown
result = md.convert("reference-books/irodori_starter.pdf")
print(result.text_content)

# Save converted Markdown
with open("scratch/irodori_extracted.md", "w", encoding="utf-8") as f:
    f.write(result.text_content)
```

---

## 3. CLI Conversion via `uv`

Run single-file conversions on the command line without activating environments:

```bash
# Convert PDF to Markdown
uv run --directory scratch/tooling-lab python -m markitdown "choukai renshuu/extracted/soal.pdf" > scratch/soal.md

# Convert Excel vocab sheet to Markdown table
uv run --directory scratch/tooling-lab python -m markitdown "data/curriculum.xlsx" > scratch/curriculum.md
```

---

## 4. MCP Server Integration (`markitdown-mcp`)

The MCP server allows AI agents (in Claude Desktop, Cursor, or Antigravity) to call MarkItDown as an automated tool.

### Configuration (`mcp_config.json`):
```json
{
  "mcpServers": {
    "markitdown": {
      "command": "uv",
      "args": [
        "--directory",
        "C:\\Users\\Timedoor\\Downloads\\nugget nihonggo project\\scratch\\tooling-lab",
        "run",
        "python",
        "-m",
        "markitdown_mcp"
      ]
    }
  }
}
```
