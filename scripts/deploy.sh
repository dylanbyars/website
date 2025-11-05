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

# Configure rclone via environment variables (works with on-the-fly :webdav: backend)
export RCLONE_WEBDAV_URL="$FASTMAIL_WEBDAV_URL"
export RCLONE_WEBDAV_VENDOR="other"
export RCLONE_WEBDAV_USER="$FASTMAIL_USERNAME"
export RCLONE_WEBDAV_PASS="$(rclone obscure "$FASTMAIL_APP_PASSWORD")"

echo "Deploying to Fastmail: $FASTMAIL_WEBDAV_PATH"
echo ""

# Sync local public directory to Fastmail
# Use :webdav: backend configured via environment variables above
rclone sync static/public/ ":webdav:$FASTMAIL_WEBDAV_PATH" \
  --progress \
  --exclude .DS_Store \
  --exclude '._*' \
  --exclude '.git*' \
  --exclude 'Thumbs.db' \
  --delete-excluded

echo ""
echo "✓ Deployment complete!"
echo "Visit: https://dylanbyars.com"
