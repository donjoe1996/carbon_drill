---
tags: [trading, codebase, github, ARGOS]
type: reference
links: [[00 - Algorithm MOC]]
---

# 🗂️ Codebase Map

**Repo:** [github.com/donjoe1996/ARGOS](https://github.com/donjoe1996/ARGOS) · Python 99.8% · Shell 0.2%

---

## 📁 Full Repository Structure

```
ARGOS/
├── src/
│   ├── data/
│   │   ├── phase1_data.py       ← Phase 1: CoinGecko download, diffs, stationarity
│   │   └── data_feed.py         ← Live data feed for paper trading
│   ├── strategy/
│   │   ├── phase2_model.py      ← Phase 2: MGWN HMM k=3 fitting (Baum-Welch)
│   │   ├── phase3_states.py     ← Phase 3: State inference, _label_regimes()
│   │   ├── phase4_forecast.py   ← Phase 4: Regime-conditional forecasts
│   │   ├── phase5_trading.py    ← Phase 5: Backtest engine + live signal logic
│   │   └── signal_generator.py  ← Live signal generation for run_daily.py
│   └── execution/
│       ├── run_daily.py         ← Daily paper trading runner (midnight UTC)
│       ├── monitor_sl.py        ← Hourly stop-loss check (1h OHLCV)
│       └── portfolio_tracker.py ← Portfolio state management
├── cron/
│   ├── run_daily.sh             ← Cron wrapper: 0 0 * * *
│   └── monitor_sl.sh            ← Cron wrapper: 0 * * * *
├── configs/                     ← Configuration files
├── docs/
│   ├── fixed_sl_hourly_experiment.md
│   ├── trailing_stop_experiment.md
│   ├── atr_sl_experiment.md
│   ├── distribution_sl_experiment.md
│   └── regime_gated_experiment.md
├── logs/
│   ├── paper_trading.log        ← Daily signal + portfolio report
│   ├── sl_monitor.log           ← Hourly stop-loss output
│   └── paper_portfolio.json     ← Live portfolio state (entry prices, positions, history)
├── outputs/
│   ├── data/                    ← CSV outputs (diffs, regimes, forecasts, trade logs)
│   └── plots/                   ← PNG charts (regime shading, equity curves, walk-forward)
├── tests/
├── main.py                      ← Full Phase 1–5 pipeline (global model, has look-ahead bias)
├── main_fixed.py                ← Fixed strategy: rolling 30d, conf gate, SL + walk-forward
├── paths.py                     ← sys.path resolver for all entry points
├── .env.example                 ← Environment variable template
├── CHANGELOG.md
├── CLAUDE.md
└── README.md
```

---

## 🔗 Module → Concept Note Index

| File | GitHub | Concept Note |
|---|---|---|
| `src/data/phase1_data.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/src/data/phase1_data.py) | [[01 - Regime Detection]] |
| `src/data/data_feed.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/src/data/data_feed.py) | [[10 - Order Execution & Broker Integration]] |
| `src/strategy/phase2_model.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase2_model.py) | [[01 - Regime Detection]] |
| `src/strategy/phase3_states.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase3_states.py) | [[01 - Regime Detection]] |
| `src/strategy/phase4_forecast.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase4_forecast.py) | [[09 - Signal Generation in Code]] |
| `src/strategy/phase5_trading.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/phase5_trading.py) | [[08 - Regime Switching Logic]] · [[09 - Signal Generation in Code]] · [[03 - Risk & Position Sizing]] |
| `src/strategy/signal_generator.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/src/strategy/signal_generator.py) | [[02 - Entry & Exit Signals]] |
| `src/execution/run_daily.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/src/execution/run_daily.py) | [[10 - Order Execution & Broker Integration]] |
| `src/execution/monitor_sl.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/src/execution/monitor_sl.py) | [[10 - Order Execution & Broker Integration]] |
| `src/execution/portfolio_tracker.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/src/execution/portfolio_tracker.py) | [[06 - Trade Journal]] |
| `main.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/main.py) | [[04 - Backtesting & Metrics]] — ⚠️ global model, look-ahead bias |
| `main_fixed.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/main_fixed.py) | [[04 - Backtesting & Metrics]] — ✅ bias-free rolling |
| `paths.py` | [View](https://github.com/donjoe1996/ARGOS/blob/main/paths.py) | All modules |

---

## 🕐 Cron Schedule

| Schedule | Script | Purpose |
|---|---|---|
| `0 0 * * *` | `cron/run_daily.sh` | Midnight UTC — signal generation + trade entry |
| `0 * * * *` | `cron/monitor_sl.sh` | Every hour — stop-loss check on open positions |

---

## 📤 Key Outputs

| File | Contents |
|---|---|
| `outputs/data/diffs.csv` | Daily price differences (Pₜ − Pₜ₋₁) for BTC/ETH/BNB/SOL |
| `outputs/data/regimes.csv` | Smoothed probabilities + Most_Likely_State per day |
| `outputs/data/forecasts.csv` | Regime-conditional next-day forecasts per asset |
| `outputs/data/trade_log_fixed.csv` | Full trade log from `run_phase5_fixed()` |
| `outputs/data/trade_log_wf_is.csv` | In-sample walk-forward slice |
| `outputs/data/trade_log_wf_oos.csv` | Out-of-sample walk-forward slice |
| `logs/paper_portfolio.json` | Live paper portfolio state |

---

## 🔗 Connections

- [[00 - Algorithm MOC]] — Full system overview
- [[08 - Regime Switching Logic]] — How phase5_trading.py gates on regime
- [[09 - Signal Generation in Code]] — phase4 + phase5 signal flow
- [[10 - Order Execution & Broker Integration]] — run_daily.py + monitor_sl.py
