#!/usr/bin/env bash
# Build periodic table React app with Vite

set -e

cd static/projects/periodic-table/
mise exec -- npm install
mise exec -- npm run build
