---
tags: [trading, risk, position-sizing, ARGOS]
type: component
links: [[00 - Algorithm MOC]]
---

# ⚖️ Risk & Position Sizing

> [!info] Current state
> Sizing is binary — 0% if confidence < 0.75, fixed 25% if above. This violates **Law 2**: *Probability governs all decisions — never binary switches.* A confidence of 0.76 and 0.99 produce the same position size.

**Code:** [src/strategy/phase5_trading.py](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase5_trading.py)

---

## Current Parameters

| Parameter | Value | Defined In |
|---|---|---|
| Position size per leg | 25% of portfolio | `phase5_trading.py` |
| Max concurrent positions | 4 (one per asset) | Implicit from 4-asset universe |
| Max portfolio exposure | 100% (4 × 25%) | — |
| Stop-loss per leg | 2% | `STOP_LOSS_PCT = 0.02` |
| Max loss per trade (approx) | 0.5% of portfolio | 25% × 2% |
| Transaction cost | 0.10% per trade | Modelled in backtest |
| Confidence threshold | ≥ 0.75 to trade | `CONFIDENCE_THRESHOLD = 0.75` |

---

## Law 2 Violation — Binary Sizing

> [!danger] High Severity Gap
> The current logic: if `P(best_regime) ≥ 0.75` → enter at 25%. Below threshold → 0%.
> A probability-proportional approach would scale size continuously with confidence, e.g.:
> `size = base_size × (confidence − 0.75) / 0.25`

### Target Implementation

```python
# Current (binary — Law 2 violation)
if confidence >= CONFIDENCE_THRESHOLD:
    position_size = 0.25
else:
    position_size = 0.0

# Target (probability-proportional — Law 2 compliant)
if confidence >= CONFIDENCE_THRESHOLD:
    position_size = BASE_SIZE * (confidence / MAX_CONFIDENCE)
else:
    position_size = 0.0
```

**Next step:** Implement proportional sizing and rerun walk-forward to measure impact.

---

## Stop-Loss Architecture

### Daily Runner (`run_daily.py`)
- Enters positions at CoinGecko spot price at midnight UTC
- Records entry price in `logs/paper_portfolio.json`

### Hourly Monitor (`monitor_sl.py` via `cron/monitor_sl.sh`)
- Runs every hour: `0 * * * * cron/monitor_sl.sh`
- Fetches 1h OHLCV, checks if any open position has lost ≥ 2%
- If SL triggered: records exit in portfolio log

> [!warning] Known Limitation — SL is a target, not a guarantee
> If a position loses >2% within a single 1-hour window (e.g. flash crash), the actual loss at check time will exceed the 2% target. A real exchange stop order would execute closer to the threshold.

### Overnight Gap Risk
`run_daily.sh` runs once at midnight. Any regime shift or price gap between midnight and market open is not acted on until the following midnight run. **This is unmanaged.**

---

## Drawdown Behaviour (from backtests)

| Strategy | Max Drawdown | Period |
|---|---|---|
| Fixed 2% daily close (optimistic) | −7.5% | 2024–2026 |
| Fixed 2% hourly (realistic) | −35.2% | 2024–2026 |
| Normal 10th pct hourly (best SL) | ~−20% | 2024–2026 |
| Fixed strategy 30d rolling (full backtest) | **−10.2%** | 2022–2026 |

---

## 🔗 Connections

- Regime multiplier input → [[01 - Regime Detection]]
- Signal confidence input → [[09 - Signal Generation in Code]]
- Sizing impact on P&L → [[04 - Backtesting & Metrics]]
- Stop-loss execution → [[10 - Order Execution & Broker Integration]]
- Proportional sizing research → [[05 - Research Log]]
