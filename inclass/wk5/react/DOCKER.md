# Running the workshop in Docker instead

[← Workshop instructions](README.md)

An **alternative** to Step 0b in the README, for anyone whose local Vite setup
won't cooperate — a Node version that won't install, a native-binary error
from Tailwind on install, a machine where `npm ci` just won't finish. The
README's own instructions (`npm ci` / `npm run dev`) are unchanged and are
still how most people should do this; reach for this only if that's not working.

Nothing about the drills themselves is different. You still edit `src/drills.jsx`
and `src/capstone.jsx`, you still see the workshop at a `localhost` URL, you still
use the numbered nav and **Check result**. The only thing that moves is *where
Node runs* — inside a container instead of on your machine.

## Use it

From this `react/` folder:

```bash
docker compose watch
```

The first run builds an image with Node 22 and every dependency already
installed — a minute or two the first time, instant after. Once it says
`Watch enabled`, open **http://localhost:5173**.

Keep that terminal open. Edit files in VS Code exactly as the README describes;
`docker compose watch` copies each save into the container and Vite hot-reloads
the page, same as it would running locally. `Ctrl+C` stops watching;
`docker compose down` stops the container.

## What this does and doesn't cover

| | |
|---|---|
| Drills 1–11, the numbered nav, **Check result** | ✅ works, identically |
| The instructor's `npm test` (Playwright) suite | ❌ not included here — it needs Node installed locally |

Week 6's workshop has its own Docker set-up in `inclass/wk6/react/DOCKER.md`.

## If something goes wrong

| Symptom | First thing to check |
|---|---|
| `docker compose watch` says "no service configured for watch" | You're in the wrong folder — run it from `inclass/wk5/react/`, where this `docker-compose.yml` lives |
| Port 5173 already in use | Something else on your machine is using it. Stop that, or run `VITE_PORT=5174 docker compose watch` and open `localhost:5174` instead |
| Edits don't show up | Check the terminal for a line saying `Syncing service "react"` after your save — if it's missing, the save didn't register; if it's there but the page didn't change, hard-refresh the browser |
| You added an npm package by hand | Add it to `package.json` and save — the compose file rebuilds the image automatically when `package.json` changes |
