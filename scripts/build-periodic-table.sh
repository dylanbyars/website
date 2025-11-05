#!/usr/bin/env bash
# Build periodic table React app with Vite

set -e

cd static/projects/periodic-table/

# Detect if running in CI or locally
if [ -z "$CI" ]; then
  # Local: use mise for node version management
  mise exec -- npm install
  mise exec -- npm run build
else
  # CI: node is already in PATH from setup-node action
  npm install
  npm run build
fi
