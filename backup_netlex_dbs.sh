#!/bin/bash

# === CONFIGURATION ===
BACKUP_ROOT="/home/administrator/mongodb_backups"
DATE=$(date +%F_%H-%M-%S)
LOG_FILE="$BACKUP_ROOT/backup_log.txt"
MONGO_HOST="localhost"
MONGO_PORT="27017"

# === CREATE BASE BACKUP DIR ===
mkdir -p "$BACKUP_ROOT/$DATE"

# === LOG START ===
echo "=== Backup started at $DATE ===" >> "$LOG_FILE"

# === GET LIST OF DBS STARTING WITH netlex ===
DBS=$(/usr/bin/mongosh --quiet --host $MONGO_HOST --port $MONGO_PORT --eval "db.adminCommand('listDatabases').databases.m>

# === BACKUP EACH MATCHING DB ===
for DB in $DBS; do
    echo "Backing up database: $DB" >> "$LOG_FILE"
    mongodump --host $MONGO_HOST --port $MONGO_PORT --db "$DB" --out "$BACKUP_ROOT/$DATE" >> "$LOG_FILE" 2>&1
done

# === OPTIONAL: Delete backups older than 7 days ===
find "$BACKUP_ROOT" -maxdepth 1 -type d -mtime +7 -exec rm -rf {} \; >> "$LOG_FILE"

# === LOG END ===
echo "=== Backup completed at $(date +%F_%H-%M-%S) ===" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

