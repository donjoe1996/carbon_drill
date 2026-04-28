# Git — Introduction

##  Socratic learning method
> [Claude](https://claude.ai/share/dd5db9c9-1917-489b-ad87-654813d6c7cc)

## Dependency Principle
> Understanding this note requires knowing: **content-addressability**, **SHA hashing**, **OS file structure** 

---

## What Git Is NOT
- Git is **not a file tracker**
- Git is **not a "track changes" tool**

## What Git IS
Git is a **Content-Addressable File System** — a store where content is identified by what it *is*, not where it *lives*.

---

## The Core Problem Git Solves
Operating systems mix two concerns into one file:

| Concern      | Example                            |
| ------------ | ---------------------------------- |
| **Content**  | `"hello world"`                    |
| **Identity** | `src/hello.txt`, permissions, path |

Git **deliberately separates** these two concerns. This single decision is the foundation of everything else.

## Git's ontological inversion
Git perspective is quite the opposite from Operating System (OS) perspective

|                      | OS                                 | Git              |
| -------------------- | ---------------------------------- | ---------------- |
| **Primary identity** | Filename (path)                    | SHA (content)    |
| **Secondary**        | `src/hello.txt`, permissions, path | Filename (Index) |

A file can be **renamed** in git — the Blob doesn't change. A file's **content changes** — completely new identity (new SHA).

---
## The Four Git Objects
Everything in git is one of these:

| Object | What it is |
|---|---|
| **Blob** | Pure file content — no name, no path |
| **Tree** | A directory — maps filenames → Blobs |
| **Commit** | A snapshot — points to Tree + parent + metadata |
| **Tag** | A named pointer (advanced) |

Each object is SHA-hashed. The hash **is** its identity.

---

## The Full System
```
git add     → creates Blob, updates Index
git commit  → crystallizes Index into Tree + Commit
git push    → replicates commit chain to remote
git checkout→ moves HEAD, rewrites disk from Blobs
```

---

## Related Notes
- [[01_Git_Add]]
- [[02_Git_Commit]]
- [[03_Git_Status]]
- [[04_Git_Log]]
- [[05_Git_Push]]
- [[06_Git_Checkout]]

