#!/bin/bash

preview() {
  # cd to static/public from the repo root
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  cd "$SCRIPT_DIR/../static/public"

  # Use npx so we don't need global install
  npx browser-sync start --no-notify --no-ui --ignore '**/.*' -sw
}

preview

