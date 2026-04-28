# 🖥️ Operating Systems Basics
#cybersecurity #phase1 #OS #atomic-note

**Status:** 🔲 Not started
**MOC:** [[Cybersecurity MOC]] | [[Phase 1 - What IS a Computer?]]

---

## 1. Definition
> An Operating System (OS) is software that acts as an **intermediary** between hardware and user programs.

It manages:
- **CPU time** — who runs when
- **Memory** — who gets what space
- **Storage** — how data is written/read
- **I/O devices** — keyboard, screen, network

---

## 2. Why Does It Exist? *(First Principle)*
Without an OS, every program would need to:
- Talk directly to hardware (impossible at scale)
- Manage its own memory (chaos + crashes)
- Reinvent file storage (inefficient)

> 🧠 *Ontology:* The OS is the **contract** between physical reality (hardware) and abstract logic (software).

---

## 3. Core Components

### 🧠 Kernel
- The **core** of the OS — runs in privileged mode
- Directly controls hardware
- Types: Monolithic (Linux), Microkernel (MINIX), Hybrid (Windows)

### 🐚 Shell
- The **interface** to the kernel
- CLI (bash, zsh) or GUI (GNOME, Windows Explorer)
- Hackers prefer CLI — more power, less overhead

### ⚙️ Processes
- A **running instance** of a program
- Each has: PID, memory space, state (running/sleeping/zombie)
- OS schedules processes via the **scheduler**

### 📁 File System
- Organizes data on disk
- Linux: everything is a file (even hardware!)
- Hierarchy starts at `/` (root)

```
/
├── bin/      # Essential binaries
├── etc/      # Config files
├── home/     # User directories
├── var/      # Logs, variable data
└── proc/     # Virtual FS — live kernel/process info
```

### 🔐 Permissions Model
```
Owner | Group | Others
 rwx  |  rwx  |  rwx
```
- `r` = read | `w` = write | `x` = execute
- Root (uid=0) bypasses all permissions → **primary hacker target**

---

## 4. OS Types Relevant to Hacking

| OS | Role | Why It Matters |
|----|------|----------------|
| **Linux** | Attack + server | Open source, powerful CLI |
| **Kali Linux** | Hacking distro | Pre-built tools |
| **Windows** | Primary target | Most enterprise systems |
| **macOS** | Unix-based target | BSD kernel underneath |

---

## 5. Key Concepts to Internalize

- [ ] **Kernel space vs User space** — privilege separation
- [ ] **System calls (syscalls)** — how programs ask the kernel for help
- [ ] **Interrupts** — hardware signals that pause the CPU
- [ ] **Virtual memory** — each process thinks it owns all RAM

---

## 6. 🏋️ Practice Exercise

**Goal:** Experience the OS, don't just read about it.

```bash
# 1. See running processes
ps aux

# 2. Inspect the live kernel/process virtual FS
ls /proc
cat /proc/cpuinfo

# 3. Check your own process
echo $$          # your shell PID
cat /proc/$$/status

# 4. File permissions drill
touch testfile
ls -la testfile
chmod 777 testfile
chmod 400 testfile  # read-only, owner only
ls -la testfile

# 5. Find SUID files (common hacking vector)
find / -perm -4000 2>/dev/null
```

**Reflection questions after exercise:**
1. What is the PID of your shell?
2. What does SUID mean for security?
3. Why is `/proc` significant to a hacker?

---

## 7. 🔗 Linked Atomic Notes
- [[Binary & Bits]] ← prerequisite
- [[Linux CLI Fundamentals]] → next
- [[Permissions & Processes]] → deep dive
- [[Kernel Space vs User Space]] → advanced

---

## 8. Resources
- 📘 *Operating Systems: Three Easy Pieces* — Arpaci-Dusseau (free online)
- 🌐 [Linux Journey](https://linuxjourney.com) — interactive CLI learning
- 🎮 TryHackMe → Room: *Linux Fundamentals Part 1*

---
*"The OS is the god of the machine — understand it, and you understand power."*
