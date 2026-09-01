# Telegram Calendar Bot — Yair & Sharone

Build a Telegram bot for Yair and Sharone that reads both their Google
Calendars, sends daily and weekly digests, detects coverage conflicts,
and accepts natural-language schedule changes via Telegram, writing
them back to Google Calendar. Deployed on Cloudflare Workers.

This project is built in 8 phases. Complete ONLY the phase requested.

After finishing a phase, output a status report with exactly these
fields, then STOP:
- Phase completed: [number and name]
- Files created or changed: [list]
- Config now in place: [IDs, bindings, calendar IDs, KV namespace
  names — NEVER include secret values themselves, just confirm
  they're stored, e.g. "Telegram token stored via wrangler secret"]
- Manual actions still needed before next phase: [list, or "none"]
- Deviations from the plan below, if any: [list, or "none"]

Then say exactly: "Return to your Claude.ai planning conversation,
paste this report, and ask for the next phase's prompt." Do not
draft the next phase's prompt yourself, and do not start the next
phase until the user returns with it.

## Project layout

This bot lives in `telegram-calendar-bot/` at the repo root, alongside
the unrelated `yair-portfolio` React app already in this repository.
Keep the two isolated — do not share dependencies, config, or tooling
between them.

## Phases

1. Accounts, credentials, calendar conventions (mostly manual)
2. Repo + Worker scaffold
3. Google Calendar OAuth + read/write data layer
4. Telegram bot wiring
5. Daily/weekly digest formatting
6. Conflict detection + instant flag
7. Two-way NLU + write-access with confirm-before-write
8. Cron scheduling (DST-aware) + go-live
