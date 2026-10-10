---
name: playwright-cli
description: "Execute token-efficient browser automation, headless UI inspection, interaction verification, and screenshot testing using the @playwright/cli tool."
---

# Playwright CLI Skill for AI Coding Agents

The `@playwright/cli` tool provides a token-efficient command-line interface for browser automation. It avoids polluting the LLM context window with massive DOM accessibility trees by executing concise commands and providing targeted snapshots with short element references (e.g. `e1`, `e15`).

## Installation & Environment

`@playwright/cli` is installed as a development dependency in `nugget-nihongo`.
Commands can be invoked via `npx playwright-cli <command>`.

## Core Agentic Workflows

### 1. Launch & Navigate
```bash
# Open a URL in headless mode (default)
npx playwright-cli open http://localhost:5173

# Open with visible browser window (for interactive debugging)
npx playwright-cli open http://localhost:5173 --headed

# Navigate to a specific route or hash
npx playwright-cli goto http://localhost:5173/#quiz
```

### 2. Multi-Device Viewport Emulation
Test responsive design across target viewports without launching heavy devtools:
```bash
# Ultra-compact iPhone SE (375x667)
npx playwright-cli resize 375 667

# Standard modern mobile (390x844)
npx playwright-cli resize 390 844

# Tablet iPad (768x1024)
npx playwright-cli resize 768 1024

# Desktop wide display (1440x900)
npx playwright-cli resize 1440 900
```

### 3. Snapshot & Element Discovery
Get compact, numbered element identifiers:
```bash
# Capture full page snapshot with numbered element handles (e.g. e1, e2, e3)
npx playwright-cli snapshot

# Search for specific text or button
npx playwright-cli find "Mulai Kuis"
npx playwright-cli find "Flashcard 3D"
```

### 4. Interactive Testing
```bash
# Click a target using element ID from snapshot
npx playwright-cli click e12

# Fill text into an input field
npx playwright-cli fill e5 "tabetai"

# Press keyboard shortcuts
npx playwright-cli press Enter
npx playwright-cli press Space
npx playwright-cli press Escape

# Emulate color scheme
npx playwright-cli set-color-scheme dark
```

### 5. Visual Proof & Screenshots
```bash
# Take screenshot of the entire page
npx playwright-cli screenshot

# Take screenshot of a specific component
npx playwright-cli screenshot e10
```

### 6. Cleanup & Session Lifecycle
```bash
# List active browser sessions
npx playwright-cli list

# Close all browser sessions
npx playwright-cli close-all

# Kill zombie/stale processes if any
npx playwright-cli kill-all
```
