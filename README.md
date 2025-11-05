# Personal Website

A simple personal website served via Fastmail file storage.

## Development

A `Makefile` provides scripts to:
- `make dev` - start a dev server for local development (auto-builds everything first)
- `make resume` - build HTML version of markdown resume
- `make pdf` - build PDF version of resume
- `make llms` - build llms.txt from template
- `make periodic-table` - build the periodic table React app
- `make all` - build everything
- `make deploy` - build everything and deploy to Fastmail (requires `.env` file)

## Deployment

### Automated (GitHub Actions)

Pushes to `main` automatically build and deploy to https://dylanbyars.com via GitHub Actions.

**First-time setup:**

1. Copy `.env.example` to `.env` and fill in your Fastmail credentials
2. Set GitHub secrets (replace `dylanbyars/website` with your repo if different):

```bash
gh secret set -f .env --repo dylanbyars/website
```

3. Push to `main` - GitHub Actions will build and deploy automatically

### Manual (Local)

1. Create a `.env` file with your Fastmail credentials (see `.env.example`)
2. Run `make deploy`

## Philosophy

After rewriting my personal website at least 5 different times in almost as many years, I've finally moved away from a framework. The fear of having to do a big dependencies upgrade every time I wanted to make a content change to my site kept me from touching it - the whole system felt fragile. Now, it's composed of simpler technology that feels more stable. It also frees me up to expand the system from something that just serves static files to an entire web app with a backend.
