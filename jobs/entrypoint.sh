#!/bin/sh
set -e

echo "[INIT] restart db"
python /app/scripts/restart_db.py

echo "[INIT] start cron"
exec cron -f
