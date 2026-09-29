# Running the workshop in Docker instead

[← Workshop instructions](README.md)

An **alternative** to the README's set-up, for anyone whose local Node or Vite won't
cooperate. The README's `npm ci` / `npm run dev` is still how most people should do this.

Nothing about the drills is different. You still edit `src/state.jsx` and
`src/pantry.test.jsx` in VS Code. The only thing that moves is *where Node runs*.

## Drills 1–4 and 9–14 — in the browser

From this `inclass/wk6/react/` folder:

```bash
docker compose watch
```

The first run builds an image with Node 22 and every dependency installed — a minute or
two the first time, instant after. Once it says `Watch enabled`, open
**http://localhost:5173**. Keep that terminal open; each save is copied into the
container and the page reloads. `Ctrl+C` stops watching; `docker compose down` stops the
container.

## Drills 5–8 — component tests

Keep `docker compose watch` running, and in a **second** terminal, same folder:

```bash
docker compose exec react npm run test:unit:watch
```

That runs Vitest inside the same container. Saving `src/pantry.test.jsx` in VS Code syncs
it in, and the watcher re-runs. For the worked answers:
`docker compose exec react npm run test:unit:answers`.

## If something goes wrong

| Symptom | First thing to check |
|---|---|
| "no service configured for watch" | You're in the wrong folder — run it from `inclass/wk6/react/` |
| `service "react" is not running` on the exec command | Start `docker compose watch` first, in the other terminal |
| Port 5173 already in use | Last week's container or dev server is still running. `docker compose down` in `inclass/wk5/react/`, or run `VITE_PORT=5174 docker compose watch` and open `localhost:5174` |
| Edits don't show up | Look for `Syncing service "react"` in the watch terminal after you save; if it's there, hard-refresh the browser |
