# Logs Directory

Folder ini untuk menyimpan log output dari Termux scripts.

- Log files (*.log) di-ignore oleh git
- Semua script menulis ke `~/.nugget_patch_log` (shared, global log file)
- Optional: individual scripts bisa menulis ke file lokal di folder ini untuk debugging

**Format log:** `[TIMESTAMP] [script_name] message`

**Contoh:**
```
[2026-03-30 14:23:01] [merge_script] Merge selesai
[2026-03-30 14:23:05] [merge_script] State file di-push ke remote
```

Bersihkan log lama secara berkala:
```bash
rm logs/*.log
```
