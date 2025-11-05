# Requirements:
# - pandoc
# - node (via mise)
# - browser-sync (installed via node)

# Run a local preview server
dev: all
	@mise exec -- ./scripts/preview.sh

# Build resume HTML
resume: ./static/resume/Dylan_Byars_Resume.md ./static/resume/resume_template.html
	@./scripts/build-resume-html.sh

# Build resume PDF
pdf: ./static/resume/Dylan_Byars_Resume.md ./static/resume/resume_template.typ.jinja
	uv run scripts/build_resume.py

# Build llms.txt from template and resume
llms: ./static/resume/Dylan_Byars_Resume.md ./static/llms.txt.jinja
	@uv run scripts/build_llms.py

# Build periodic table project
periodic-table:
	@./scripts/build-periodic-table.sh

# Deploy to Fastmail
deploy: all
	@./scripts/deploy.sh

# Clean built files
clean:
	rm -rf static/public/periodic-table
	rm -rf static/public/resume

all:
	make resume
	make pdf
	make llms
	make periodic-table

# Phony targets (targets that don't create files of these names)
.PHONY: all resume pdf llms periodic-table deploy clean dev
