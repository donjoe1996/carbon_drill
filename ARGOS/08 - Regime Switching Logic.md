---
tags: [trading, regime-switching, ARGOS]
type: concept
links: [[00 - Algorithm MOC]]
---

# 🔀 Regime Switching Logic

> [!info] How this relates to Regime Detection
> [[01 - Regime Detection]] defines how states are classified. This note covers **what triggers a switch** (confidence gate + rolling refit) and **what happens downstream** when a switch fires.

**Code:** [src/strategy/phase5_trading.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase5_trading.py)

---

## The Confidence Gate

Before any trade is considered, the current regime must pass a probability threshold:

```python
CONFIDENCE_THRESHOLD = 0.75  # defined in phase5_trading.py

# Each day:
confidence = max(P(S0), P(S1), P(S2))

if confidence >= CONFIDENCE_THRESHOLD:
    # proceed to signal generation
else:
    # skip — no trade today
```

**Effect:** Approximately 30–40% of trading days are filtered out by this gate. Days with uncertain regime (e.g. a transition where no state has >75% probability) produce no position.

---

## Rolling 30-Day Refit (the fix for look-ahead bias)

In `run_phase5_fixed()` and the live `run_daily.py`, the HMM is refit **every trading day** on the most recent 30 days:

```
Today (day N):
  1. Take diffs[N-30 : N]              ← rolling window
  2. Fit new HMM on this window
  3. Run Viterbi / filtering on window → get today's regime probabilities
  4. Apply confidence gate
  5. If gate passes → generate signal
```

**Key distinction vs `main.py`:** The global model in `main.py` uses smoothed probabilities from the full-sample fit — this leaks future information backward. Only the rolling path is valid for live trading.

`ROLLING_WINDOW_DAYS = 30` (defined in `phase5_trading.py`)

---

## The 3 Regimes & Transitions

| From → To | Likely Trigger | Action on Open Positions |
|---|---|---|
| Stable → Bull | Confidence shifts to S2 ≥ 0.75 | No forced exit (gap — see below) |
| Stable → Bear | Confidence shifts to S1 ≥ 0.75 | No forced exit (gap — see below) |
| Bull → Bear | Trend reversal in 30d window | No forced exit (gap — see below) |
| Any → Confidence < 0.75 | Ambiguous period | **No new trades** |

> [!danger] Gap — No Regime-Change Exit
> Currently, open positions are **not** automatically closed when the regime switches. The daily runner enters and exits on a 1-day hold cycle regardless of mid-day regime changes. A proper regime-change exit would close longs immediately on a Bull→Bear transition. This is listed as a **High severity** gap in the Gap Report.

---

## Regime Staleness Check (absent)

> [!warning] High Severity Gap
> At execution time in `run_daily.py`, there is **no check** that the regime classification is still valid (i.e. the rolling model was fit on today's data, not stale data from hours ago). If the script runs at midnight and data is delayed, the regime could be based on outdated inputs.

**Target behaviour:** At signal generation time, verify `last_refit_timestamp` is within an acceptable window (e.g. ≤ 1 hour).

---

## Walk-Forward Windows

`main_fixed.py` slices the backtest into IS/OOS zones and named windows to assess regime stability over time:

```python
SPLIT_DATE = pd.Timestamp("2025-01-01")  # IS/OOS boundary

WF_WINDOWS = [
    {"name": "W1", "start": "2024-01-01", "end": "2024-12-31"},
    {"name": "W2", "start": "2025-01-01", "end": "2025-12-31"},
    {"name": "W3", "start": "2026-01-01", "end": "2026-12-31"},
]

ACCEPT_SHARPE = 1.2
ACCEPT_MAX_DD = -15.0
```

OOS result: Sharpe **1.23** ✓ — passes acceptance criteria.

---

## 🔗 Connections

- Regime classification input → [[01 - Regime Detection]]
- Signal gated by confidence → [[09 - Signal Generation in Code]]
- Position sizing scaled by regime → [[03 - Risk & Position Sizing]]
- Walk-forward results → [[04 - Backtesting & Metrics]]
- Regime-change exit research → [[05 - Research Log]]
- Code file index → [[07 - Codebase Map]]
