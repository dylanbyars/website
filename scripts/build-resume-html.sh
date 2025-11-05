#!/usr/bin/env bash
# Build HTML resume from markdown using pandoc

set -e

pandoc \
  --standalone \
  --template ./static/resume/resume_template.html \
  -o ./static/public/resume/index.html \
  ./static/resume/Dylan_Byars_Resume.md
