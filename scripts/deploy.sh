#!/usr/bin/env bash
# Deploy static site to Fastmail file storage via WebDAV

set -e

# Load environment variables from .env
if [ ! -f .env ]; then
  echo "Error: .env file not found"
  exit 1
fi

export $(grep -v '^#' .env | xargs)

# Check required variables
if [ -z "$FASTMAIL_WEBDAV_PATH" ]; then
  echo "Error: FASTMAIL_WEBDAV_PATH not set in .env"
  exit 1
fi

echo "Deploying to Fastmail: fastmail:$FASTMAIL_WEBDAV_PATH"
echo ""

# Sync local public directory to Fastmail
rclone sync static/public/ "fastmail:$FASTMAIL_WEBDAV_PATH" \
  --progress \
  --exclude .DS_Store \
  --exclude '._*' \
  --exclude '.git*' \
  --exclude 'Thumbs.db' \
  --delete-excluded

echo ""
echo "✓ Deployment complete!"
echo "Visit: https://dylanbyars.com"
