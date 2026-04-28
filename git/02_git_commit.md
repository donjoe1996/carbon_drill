# Git Commit

## Dependency Principle
> Requires: [[00_Git_Introduction]], [[01_Git_Add]]
> Specifically: Blob, Index, SHA hashing, content-addressability

---

## What `git commit` Does

`git commit` **crystallizes the Index into permanent, immutable history.**

```
Index (mutable workbench)
    ↓ git commit freezes into
Tree (immutable snapshot: filename → Blob SHAs)
    ↓ wrapped by
Commit object (Tree SHA + parent SHA + message + author)
    ↓ points backward to
Parent Commit → Parent Tree → Parent Blobs
```

---

## The Two Objects Created

### Tree
A **frozen snapshot of the Index** — same structure, different nature.

| | Index | Tree |
|---|---|---|
| **Lives in** | `.git/index` | `.git/objects/` |
| **Mutable?** | Yes | Never |
| **Purpose** | Workbench | Historical record |

Tree contains: `filename → Blob SHA` mappings. Nothing more.

### Commit
Wraps the Tree with context:

```
Commit {
    tree:    <Tree SHA>
    parent:  <Parent Commit SHA>
    author:  name + timestamp
    message: "your message"
}
```

The Commit object is then **SHA-hashed** → stored in `.git/objects/`

---

## The Linked List

Commits form a **linked list** — each pointing backward to its parent:

```
C1(aaa) ← C2(bbb) ← C3(ccc) ← HEAD
```

> A commit does not **contain** history.
> It **references** its parent SHA — history is traversable through the chain.

---

## Immutability — The Cryptographic Chain

A Commit's SHA is derived from:
- Tree SHA
- Parent SHA
- Author + timestamp
- Message

> Changing **anything** produces a completely different SHA.

### The cascade consequence:
```
Edit C1 → new SHA: xxx
C2 parent must update → C2 content changes → new SHA: yyy
C3 parent must update → C3 content changes → new SHA: zzz

Old chain: C1(aaa) → C2(bbb) → C3(ccc)  ← orphaned
New chain: C1(xxx) → C2(yyy) → C3(zzz)  ← new universe
```

> **Editing any commit collapses the old chain and creates a new lineage.**
> Git history is cryptographically tamper-evident — same principle as blockchain.

---

## Practical Consequences

| Action | What actually happens |
|---|---|
| `git commit --amend` | New commit object, old one orphaned |
| `git rebase` | Rewrites chain from rebase point forward |
| `git push --force` | Forces remote to replace its chain with yours |

---

## The Law of `git commit`

> **Permanence begins here.** Everything before (Index, Working Directory) is mutable.
> A commit is immutable — it is a fingerprint of all decisions that led to it.

---

## Related Notes
- [[00_Git_Introduction]]
- [[01_Git_Add]] — what commit crystallizes
- [[03_Git_Status]] — watches the gap between add and commit
- [[04_Git_Log]] — traverses the commit linked list
- [[05_Git_Push]] — replicates the commit chain to remote
