#!/usr/bin/env bash
# Deploy static site to Fastmail file storage via WebDAV

set -e

# Detect if running in CI or locally
if [ -z "$CI" ]; then
  # Local mode: load from .env file
  if [ ! -f .env ]; then
    echo "Error: .env file not found"
    exit 1
  fi

  export $(grep -v '^#' .env | xargs)

  # Use pre-configured rclone remote
  RCLONE_REMOTE="fastmail:$FASTMAIL_WEBDAV_PATH"
else
  # CI mode: use environment variables directly
  # Check required variables
  if [ -z "$FASTMAIL_USERNAME" ] || [ -z "$FASTMAIL_APP_PASSWORD" ] || [ -z "$FASTMAIL_WEBDAV_URL" ] || [ -z "$FASTMAIL_WEBDAV_PATH" ]; then
    echo "Error: Missing required environment variables"
    echo "Required: FASTMAIL_USERNAME, FASTMAIL_APP_PASSWORD, FASTMAIL_WEBDAV_URL, FASTMAIL_WEBDAV_PATH"
    exit 1
  fi

  # Configure rclone on-the-fly using connection string
  RCLONE_REMOTE=":webdav,url=$FASTMAIL_WEBDAV_URL,vendor=other,user=$FASTMAIL_USERNAME,pass=$(rclone obscure "$FASTMAIL_APP_PASSWORD"):$FASTMAIL_WEBDAV_PATH"
fi

# Check required path variable
if [ -z "$FASTMAIL_WEBDAV_PATH" ]; then
  echo "Error: FASTMAIL_WEBDAV_PATH not set"
  exit 1
fi

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
