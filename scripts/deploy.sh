#!/usr/bin/env bash
# Deploy static site to Fastmail file storage via WebDAV

set -e

# Load environment variables from .env if it exists (local dev)
# In CI, these are already in the environment
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Check required variables
if [ -z "$FASTMAIL_USERNAME" ] || [ -z "$FASTMAIL_APP_PASSWORD" ] || [ -z "$FASTMAIL_WEBDAV_URL" ] || [ -z "$FASTMAIL_WEBDAV_PATH" ]; then
  echo "Error: Missing required environment variables"
  echo "Required: FASTMAIL_USERNAME, FASTMAIL_APP_PASSWORD, FASTMAIL_WEBDAV_URL, FASTMAIL_WEBDAV_PATH"
  exit 1
fi

# Construct rclone connection string dynamically
# Format: :webdav,param=value,param=value:path
RCLONE_REMOTE=":webdav,url=$FASTMAIL_WEBDAV_URL,vendor=other,user=$FASTMAIL_USERNAME,pass=$(rclone obscure "$FASTMAIL_APP_PASSWORD"):$FASTMAIL_WEBDAV_PATH"

echo "Deploying to Fastmail: $FASTMAIL_WEBDAV_PATH"
echo ""

# Sync local public directory to Fastmail
rclone sync static/public/ "$RCLONE_REMOTE" \
  --progress \
  --exclude .DS_Store \
  --exclude '._*' \
  --exclude '.git*' \
  --exclude 'Thumbs.db' \
  --delete-excluded

echo ""
echo "✓ Deployment complete!"
echo "Visit: https://dylanbyars.com"
