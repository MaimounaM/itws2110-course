#!/bin/bash
# Runs inside the Grocy container on every boot, before Grocy starts.
#
# 1. Seed the database. Grocy only runs its migrations when a login has
#    happened, and we are about to turn logins off -- so a brand-new database
#    would never get its tables. Ship one that was migrated with the pinned
#    version instead -- and filled with Grocy's demo data, so the app has a
#    kitchen in it -- and copy it in the first time only.
# 2. Turn the login screen off and hide the features HW2 does not use.
#    Idempotent: each sed only changes a line still at its default.
set -e
data=/config/data
mkdir -p "$data"
if [ ! -f "$data/grocy.db" ]; then
  cp /seed/grocy.db "$data/grocy.db"
  echo "[hw2] seeded the starting database (migrated, with demo data)"
fi
# 3. Make sure Grocy can write. PHP runs as user abc; the database file AND its
#    folder must belong to abc (SQLite writes a journal file next to the db).
#    Done on every boot, so a restart repairs a folder that got the wrong owner
#    -- the symptom is "attempt to write a readonly database".
rm -f "$data"/grocy.db-journal "$data"/grocy.db-wal "$data"/grocy.db-shm
if chown -R abc:users "$data" && chmod -R u+rwX "$data"; then
  echo "[hw2] /config/data owned by abc, writable"
else
  echo "[hw2] WARNING: could not make /config/data writable by abc -- Grocy will be read-only"
fi
f="$data/config.php"
sed -i "s/Setting('DISABLE_AUTH', false);/Setting('DISABLE_AUTH', true);/" "$f"
for flag in CHORES TASKS BATTERIES EQUIPMENT CALENDAR; do
  sed -i "s/Setting('FEATURE_FLAG_$flag', true);/Setting('FEATURE_FLAG_$flag', false);/" "$f"
done
echo "[hw2] login disabled, non-grocery features hidden"
