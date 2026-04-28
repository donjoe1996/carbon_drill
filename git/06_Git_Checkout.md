# Git Checkout

## Dependency Principle
> Requires: [[00_Git_Introduction]], [[01_Git_Add]], [[02_Git_Commit]]
> Specifically: Blob, Tree, Commit chain, SHA as identity, HEAD

---

## What is HEAD?

HEAD is a **file** in your git repo:

```
.git/HEAD
```

Contents:
```
ref: refs/heads/main
```

HEAD is simply **"you are here"** — a pointer to your current branch.

---

## What is a Branch?

A branch is a **text file containing one SHA:**

```
.git/refs/heads/main    → a1b2c3d4e5f6...
.git/refs/heads/feature → x9y8z7w6v5...
```

Not a copy. Not a folder. **One SHA — pointing to one Commit.**

---

## The Pointer Chain

```
HEAD → branch → Commit → Tree → Blobs → your files
```

Every element is a pointer. Content lives only at the terminus — **Blobs.**

---

## What `git checkout` Does

```bash
git checkout feature
```

Three things happen:

```
1. HEAD re-points    → feature branch
2. Git reads         → that Commit's Tree
3. Git rewrites      → Working Directory from Tree's Blobs
```

### Git is careful when rewriting:
- Checks for **uncommitted changes** first — warns if you'd lose work
- Only rewrites files that **differ** between branches
- Leaves **identical** files untouched

---

## Creating vs Switching

```bash
git checkout feature       # SWITCH to existing branch
git checkout -b feature    # CREATE new branch + switch
```

Creating a new branch:
```
HEAD → feature → same Commit as main
```

> A new branch starts as a **pointer to the same commit** — no content is copied.

---

## Detached HEAD State

```bash
git checkout a1b2c3...    # checkout a specific commit SHA
```

HEAD points directly to a Commit — **no branch between them:**

```
Normal:   HEAD → main → Commit
Detached: HEAD --------→ Commit
```

**Danger:** Any new commits made in detached HEAD have no branch pointing to them.
After switching away → those commits become **orphaned** → eventually removed by `git gc`.

---

## The Law of `git checkout`

> `git checkout` = **moving HEAD** through the pointer chain
> and **materializing Blobs** onto your Working Directory.

No content is duplicated. No new objects created.
Just pointer movement + Blob extraction.

---

## The Full System — Complete Picture

```
git add      → Blob into .git/objects/, filename into Index
git commit   → Index freezes into Tree, wrapped by Commit object
git push     → Commit chain replicated to remote
git checkout → HEAD moves, Working Directory rewritten from Blobs
```

> **Everything is objects and pointers navigating toward content.**

---

## Related Notes
- [[00_Git_Introduction]]
- [[02_Git_Commit]] — what checkout navigates
- [[05_Git_Push]] — replicating the same chain remotely
