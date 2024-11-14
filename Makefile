# Build resume
resume: ./resume/Dylan_Byars_Resume.md ./resume/resume_template.html
	pandoc --standalone --template ./resume/resume_template.html -o ./public/resume/index.html ./resume/Dylan_Byars_Resume.md

# Build periodic table project
periodic-table:
	cd ./projects/periodic-table/ && npm install && npm run build

# Clean built files
clean:
	rm -rf public/periodic-table
	rm -rf public/resume

# Phony targets (targets that don't create files of these names)
.PHONY: all resume periodic-table clean
