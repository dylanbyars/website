# Requirements:
# - pandoc
# - node (via nvm)
# - browser-sync (installed via node)

# use `zsh` so my `.zshrc` is interpretable, then go to the built files, source my `.zshrc` file so the `preview` command is available, use the stable version of node so that the programs `preview` calls are available in the shell, then run the `preview` command
dev:
	@zsh -c 'cd ./static/public && . ~/.zshrc && nvm use stable && preview'

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
