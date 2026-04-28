---
tags: [trading, MOC, ARGOS, HMM]
type: MOC
updated: 2026-04-26
---

# 🗺️ ARGOS — Map of Content

> [!abstract] What is ARGOS?
> **A Self-Correcting, Regime-Aware Algorithmic Trading Framework.**
> ARGOS continuously infers hidden market states, validates structural edges, and deploys capital with probabilistic precision — correcting itself as market structure evolves.
> **Assets:** BTC / ETH / BNB / SOL · **Data:** CoinGecko · **Mode:** Paper trading

**Repo:** [github.com/donjoe1996/ARGOS](https://github.com/donjoe1996/ARGOS) · See [[07 - Codebase Map]] for the full file index.

---

## ⚖️ The 4 Laws

| # | Law | Status |
|---|---|---|
| 1 | No edge is regime-independent | ❌ Violated — single rank-forecast edge across all regimes |
| 2 | Probability governs all decisions — never binary switches | ❌ Violated — sizing is binary (0% or fixed 25%) |
| 3 | Structure before signal — regime classified before any trade | ✅ Met — rolling HMM refit precedes every signal |
| 4 | All parameters expire — calibration is continuous, not one-time | 🟡 Partial — model refits, hyperparameters do not |

---

## ⚙️ System Pipeline

```
CoinGecko API
      │
      ▼
[[01 - Regime Detection]]              Phase 1–3: OHLCV → Daily diffs → MGWN HMM k=3 → S0/S1/S2 labels
      │
      ▼
[[08 - Regime Switching Logic]]        Confidence gate ≥ 0.75 + rolling 30d refit
      │
      ▼
[[09 - Signal Generation in Code]]     Phase 4–5: Regime-conditional forecast → beta-ranked long/short
      │
      ▼
[[03 - Risk & Position Sizing]]        25% per leg, 2% stop-loss, max 4 concurrent positions
      │
      ▼
[[10 - Order Execution & Broker]]      Paper: run_daily.py (midnight UTC) + monitor_sl.py (hourly)
      │
      ▼
[[04 - Backtesting & Metrics]]         Walk-forward IS/OOS · Sharpe 1.60 · MaxDD −10.2%
```

---

## 📋 Component Index

| Component | Concept Note | Primary Code File | Status |
|---|---|---|---|
| Data download & stationarity | [[01 - Regime Detection]] | [phase1_data.py](https://github.com/donjoe1996/ARGOS/blob/main/src/data/phase1_data.py) | ✅ |
| HMM model fitting | [[01 - Regime Detection]] | [phase2_model.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase2_model.py) | ✅ |
| State inference & labelling | [[01 - Regime Detection]] | [phase3_states.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase3_states.py) | 🟡 |
| Regime confidence gate & switching | [[08 - Regime Switching Logic]] | [phase5_trading.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase5_trading.py) | 🟡 |
| Forecast generation | [[09 - Signal Generation in Code]] | [phase4_forecast.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase4_forecast.py) | 🟡 |
| Signal & trading logic | [[09 - Signal Generation in Code]] | [phase5_trading.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase5_trading.py) | 🟡 |
| Risk & position sizing | [[03 - Risk & Position Sizing]] | [phase5_trading.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase5_trading.py) | 🟡 |
| Entry & exit signal rules | [[02 - Entry & Exit Signals]] | [signal_generator.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/signal_generator.py) | 🟡 |
| Paper trading daily runner | [[10 - Order Execution & Broker]] | [run_daily.py](https://github.com/donjoe1996/ARGOS/blob/main/src/execution/run_daily.py) | 🟡 |
| Hourly stop-loss monitor | [[10 - Order Execution & Broker]] | [monitor_sl.py](https://github.com/donjoe1996/ARGOS/blob/main/src/execution/monitor_sl.py) | 🟡 |
| Backtesting & walk-forward | [[04 - Backtesting & Metrics]] | [main_fixed.py](https://github.com/donjoe1996/ARGOS/blob/main/main_fixed.py) | 🟡 |

---

## 🏗️ Build Phase Status (ARGOS Framework)

| Phase | Task | Status |
|---|---|---|
| 1 | State count validation via AIC/BIC | ⬜ Not Started — **critical gap** |
| 2 | HMM + EM estimation | ✅ Complete |
| 3 | Hamilton Filter | 🟡 Partial |
| 4 | Calibration protocol | 🟡 Partial |
| 5 | Edge-regime mapping | ⬜ Not Started |
| 6 | Walk-forward validation | 🟡 Partial — OOS Sharpe 1.23 ✓ |
| 7 | Risk + sizing engine | 🟡 Partial |
| 8 | Execution layer | 🟡 Partial — paper only |

---

## 📚 Supporting Notes

- [[07 - Codebase Map]] — Full `src/` folder mapped to GitHub links
- [[05 - Research Log]] — Papers, open questions, experiment backlog
- [[06 - Trade Journal]] — Paper trading log and live performance
