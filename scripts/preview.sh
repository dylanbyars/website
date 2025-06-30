#!/bin/bash

preview() {
  if ! type browser-sync >/dev/null 2>&1; then
    echo 'Need to install browser-sync: npm install -g browser-sync'
    return 1
  fi
  browser-sync start --no-notify --no-ui --ignore '**/.*' -sw
}

preview

