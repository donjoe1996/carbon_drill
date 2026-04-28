---
tags: [trading, signals, code, ARGOS]
type: concept
links: [[00 - Algorithm MOC]]
---

# ⚡ Signal Generation in Code (Phases 4–5)

> [!info] Two paths: backtest vs live
> - **Backtest path:** `phase4_forecast.py` → `phase5_trading.py` (via `main.py` / `main_fixed.py`)
> - **Live path:** `data_feed.py` → `signal_generator.py` → `run_daily.py`
> Both produce the same rank-forecast signal — the difference is rolling refit (live) vs global model (backtest).

---

## Phase 4 — Forecast Generation

**Code:** [src/strategy/phase4_forecast.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase4_forecast.py) · `run_phase4(model, diffs, smoothed)`

### What it does
Uses the fitted HMM's emission parameters (means of the Gaussian mixture per state) and the smoothed regime probabilities to generate a next-day directional forecast for each asset.

### Output columns (`forecast_df`)
| Column | Description |
|---|---|
| `BTC_forecast` | Expected next-day price difference for BTC |
| `ETH_forecast` | Expected next-day price difference for ETH |
| `BNB_forecast` | Expected next-day price difference for BNB |
| `SOL_forecast` | Expected next-day price difference for SOL |

Also outputs `accuracy_df` with directional accuracy per asset (target > 50%).

---

## Phase 5 — Signal & Trade Logic

**Code:** [src/strategy/phase5_trading.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase5_trading.py)

### Key constants
```python
ROLLING_WINDOW_DAYS = 30
CONFIDENCE_THRESHOLD = 0.75
STOP_LOSS_PCT = 0.02        # 2% per leg
BACKTEST_DAYS = 60          # default window for run_phase5()
```

### `run_phase5(forecast_df, diffs, prices, window_days)` — baseline backtest
Uses forecasts from the **global** model (look-ahead bias present). Used for the 60-day and 180-day baseline comparisons.

### `run_phase5_fixed(diffs, prices, backtest_start)` — rolling backtest ✅
Bias-free. Refits HMM on a rolling 30-day window each trading day before generating the signal.

### Signal logic (per trading day)
```
1. Refit HMM on diffs[t-30 : t]
2. Infer today's regime probabilities
3. confidence = max(P(S0), P(S1), P(S2))
4. If confidence < 0.75 → skip (no trade)
5. Run phase4 forecast on rolling window → forecast per asset
6. Rank assets by forecast magnitude
7. Long: highest positive forecast(s)
   Short: lowest negative forecast(s)
8. Apply beta adjustment to normalise sizes
9. Enter at today's CoinGecko spot price
10. Exit tomorrow at midnight (1-day hold)
    OR exit early if stop-loss fires (monitor_sl.py)
```

### `performance_metrics(trade_log)` — metrics function
Returns: Total Return (%), Win Rate (%), Sharpe Ratio, Sortino Ratio, Max Drawdown (%), Total Trades, Days Backtested.

---

## Live Signal Path

**Code:** [src/strategy/signal_generator.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/signal_generator.py)

Called by `run_daily.py` at midnight UTC. Pulls fresh data via `data_feed.py`, runs the rolling HMM refit, applies confidence gate, and outputs a signal dict that `portfolio_tracker.py` uses to update `paper_portfolio.json`.

---

## Data Flow (Full Pipeline)

```
CoinGecko API
    ↓ phase1_data.py / data_feed.py
Daily OHLCV → Price diffs (Pₜ − Pₜ₋₁)
    ↓ phase2_model.py (rolling refit)
MGWN HMM k=3 fitted on 30-day window
    ↓ phase3_states.py
Regime probabilities [P(S0), P(S1), P(S2)] + Most_Likely_State
    ↓ Confidence gate (≥ 0.75)
    ↓ phase4_forecast.py
Per-asset directional forecasts
    ↓ phase5_trading.py / signal_generator.py
Ranked long/short signal + beta adjustment
    ↓
run_daily.py → paper_portfolio.json
```

---

## 🔗 Connections

- Regime probabilities input → [[08 - Regime Switching Logic]]
- Signal logic rules (conceptual) → [[02 - Entry & Exit Signals]]
- Position sizing → [[03 - Risk & Position Sizing]]
- Signal → order → [[10 - Order Execution & Broker Integration]]
- Signal performance in backtest → [[04 - Backtesting & Metrics]]
- Code file index → [[07 - Codebase Map]]
