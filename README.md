# Personal Website & FreshRSS Setup

## Overview
This setup serves a static website at the root path (`/`) and FreshRSS at `/freshrss` using Nginx as a reverse proxy. Docker containers with custom networking ensure secure communication between services.

## Key Components

### Docker Services
- **Nginx**: Reverse proxy and static file server
- **FreshRSS**: RSS reader application
- **Networks**: Internal backend network for service isolation

# TODO:
- [ ] what's the difference between a `/public` dir and a `build` dir?
- [ ] figure out how to pipe the blog .md files to the `build` dir AND how to make an index of them automatically
- [ ] 404 page
- [ ] figure out how to make a blog post template to use frontmatter
- [ ] favicon for all the pages
- [ ] figure out where to host this now that it's containers. there's [bunny](https://wilw.dev/notes/bunny-hosting/)?
- [ ] other services I want to host and access on the internet?
