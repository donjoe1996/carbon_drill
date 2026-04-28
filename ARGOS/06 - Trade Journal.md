---
tags: [trading, journal, paper-trading, ARGOS]
type: log
links: [[00 - Algorithm MOC]]
---

# 📓 Trade Journal

> [!info] Paper trading only
> ARGOS is in paper trading mode. Entry/exit prices are CoinGecko spot prices. Live state persists in `logs/paper_portfolio.json` and `logs/paper_trading.log`. See [[10 - Order Execution & Broker Integration]] for architecture.

**Portfolio log:** [logs/paper_portfolio.json](https://github.com/donjoe1996/ARGOS/blob/main/logs/paper_portfolio.json)
**Daily log:** [logs/paper_trading.log](https://github.com/donjoe1996/ARGOS/blob/main/logs/paper_trading.log)
**SL log:** [logs/sl_monitor.log](https://github.com/donjoe1996/ARGOS/blob/main/logs/sl_monitor.log)

---

## 📊 Benchmark (from backtest)

These are the targets from `main_fixed.py` — use to calibrate expectations for paper trading:

| Metric | Backtest (2022–2026) | OOS Walk-Forward |
|---|---|---|
| Total Return | +85.2% | — |
| Sharpe Ratio | 1.60 | 1.23 |
| Max Drawdown | −10.2% | — |
| Confidence filter | ~30–40% of days skipped | — |
| Position size | 25% per leg | — |
| Stop-loss | 2% per leg | — |

> [!warning] Reality gap
> Live paper trading will diverge from backtest due to: CoinGecko rate limits, hourly SL check latency (vs true intraday prices), overnight gap risk, and the known look-ahead bias in some backtest paths.

---

## 📅 Monthly Review

### Template — copy and fill each month

```
Month: ___

--- Performance ---
Net Return (%):
Trades taken:
Trades skipped (confidence < 0.75):
Win Rate:
Max drawdown this month:

--- Regime ---
Dominant regime(s) this month:
Regime flips observed:
Any unexpected regime behaviour?

--- SL ---
SL fires this month:
Cases where SL fired on dip that recovered:
Avg loss on SL exits (%):

--- Law Audit ---
Law 1 (regime-independent edge): still violated? Y/N
Law 2 (binary sizing): still violated? Y/N
Law 3 (structure before signal): met? Y/N
Law 4 (parameters expiring): last refit date?

--- Actions ---
- 
```

---

## 📋 Trade Log

| Date | Asset | Regime | Confidence | Direction | Entry | Exit | P&L % | SL fired? | Notes |
|---|---|---|---|---|---|---|---|---|---|
| | BTC | | | | | | | | |
| | ETH | | | | | | | | |
| | BNB | | | | | | | | |
| | SOL | | | | | | | | |

---

## ⚠️ Anomaly Log

Record any days where the algorithm behaved unexpectedly — regime mislabelling, SL firing on a recovered dip, CoinGecko data outage, etc.

| Date | Asset | Regime at time | What happened | Likely cause | Action taken |
|---|---|---|---|---|---|
| | | | | | |

---

## 📉 Known Paper Trading Limitations to Watch

- **15.7% of trading days** historically had SL fire intraday on a dip that fully recovered by close (from fixed_sl_hourly experiment). Track this in paper trading.
- **Overnight gaps:** BTC/ETH can move >2% overnight. Run the daily check manually if a large macro event occurs between midnight runs.
- **CoinGecko 429 errors:** Log any failed data fetches in the anomaly log.

---

## 🔗 Connections

- Regime accuracy → [[01 - Regime Detection]]
- Signal review → [[02 - Entry & Exit Signals]]
- SL adherence → [[03 - Risk & Position Sizing]]
- Live vs backtest comparison → [[04 - Backtesting & Metrics]]
- Execution architecture → [[10 - Order Execution & Broker Integration]]
