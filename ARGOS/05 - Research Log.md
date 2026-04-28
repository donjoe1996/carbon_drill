---
tags: [trading, research, ARGOS]
type: log
links: [[00 - Algorithm MOC]]
---

# 🧪 Research Log

> [!info] Purpose
> A running log of open questions, experiment ideas, and literature relevant to ARGOS. Validated experiments live in `docs/` on GitHub. Ideas that haven't been tested yet live here.

---

## 🔴 Critical Open Questions

These are blockers or high-priority gaps from the Gap Report:

### 1. How many states should k be?
- **Problem:** k=3 was assumed from prior literature, not validated on BTC/ETH/BNB/SOL data
- **Method:** Fit HMMs for k=2,3,4,5 on ≥365 days of data. Compare AIC and BIC scores. Choose k at the elbow.
- **Code target:** New function in `phase2_model.py` — `validate_state_count(diffs, k_range)`
- **Links:** [[01 - Regime Detection]] · [phase2_model.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase2_model.py)
- **Status:** ⬜ Not started — Phase 1 of Build Phase Status

### 2. What edge should each regime have?
- **Problem:** Same rank-forecast long/short is deployed in all regimes — Law 1 violation
- **Hypothesis:** Bull regime → momentum/trend-following works better. Bear → short-bias + defensive. Stable → mean-reversion
- **Experiment:** Define regime-specific signal classes. Gate each by regime. Measure per-regime Sharpe separately.
- **Baseline:** Regime gating alone gets to −3.1% / Sharpe −0.12 (best result so far). See [docs/regime_gated_experiment.md](https://github.com/donjoe1996/ARGOS/blob/main/docs/regime_gated_experiment.md)
- **Links:** [[02 - Entry & Exit Signals]] · [[09 - Signal Generation in Code]]
- **Status:** 🟡 In progress

### 3. How should sizing scale with confidence?
- **Problem:** Binary sizing violates Law 2 — confidence of 0.76 and 0.99 get same 25% size
- **Hypothesis:** Proportional scaling (`size = base × confidence`) improves risk-adjusted returns
- **Method:** Implement in `phase5_trading.py`, rerun walk-forward, compare Sharpe and MaxDD
- **Links:** [[03 - Risk & Position Sizing]]
- **Status:** ⬜ Not started

### 4. Is the rolling 30-day window optimal?
- **Problem:** 30 days may be too short for stable regime labels, too long to be responsive
- **Experiment:** Grid search over window sizes (21d, 30d, 45d, 60d, 90d). Measure regime label stability (flip frequency) and OOS Sharpe.
- **Note:** The regime-gated experiment recommends trying 60–90d windows for more stable labels
- **Links:** [[08 - Regime Switching Logic]]
- **Status:** ⬜ Not started

---

## 🟡 Secondary Ideas

### 5. Regime-specific Sharpe tracking
- Currently absent from walk-forward output
- Add per-regime P&L attribution to `performance_metrics()`
- Would immediately reveal which regime drives / destroys returns
- **Links:** [[04 - Backtesting & Metrics]]

### 6. Regime-change exit rule
- Open positions are not closed on regime switch — High severity gap
- Define: on Bull→Bear, close all longs immediately (market order or next-day)
- **Links:** [[08 - Regime Switching Logic]] · [[10 - Order Execution & Broker Integration]]

### 7. Parameter drift detection
- Hyperparameters (k, window, threshold) don't auto-expire — Law 4 partial violation
- Could track rolling Sharpe and trigger recalibration when it drops below threshold
- **Links:** [[00 - Algorithm MOC]]

### 8. Transaction cost model completeness
- Current model: 0.10% per trade, no slippage or market impact
- P(daily return < −2%): BTC 13%, ETH 23%, BNB 23%, SOL 33% — 2% SL not a rare event
- Real cost likely higher for SOL/BNB due to lower liquidity
- **Links:** [[03 - Risk & Position Sizing]] · [[04 - Backtesting & Metrics]]

---

## 📄 Literature Index

| Paper | Authors | Relevance | Applied? |
|---|---|---|---|
| Analysis of time series subject to changes in regime | Hamilton (1990) | Foundational HMM regime-switching framework | Yes — core model |
| Regime switches and commonalities of the cryptocurrencies asset class | Figà-Talamanca et al. (2021) | k=3 state justification for crypto | Partially — k assumed not validated |
| A tutorial on hidden Markov models | Rabiner (1989) | HMM theory, Baum-Welch, Viterbi | Yes — implementation basis |

---

## ✅ Completed Experiments

| Experiment | Result | Doc |
|---|---|---|
| Fixed 2% SL daily vs hourly | Hourly is realistic baseline: −29.7% / Sharpe −1.08 | [link](https://github.com/donjoe1996/ARGOS/blob/main/docs/fixed_sl_hourly_experiment.md) |
| Trailing stop (1–10%) | Ruled out — fires on noise, −41.1% worst case | [link](https://github.com/donjoe1996/ARGOS/blob/main/docs/trailing_stop_experiment.md) |
| ATR×k dynamic SL | ATR×2.5 best: −19.5% / Sharpe −0.75 — ruled out | [link](https://github.com/donjoe1996/ARGOS/blob/main/docs/atr_sl_experiment.md) |
| Distribution-calibrated SL | Normal 10th pct best: −16.1% / Sharpe −0.60 | [link](https://github.com/donjoe1996/ARGOS/blob/main/docs/distribution_sl_experiment.md) |
| Regime gate + beta rank + prop. sizing | **−3.1% / Sharpe −0.12** — best result to date | [link](https://github.com/donjoe1996/ARGOS/blob/main/docs/regime_gated_experiment.md) |

> **Conclusion:** SL design is exhausted as a lever. The root cause is Law 1 violation. Next frontier: regime-specific signal logic.

---

## 🔗 Connections

- Regime model gaps → [[01 - Regime Detection]]
- Signal ideas → [[02 - Entry & Exit Signals]]
- Sizing ideas → [[03 - Risk & Position Sizing]]
- Validate all ideas with → [[04 - Backtesting & Metrics]]
