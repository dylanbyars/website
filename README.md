# Personal Website

A simple personal website served by an `nginx` Docker container.

A `Makefile` provides scripts to:
- start a dev server for local development
- build an html version of my markdown resume
- build a `periodic-table` react app with `vite`

After rewriting my personal website at least 5 different times in almost as many years, I've finally moved away from a framework. The fear of having to do a big dependencies upgrade every time I wanted to make a content change to my site kept me from touching it - the whole system felt fragile. Now, it's composed of simpler technology that feels more stable. It also frees me up to expand the system from something that just serves static files to an entire web app with a backend.
