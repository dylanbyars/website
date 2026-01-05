#!/usr/bin/env bash
# Deploy static site via WebDAV

set -e

# Load environment variables from .env if it exists (local dev)
# In CI, these are already in the environment
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Check required variables
if [ -z "$WEBDAV_USERNAME" ] || [ -z "$WEBDAV_PASSWORD" ] || [ -z "$WEBDAV_URL" ] || [ -z "$WEBDAV_PATH" ]; then
  echo "Error: Missing required environment variables"
  echo "Required: WEBDAV_USERNAME, WEBDAV_PASSWORD, WEBDAV_URL, WEBDAV_PATH"
  exit 1
fi

# Configure rclone via environment variables (works with on-the-fly :webdav: backend)
export RCLONE_WEBDAV_URL="$WEBDAV_URL"
export RCLONE_WEBDAV_VENDOR="other"
export RCLONE_WEBDAV_USER="$WEBDAV_USERNAME"
export RCLONE_WEBDAV_PASS="$(rclone obscure "$WEBDAV_PASSWORD")"

echo "Deploying via WebDAV: $WEBDAV_PATH"
echo ""

# Sync local public directory via WebDAV
# Use :webdav: backend configured via environment variables above
rclone sync static/public/ ":webdav:$WEBDAV_PATH" \
  --progress \
  --exclude .DS_Store \
  --exclude '._*' \
  --exclude '.git*' \
  --exclude 'Thumbs.db' \
  --delete-excluded

echo ""
echo "✓ Deployment complete!"
echo "Visit: https://dylanbyars.com"
