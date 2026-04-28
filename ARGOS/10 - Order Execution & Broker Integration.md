---
tags: [trading, execution, paper-trading, ARGOS]
type: concept
links: [[00 - Algorithm MOC]]
---

# 🏦 Order Execution & Broker Integration

> [!warning] Paper trading only
> ARGOS currently has **no live exchange connection**. Entry and exit prices are CoinGecko spot prices at check time. Slippage, order book depth, and bid/ask spread are not modelled.

**Code:** [src/execution/run_daily.py](https://github.com/donjoe1996/ARGOS/blob/main/src/execution/run_daily.py) · [src/execution/monitor_sl.py](https://github.com/donjoe1996/ARGOS/blob/main/src/execution/monitor_sl.py) · [src/execution/portfolio_tracker.py](https://github.com/donjoe1996/ARGOS/blob/main/src/execution/portfolio_tracker.py)

---

## Execution Architecture

```
Midnight UTC (cron: 0 0 * * *)
      │
      ▼
cron/run_daily.sh → src/execution/run_daily.py
      │
      ├─ Fetch today's CoinGecko spot prices (data_feed.py)
      ├─ Run rolling HMM refit + confidence gate (signal_generator.py)
      ├─ Generate rank-forecast signal
      ├─ Compute position sizes (25% per leg)
      ├─ Close yesterday's positions at current prices
      ├─ Enter new positions at current prices
      └─ Write to logs/paper_portfolio.json + logs/paper_trading.log

Every hour (cron: 0 * * * *)
      │
      ▼
cron/monitor_sl.sh → src/execution/monitor_sl.py
      │
      ├─ Fetch 1h OHLCV from CoinGecko
      ├─ Check each open position: has it lost ≥ 2% from entry?
      ├─ If SL triggered → record exit in paper_portfolio.json
      └─ Log to logs/sl_monitor.log
```

---

## Portfolio State (`logs/paper_portfolio.json`)

Tracks the live paper portfolio. Updated by `portfolio_tracker.py`.

```json
{
  "positions": {
    "BTC": {"entry_price": 62000, "size": 0.25, "direction": "long"},
    "ETH": {"entry_price": 3100, "size": 0.25, "direction": "short"}
  },
  "trade_history": [...],
  "last_updated": "2026-04-26T00:00:00Z"
}
```

---

## Data Source

| Parameter | Value |
|---|---|
| Provider | CoinGecko (free tier) |
| Daily data | `phase1_data.py` / `data_feed.py` |
| Intraday (SL check) | 1h OHLCV via CoinGecko |
| Rate limit | Free tier → 429 on rapid calls |
| Workaround | Hourly cron spacing (`monitor_sl.sh`) avoids sustained rate-limiting |

> [!danger] Security
> API keys stored in `.env` (not committed). `.env.example` shows required variables.

---

## Known Limitations

| # | Limitation | Severity |
|---|---|---|
| 1 | Paper trading only — no exchange connection | High |
| 2 | SL is a target, not a guarantee — 1h breach window | High |
| 3 | Entry/exit at CoinGecko spot — no slippage or spread modelled | High |
| 4 | Overnight gap risk — cron runs once at midnight, misses intraday regime shifts | Medium |
| 5 | CoinGecko free tier rate limiting | Low |
| 6 | Order type selection absent (market vs limit) | Low |
| 7 | Market impact / ADV check absent | Low |

---

## Paper vs Live Parity Checklist (for future exchange integration)

- [ ] Choose exchange / broker API (e.g. Binance, Kraken, CCXT)
- [ ] Implement real order submission in `broker.py`
- [ ] Add slippage model to backtest
- [ ] Add bid/ask spread cost to transaction cost model
- [ ] Replace CoinGecko spot with exchange WebSocket feed
- [ ] Add order type selection (market for SL exits, limit for entries)
- [ ] Add position reconciliation between broker state and `paper_portfolio.json`
- [ ] Regime staleness check at order submission time

---

## 🔗 Connections

- Signal received from → [[09 - Signal Generation in Code]]
- Regime-change exits (absent gap) → [[08 - Regime Switching Logic]]
- Position sizes from → [[03 - Risk & Position Sizing]]
- All fills logged to → [[06 - Trade Journal]]
- Execution quality tracked in → [[04 - Backtesting & Metrics]]
- Code file index → [[07 - Codebase Map]]
