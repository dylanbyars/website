# Requirements:
# - pandoc
# - node (via nvm)
# - browser-sync (installed via node)

# Run a local preview server
dev:
	@mise exec -- ./scripts/preview.sh

# Build resume
resume: ./static/resume/Dylan_Byars_Resume.md ./static/resume/resume_template.html
	pandoc --standalone --template ./static/resume/resume_template.html -o ./static/public/resume/index.html ./static/resume/Dylan_Byars_Resume.md

# Build periodic table project
periodic-table:
	@zsh -c 'cd ./static/projects/periodic-table/ && . ~/.zshrc && nvm use && npm install && npm run build'

# Clean built files
clean:
	rm -rf static/public/periodic-table
	rm -rf static/public/resume

all:
	make resume
	make periodic-table

# Phony targets (targets that don't create files of these names)
.PHONY: all resume periodic-table clean dev
