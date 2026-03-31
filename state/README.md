# State Directory

Folder ini untuk menyimpan state files — metadata penting tentang workspace dan history.

## Files dalam Folder Ini

| File | Peran | Diupdate Oleh |
|------|-------|---|
| `main-project-state.md` | Orientasi project terkini — versi, last merge, open tasks, INC summary | `merge_script.sh` (setiap merge) |
| `last-stable-sha.txt` | SHA commit terakhir yang stable — untuk rollback | `push_script.sh` + `merge_script.sh` |
| `rollback-history.log` | Audit trail — kapan rollback terjadi dan SHA targetnya | `rollback_script.sh` |
| `*.bak_*` | Backup state files — di-ignore git | Auto-created sebelum update |

## Struktur File State

**main-project-state.md:**
```markdown
# PROJECT STATE — Nugget Nihongo
Versi aktif  : v14.27.3
Last merge   : TASK-INFRA-1 — 2026-03-30 14:23:01
Branch main  : abc1234
Last updated : 2026-03-30 14:23:01

## Open Tasks Summary
[ringkasan task open dari _MAP.md]

## INC Open
[ringkasan inconsistency open dari INCONSISTENCY-DB.md]
```

**last-stable-sha.txt:**
```
abc123456789def0987654321fedcba
```
(satu baris: SHA penuh commit)

**rollback-history.log:**
```
[2026-03-30 14:15:00] [rollback] Rollback to abc1234 — reason: post-merge conflict
[2026-03-30 14:20:00] [rollback] Rollback to def5678 — reason: test recovery
```

## .gitignore

State folder itu sendiri terlacak git, tapi file backup (*.bak_*) dan log di-ignore:
```
state/*.bak_*
state/*.log
!state/.gitkeep
```

## Penggunaan

1. **Sebelum push:** SHA disimpan di last-stable-sha.txt (safety net untuk rollback)
2. **Setelah merge:** main-project-state.md di-update — wajib (G1)
3. **Jika ada masalah post-merge:** rollback_script.sh baca last-stable-sha.txt
