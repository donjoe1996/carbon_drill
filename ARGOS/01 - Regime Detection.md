---
tags: [trading, regime-detection, HMM, ARGOS]
type: component
links: [[00 - Algorithm MOC]]
---

# 🔍 Regime Detection (Phases 1–3)

> [!info] Covers 3 pipeline phases
> Phase 1 = data · Phase 2 = HMM fit · Phase 3 = state inference & labelling.
> All downstream components — signals, sizing, execution — are conditioned on the regime output here.

---

## Phase 1 — Data Collection & Preprocessing

**Code:** [src/data/phase1_data.py](https://github.com/donjoe1996/ARGOS/blob/main/src/data/phase1_data.py) · `run_phase1(verbose=True)`

| Parameter | Value |
|---|---|
| Assets | BTC, ETH, BNB, SOL |
| Data source | CoinGecko free tier |
| Feature | Daily price differences (Pₜ − Pₜ₋₁) |
| Stationarity check | Yes — applied before model fit |
| Output | `prices` DataFrame, `diffs` DataFrame, `stats` dict |

> [!warning] Rate limit
> CoinGecko free tier hits 429 errors on rapid consecutive calls. Hourly cron spacing avoids this in normal operation. See [[10 - Order Execution & Broker Integration]].

---

## Phase 2 — HMM Model Fitting

**Code:** [src/strategy/phase2_model.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase2_model.py) · `run_phase2(diffs, verbose=True)`

| Parameter | Value | Notes |
|---|---|---|
| Model | Multivariate Gaussian HMM (MGWN) | From `hmmlearn` |
| Number of states (k) | 3 | **Not validated — see gap below** |
| EM algorithm | Baum-Welch | Standard HMM training |
| Convergence check | `model.monitor_.converged` | Checked in `main.py` success criteria |
| Output | Fitted `model` object, `params` dict | |

> [!danger] Critical Gap — k=3 assumed, not validated
> The state count is taken from prior literature, not derived from AIC/BIC on the actual BTC/ETH/BNB/SOL data. This is listed as a **Critical** gap in the Gap Report. Phase 1 of the Build Phase Status addresses this.

---

## Phase 3 — State Inference & Regime Labelling

**Code:** [src/strategy/phase3_states.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase3_states.py) · `run_phase3(model, diffs)` · `_label_regimes(model, cols)`

### The 3 Regimes

| State ID | Label | Colour | Description |
|---|---|---|---|
| S0 | 🟢 Stable | `#2ecc71` green | Low volatility, sideways / mild trend |
| S1 | 🔴 Bear | `#e74c3c` red | Sustained downward price action |
| S2 | 🔵 Bull | `#3498db` blue | Sustained upward price action |

### Output columns (`regime_df`)

| Column | Description |
|---|---|
| `P(S0)`, `P(S1)`, `P(S2)` | Smoothed state probabilities per day |
| `Most_Likely_State` | Argmax of smoothed probabilities |
| `Regime_Name` | Human-readable label from `_label_regimes()` |

> [!warning] Look-ahead bias
> `run_phase3()` uses **smoothed** probabilities from the full-sample fit. These look into the future. Only the rolling backtest in `run_phase5_fixed()` is bias-free. See [[04 - Backtesting & Metrics]].

---

## Rolling Refit (live trading)

In `run_phase5_fixed()` and `run_daily.py`, the HMM is **refit every trading day** on a rolling 30-day window of price differences — this eliminates look-ahead bias for live signals.

**Window:** `ROLLING_WINDOW_DAYS = 30` (defined in `phase5_trading.py`)

---

## 🔗 Connections

- Rolling refit mechanics → [[08 - Regime Switching Logic]]
- Regime output gates signals → [[09 - Signal Generation in Code]]
- Regime multipliers affect sizing → [[03 - Risk & Position Sizing]]
- Per-regime performance breakdown → [[04 - Backtesting & Metrics]]
- k validation research → [[05 - Research Log]]
- Full file index → [[07 - Codebase Map]]
