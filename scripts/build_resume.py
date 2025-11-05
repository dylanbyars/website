#!/usr/bin/env python3
"""
Build resume PDF from markdown source.
Parses Dylan_Byars_Resume.md and generates a styled typst file, then compiles to PDF.
"""

import re
from pathlib import Path
from jinja2 import Template
import subprocess
import sys
from datetime import datetime
import frontmatter


def parse_resume_markdown(md_text):
    """Parse the markdown resume into structured data."""

    # Remove front matter
    md_text = re.sub(r'^---\n.*?\n---\n', '', md_text, flags=re.DOTALL)

    lines = md_text.strip().split('\n')
    data = {
        'name': '',
        'contact_links': [],
        'summary': '',
        'jobs': [],
        'education': ''
    }

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # Parse name (first # heading)
        if line.startswith('# ') and not data['name']:
            data['name'] = line[2:].strip()
            i += 1
            continue

        # Parse contact links (links after name)
        if line.startswith('[') and not data['summary']:
            # Extract all links from this line
            links = re.findall(r'\[([^\]]+)\]\(([^\)]+)\)', line)
            data['contact_links'] = [{'text': text, 'url': url} for text, url in links]
            i += 1
            continue

        # Parse summary (blockquote)
        if line.startswith('>') and not data['summary']:
            summary_lines = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                summary_lines.append(lines[i].strip()[1:].strip())
                i += 1
            data['summary'] = ' '.join(summary_lines)
            continue

        # Parse Work section
        if line == '# Work':
            i += 1
            while i < len(lines):
                line = lines[i].strip()

                # Stop at Education section
                if line == '# Education':
                    break

                # New job (## heading)
                if line.startswith('## '):
                    job = parse_job(lines, i)
                    if job:
                        data['jobs'].append(job)
                        i = job['end_index']
                        continue

                i += 1
            continue

        # Parse Education section
        if line == '# Education':
            i += 1
            # Skip blank lines
            while i < len(lines) and lines[i].strip() == '':
                i += 1
            if i < len(lines):
                data['education'] = lines[i].strip()
            break

        i += 1

    return data


def parse_job(lines, start_idx):
    """Parse a single job entry."""
    line = lines[start_idx].strip()

    # Parse job title and company from "## Title @ Company"
    match = re.match(r'## (.+?)\s+@\s+(.+)', line)
    if not match:
        return None

    job = {
        'title': match.group(1).strip(),
        'company': match.group(2).strip(),
        'dates': '',
        'subsections': [],
        'tech_stacks': [],
        'bullets': [],
        'end_index': start_idx + 1
    }

    i = start_idx + 1
    current_subsection = None

    while i < len(lines):
        line = lines[i].strip()

        # Stop at next job or section
        if line.startswith('## ') or line.startswith('# '):
            job['end_index'] = i
            break

        # Dates in italic
        if line.startswith('_') and line.endswith('_'):
            date_str = line.strip('_').strip()
            if not job['dates']:  # Main job dates
                job['dates'] = date_str
            elif current_subsection:  # Subsection dates
                current_subsection['dates'] = date_str
            i += 1
            continue

        # Subsection (### heading)
        if line.startswith('### '):
            if current_subsection:
                job['subsections'].append(current_subsection)
            current_subsection = {
                'title': line[4:].strip(),
                'dates': '',
                'tech_stacks': [],
                'bullets': []
            }
            i += 1
            continue

        # Tech stack (code block)
        if line.startswith('```'):
            i += 1
            if i < len(lines) and not lines[i].strip().startswith('```'):
                tech_stack = lines[i].strip()
                if current_subsection:
                    current_subsection['tech_stacks'].append(tech_stack)
                else:
                    job['tech_stacks'].append(tech_stack)
                i += 1
            # Skip closing ```
            if i < len(lines) and lines[i].strip().startswith('```'):
                i += 1
            continue

        # Bullet point
        if line.startswith('- '):
            bullet = line[2:].strip()
            if current_subsection:
                current_subsection['bullets'].append(bullet)
            else:
                job['bullets'].append(bullet)
            i += 1
            continue

        # Horizontal rule or blank line
        if line.startswith('---') or line == '':
            i += 1
            continue

        # Bold text (like "Additional AI Initiatives")
        if line.startswith('**') and line.endswith('**'):
            if current_subsection:
                job['subsections'].append(current_subsection)
            current_subsection = {
                'title': line.strip('*').strip(),
                'dates': '',
                'tech_stacks': [],
                'bullets': []
            }
            i += 1
            continue

        i += 1

    # Add last subsection if exists
    if current_subsection:
        job['subsections'].append(current_subsection)

    job['end_index'] = i
    return job


def escape_at_signs(text):
    """Escape @ symbols for typst."""
    return text.replace('@', r'\@')


def generate_typst(data, template_path, version):
    """Generate typst content from parsed data using Jinja2 template."""
    # Escape @ signs in education
    if data.get('education'):
        data['education'] = escape_at_signs(data['education'])

    with open(template_path, 'r') as f:
        template = Template(f.read())

    return template.render(**data, version=version)


def main():
    # Paths
    repo_root = Path(__file__).parent.parent
    md_path = repo_root / 'static' / 'resume' / 'Dylan_Byars_Resume.md'
    template_path = repo_root / 'static' / 'resume' / 'resume_template.typ.jinja'
    typ_output = repo_root / 'static' / 'resume' / 'resume_generated.typ'

    # Parse markdown with frontmatter
    print("Parsing markdown resume...")
    with open(md_path, 'r') as f:
        post = frontmatter.load(f)

    # Extract version date from frontmatter
    resume_date = post.get('date')
    if not resume_date:
        print("Warning: Could not find date in frontmatter, using today's date")
        resume_date = datetime.now().strftime('%Y-%m-%d')
    elif hasattr(resume_date, 'strftime'):
        # If it's a datetime object, convert to string
        resume_date = resume_date.strftime('%Y-%m-%d')
    else:
        resume_date = str(resume_date)

    version = f"v{resume_date.replace('-', '.')}"

    # Parse the markdown content (without frontmatter)
    data = parse_resume_markdown(post.content)

    # Generate typst
    print("Generating typst...")
    typst_content = generate_typst(data, template_path, version)

    with open(typ_output, 'w') as f:
        f.write(typst_content)

    # Output path
    public_dir = repo_root / 'static' / 'public'
    pdf_output = public_dir / 'Dylan_Byars_Resume.pdf'

    # Compile to PDF
    print("Compiling to PDF...")
    result = subprocess.run(
        ['typst', 'compile', str(typ_output), str(pdf_output)],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        print(f"Error compiling typst: {result.stderr}", file=sys.stderr)
        sys.exit(1)

    print(f"✓ Resume PDF generated: {pdf_output}")


if __name__ == '__main__':
    main()
