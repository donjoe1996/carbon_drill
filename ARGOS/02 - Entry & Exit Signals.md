---
tags: [trading, signals, ARGOS]
type: component
links: [[00 - Algorithm MOC]]
---

# 📈 Entry & Exit Signals

> [!info] Current state
> The current signal is a **rank-forecast long/short** deployed uniformly across all regimes — a known **Law 1 violation**. The regime-gated experiment (−3.1% / Sharpe −0.12) is the best result to date and the active direction for improvement. See [[09 - Signal Generation in Code]] for implementation.

---

## Current Signal Logic

**Type:** Rank-forecast long/short with beta-ranked asset selection
**Timeframe:** Daily (1-day hold)
**Assets:** BTC, ETH, BNB, SOL

### Entry Condition

1. HMM refit on rolling 30-day window → regime probabilities output
2. Confidence check: `max(P(S0), P(S1), P(S2)) ≥ 0.75` — if not met, **no trade**
3. Phase 4 generates next-day directional forecasts per asset
4. Assets ranked by forecast magnitude → top ranked = long, bottom ranked = short
5. Beta adjustment applied to normalise position sizes across assets

### Exit Condition

| Exit Type | Rule | Implementation |
|---|---|---|
| Time-based | 1-day hold — all positions closed at next midnight run | `run_daily.py` |
| Stop-loss | 2% per leg, checked hourly on 1h OHLCV | `monitor_sl.py` via `monitor_sl.sh` |
| Regime-change | Positions not automatically exited on regime switch (gap — see below) | Not implemented |

---

## Law 1 Violation — Same Edge in All Regimes

> [!danger] Critical Gap
> The rank-forecast signal is deployed regardless of whether the regime is Bull, Bear, or Stable. This violates Law 1: *No edge is regime-independent.*

### Regime-Gated Experiment (best result to date)

From [docs/regime_gated_experiment.md](https://github.com/donjoe1996/ARGOS/blob/main/docs/regime_gated_experiment.md):

| Approach | SL | Return | Sharpe | Notes |
|---|---|---|---|---|
| No gate (baseline) | Normal 10th pct hourly | −16.1% | −0.60 | Uniform signal |
| **Regime gate + beta rank + prop. sizing** | Normal 10th pct hourly | **−3.1%** | **−0.12** | +13pp vs no gate |

**Verdict:** Regime gating confirmed as the right lever. Not yet profitable.

### Next Steps

- Validate k via AIC/BIC on ≥365d data
- Lengthen rolling window (60–90d) for more stable regime labels
- Track regime-specific Sharpe separately
- Define distinct signal logic per regime (not just gate on/off)

---

## Stop-Loss Experiment Summary

All experiments used: 30-day rolling HMM, conf ≥ 0.75, 25% position, BTC/ETH/BNB/SOL, 2024-05-01 → 2026-04-25.

| SL Technique | Best Return | Sharpe | Verdict |
|---|---|---|---|
| Fixed 2% daily close | +29.8% | 1.35 | Optimism bias — intraday blind |
| Fixed 2% hourly | −29.7% | −1.08 | Reality baseline |
| Trailing stop (best: 1%) | −41.1% | −2.19 | Ruled out — fires on noise |
| ATR×2.5 hourly | −19.5% | −0.75 | Ruled out |
| **Normal 10th pct hourly** | **−16.1%** | **−0.60** | **Best SL found** |

> [!info] SL design exhausted as a lever. Root cause is Law 1 violation, not stop placement.

Full analyses: [fixed_sl](https://github.com/donjoe1996/ARGOS/blob/main/docs/fixed_sl_hourly_experiment.md) · [trailing_stop](https://github.com/donjoe1996/ARGOS/blob/main/docs/trailing_stop_experiment.md) · [ATR](https://github.com/donjoe1996/ARGOS/blob/main/docs/atr_sl_experiment.md) · [distribution](https://github.com/donjoe1996/ARGOS/blob/main/docs/distribution_sl_experiment.md)

---

## 🔗 Connections

- Signal implementation in code → [[09 - Signal Generation in Code]]
- Regime context → [[01 - Regime Detection]]
- Regime switch handling → [[08 - Regime Switching Logic]]
- Position sizing per signal → [[03 - Risk & Position Sizing]]
- Signal performance stats → [[04 - Backtesting & Metrics]]
- Research on regime-specific edges → [[05 - Research Log]]
