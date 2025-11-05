#!/usr/bin/env python3
"""
Build llms.txt from Jinja2 template and resume markdown.
"""

from datetime import date
from pathlib import Path
from jinja2 import Template


def main():
    # Paths
    repo_root = Path(__file__).parent.parent
    template_path = repo_root / 'static' / 'llms.txt.jinja'
    resume_path = repo_root / 'static' / 'resume' / 'Dylan_Byars_Resume.md'
    output_path = repo_root / 'static' / 'public' / 'llms.txt'

    # Read template
    with open(template_path, 'r') as f:
        template = Template(f.read())

    # Read resume markdown
    with open(resume_path, 'r') as f:
        resume_content = f.read()

    # Render template
    output = template.render(
        date=date.today().strftime('%Y-%m-%d'),
        resume_content=resume_content
    )

    # Write output
    with open(output_path, 'w') as f:
        f.write(output)

    print(f"✓ llms.txt generated from {date.today().strftime('%Y-%m-%d')}")


if __name__ == '__main__':
    main()
