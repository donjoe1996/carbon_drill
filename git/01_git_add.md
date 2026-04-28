# Git Add

## Dependency Principle
> Understanding this note requires: [[00_Git_Introduction]] — specifically content-addressability and the OS file problem.

---

## What `git add` Does

`git add` **copies** a file and separates its two concerns:

```
Your file (content + identity fused by OS)
        ↓
git add separates:

Content  → Blob (SHA)  → stored in .git/objects/
Identity → Index entry → stored in .git/index
```

> The original file on disk is **never touched.**

---

## What is a Blob?

A Blob is **pure content — stripped of identity.**

- No filename
- No path
- No timestamp
- Just bytes, hashed by SHA

```
Blob = SHA(content) → .git/objects/ab/cd1234...
```

**Key insight:** If two files have identical content → git stores **one Blob.** Content is the address (primary identity in git world)

---

## What is the Index?

The Index (staging area) holds the **identity layer** — the **mapping** - it's relational:

```
filename/path → SHA (points to Blob)
```

Stored in `.git/index`

**Key insight:** It's not just the filename alone — it's the **bridge** between the human world (names) and git's world (SHA).

---

## The Law of `git add`

| Entity                   | Behavior                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------- |
| **Blob** `.git/objects/` | **Append-only. Never overwritten.** Different content = different SHA = new object |
| **Index** `.git/index`   | **Always updated.** One entry per filename. Latest `git add` wins                  |

### Example:
```bash
echo "hello" > file.txt
git add file.txt        # Blob aaa111 created, Index → aaa111

echo "world" > file.txt
git add file.txt        # Blob bbb222 created, Index → bbb222
                        # aaa111 still exists in .git/objects/
```

---

## What `git add` is NOT

- It does **not** preserve sequence or history
- It does **not** give you time travel
- The Index is **mutable** — always reflects only the latest add

> Permanence begins only at `git commit`

---

## Useful Commands

| Command | What you see |
|---|---|
| `git status` | Human-friendly staged/unstaged overview |
| `git diff` | Working Directory vs Index |
| `git diff --cached` | Index vs Last Commit |
| `git ls-files --stage` | Raw Index: filename → SHA |

---

## Orphaned Blobs
Old Blobs with no commit referencing them become **orphaned** — stored but unreachable. Git handles these via garbage collection (`git gc`).

---

## Related Notes
- [[00_Git_Introduction]]
- [[02_Git_Commit]] — where Blobs become permanent history
- [[03_Git_Status]] — watches Index and Working Directory
