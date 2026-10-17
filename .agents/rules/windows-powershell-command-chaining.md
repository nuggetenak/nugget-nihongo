---
name: windows-powershell-command-chaining
description: Enforce Windows-compatible command chaining (cmd /c or semicolon) to avoid PowerShell parser errors
trigger: always_on
---

# Windows PowerShell Command Chaining Rule

When executing shell commands or automation pipelines in Windows environments:

1. **No POSIX Chaining (`&&`) in Raw PowerShell**:
   - In Windows PowerShell, `&&` is not universally supported and frequently errors with `The token '&&' is not a valid statement separator`.
   - Always use `;` for sequential statement separation in PowerShell, or wrap combined commands in `cmd /c "command1 && command2"`.
2. **Module Type Awareness & Package Lockstep**:
   - For Node.js scripts executed directly via CLI, either ensure `package.json` specifies `"type": "module"`, or use `.mjs` extensions / CommonJS syntax to eliminate reparsing overhead and warnings.
   - When updating `package.json`, immediately synchronize `package-lock.json` (`npm i --package-lock-only --legacy-peer-deps`) and maintain `.npmrc` with `legacy-peer-deps=true` to prevent CI `npm ci` failures.
