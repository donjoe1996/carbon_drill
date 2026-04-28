---
tags: [trading, backtesting, metrics, ARGOS]
type: component
links: [[00 - Algorithm MOC]]
---

# 📊 Backtesting & Performance Metrics

**Code:** [main_fixed.py](https://github.com/donjoe1996/ARGOS/blob/main/main_fixed.py) · `run_phase5_fixed()` · `performance_metrics()`
**Output files:** `outputs/data/trade_log_fixed.csv` · `outputs/plots/plot_pnl_fixed.png` · `outputs/plots/plot_wf.png`

---

## ⚙️ Backtest Configuration

| Parameter | Value |
|---|---|
| Assets | BTC, ETH, BNB, SOL |
| Period | 2022-01-01 → 2026-04-25 |
| Rolling HMM window | 30 days (`ROLLING_WINDOW_DAYS`) |
| Confidence threshold | ≥ 0.75 (`CONFIDENCE_THRESHOLD`) |
| Stop-loss | 2% per leg (`STOP_LOSS_PCT`) |
| Position size | 25% per leg |
| Transaction cost | 0.10% per trade |
| Data source | CoinGecko daily OHLCV |
| Entry point | `run_phase5_fixed()` in `phase5_trading.py` |

> [!warning] Look-ahead bias
> `main.py` (Phase 1–5 pipeline) uses smoothed probabilities from the **global** full-sample fit. This introduces look-ahead bias. `main_fixed.py` uses rolling 30-day refits — this is the bias-free path.

---

## 📈 Full Backtest Results (2022–2026)

| Metric | Value |
|---|---|
| Total Return | **+85.2%** |
| Sharpe Ratio | **1.60** |
| Max Drawdown | **−10.2%** |
| OOS Sharpe (Walk-Forward) | **1.23** ✓ |
| Position size | 25% per leg |
| Stop-loss | 2% per leg |

---

## 🔍 Walk-Forward Analysis

**Split date:** 2025-01-01
**Acceptance criteria:** OOS Sharpe ≥ 1.2 · Max DD ≥ −15%

| Zone | Period | Sharpe | Max DD | Pass? |
|---|---|---|---|---|
| In-Sample | 2022–2024 | See `trade_log_wf_is.csv` | | |
| Out-of-Sample | 2025–2026 | **1.23** | | ✅ Sharpe |

### Walk-Forward Windows

| Window | Period | Notes |
|---|---|---|
| W1 | 2024 | |
| W2 | 2025 | OOS |
| W3 | 2026 | OOS |

Code: [main_fixed.py — `plot_walk_forward()`](https://github.com/donjoe1996/ARGOS/blob/main/main_fixed.py)
Output: `outputs/plots/plot_wf.png` · `outputs/data/trade_log_wf_is.csv` · `outputs/data/trade_log_wf_oos.csv`

---

## 📊 Baseline Comparison

| Strategy | Return | Sharpe | MaxDD | Notes |
|---|---|---|---|---|
| Fixed 2% SL, daily close | +29.8% | 1.35 | −7.5% | **Optimism bias** — intraday blind |
| Rolling 60d window | −8.05% | −2.56 | −11.46% | Baseline (pre-fix) |
| Rolling 180d window | See CSV | | | Wider window, less responsive |
| **Fixed 30d rolling (bias-free)** | **+85.2%** | **1.60** | **−10.2%** | **Current benchmark** |

---

## 🏗️ Success Criteria Checklist

From `main.py` success criteria block:

- [x] Data collected & stationarity verified
- [x] HMM converged (`model.monitor_.converged`)
- [x] 3 distinct regimes identified
- [x] Directional accuracy > 50% (at least one asset)
- [x] Strategy positive return (full backtest)
- [ ] Regime-specific Sharpe tracked separately — **absent**
- [ ] k=3 validated via AIC/BIC — **absent**
- [ ] Law 1 fully resolved — **not yet**
- [ ] Law 2 fully resolved — **not yet**

---

## 🔗 Connections

- Regime quality affects backtest → [[01 - Regime Detection]]
- Signal logic tested → [[02 - Entry & Exit Signals]]
- Sizing impact on drawdown → [[03 - Risk & Position Sizing]]
- Live vs backtest comparison → [[06 - Trade Journal]]
- Experiment ideas → [[05 - Research Log]]
- Code structure → [[07 - Codebase Map]]
