# Homework 1 — Wire up the LAMP stack

**Assigned:** Fri 9/4 · **Due:** Fri 9/11, 11:59 PM · **Individual**

In class you ran MySQL by itself, then Apache by itself, connected two containers by hand,
and then watched Compose declare all of that in one file — for a Node and MongoDB app.
You never saw a finished PHP + MySQL Compose file. **That is this assignment.**

You are given a complete, working web application: a survey form, the JavaScript that
validates it, and the PHP that stores it. **None of it runs**, because there is nothing to
run it on. You write the two Docker images and the Compose file that bring it up, and you
seed the database it needs.

## Get the starter

Everything in [`starter/`](starter/) is yours to copy. Put it in `homework/hw1/` in
**your own private repository** — not here; you cannot push to the course repo.

```bash
cp -R ../itws2110-course/homework/hw1/starter/. homework/hw1/
```

Copying the files across in Finder or Explorer works just as well. Your write-up goes in
`homework/hw1/WRITEUP.md`, alongside them.

## What you are given, and what you write

| | |
|---|---|
| **Given, complete** | `src/` — `index.html`, `styles.css`, `app.js`, `submit.php`, `db/config.php`, `db/connect.php`. The application. Read `submit.php` and `db/config.php`; do not edit them. |
| **You write** | `docker/mysql/Dockerfile` · `docker/mysql/init.sql` · `docker/php-apache/Dockerfile` · `docker-compose.yml` |
| **You copy** | `.env.example` → `.env`, then change the password. `.env` is gitignored; the four `MYSQL_*` values in it are what both `db` and `web` read. |
| **You fill in** | `WRITEUP.md` (Task 6) |

Each stub tells you exactly what it needs and which in-class example shows the pattern.

---

## Task 1 — The database image

`docker/mysql/Dockerfile` and `docker/mysql/init.sql`. The image bakes in the schema, the
way Example 2 did, and **seeds it** with at least three obviously-fake rows so the site
has data before any real person submits.

Build this image and run it **on its own** — `docker build`, then `docker run` with the
MySQL variables from your `.env` passed in, exactly as Examples 1 and 2 did. No Compose
yet; that is Task 3. Then check it the way you did in Example 1: get into the running
container and look at the table. **Done when** the `survey` table has every column with
the right type and holds your seed rows.

## Task 2 — The web image

`docker/php-apache/Dockerfile`. PHP, Apache, the PDO MySQL driver the base image lacks,
and a `COPY` of `src/`.

Same approach: build it and run it on its own, as Examples 3 and 4 did, and open it in the
browser. The survey form should appear; submitting it will fail, because there is no
database this container can see yet — that is what Task 3 fixes. **Done when** the image
builds, the form is served, and PHP inside the container has the MySQL driver. Example 5
showed you one way to check.

## Task 3 — Wire them together

`docker-compose.yml`. You have two images that each work alone; now declare them once, on
one network, the way Example 6 did. Requirements are in the stub. Three are worth stating
twice:

- **The database publishes no ports.** Only `web` may reach it. If you can connect from
  your laptop, you are not done.
- **Credentials come from `.env`**, which is gitignored — the pattern from Example 6D. Copy
  `.env.example`, change the password. A password committed to git is a zero on this task.
- **`web` waits for `db` to be *healthy*,** not merely started. You saw why in Example 5E.

Run it with `docker compose watch`, then edit `src/index.html` — change the heading — and
confirm the change appears without a rebuild.

**Done when** both services are up, the database reports healthy, and
<http://localhost:8080> serves the survey with the confirmation page already reporting
your seed rows.

## Task 4 — Reproducible from a clean clone

```bash
docker compose down -v
docker compose watch
```

**Done when** that sequence — from no volumes — yields a working site with exactly your
seed rows in `survey`. No manual SQL, no hand edits, no "oh, you also have to…".

## Task 5 — Add a third service

Add [Adminer](https://hub.docker.com/_/adminer) to `docker-compose.yml`: image `adminer:5`,
published on `${ADMINER_PORT:-8081}`, waiting on `db` the same way `web` does. Open it and
log in with the four things `web` also needs: server `db` (the service name — Adminer is on
the same Compose network), username `appuser`, the password you set as `MYSQL_PASSWORD` in
your `.env`, and database `app`. There is no other password; if you never changed it, it is
still `change_me`, and that is worth fixing before you push. Then look at your table.

This is four or five lines. The point is that a third service costs almost nothing once
the first two are declared properly.

## Task 6 — Write it up

The starter includes `WRITEUP.md`. Fill it in — it is already in `homework/hw1/` after
you copy the starter across. **Three reflection questions**, a short paragraph each:

1. **`watch`** — what happened when you saved a file, and why `COPY src/` is still in the
   Dockerfile even though edits appear without a rebuild.
2. **Compose readiness** — what the healthcheck asks, and what you would have seen on first
   boot without `condition: service_healthy`.
3. **`down` vs `down -v`** — why editing `init.sql` and rebuilding does not change your
   seed rows, and what that says about where schema and data each live.

Plus one line on what broke, and the **AI Use Statement — required.** Which tools, what
for, what you changed. "I did not use AI" is a complete answer.

---

## Grading

| | |
|---|---|
| Task 1 — MySQL image, schema, seed | 25% |
| Task 2 — web image | 15% |
| Task 3 — Compose: no exposed db, env credentials, healthcheck ordering, watch | 30% |
| Task 4 — clean-clone reproducibility | 10% |
| Task 5 — Adminer | 10% |
| Task 6 — write-up and AI statement | 10% |

**Automatic zero on Task 3** if a working credential is committed to git. Rotate it and
resubmit; the late penalty applies, the zero does not stand.

*Autochecked:* `docker compose up --build` from a clean clone; `DESCRIBE survey`;
`SELECT COUNT(*)` equals your seed count; `docker compose port db 3306` returns nothing;
a valid POST inserts exactly one row; `git log -p` contains no `.env`.

## Submission

Everything above belongs in `homework/hw1/` in **your own private repository**. Commit to
`main` and push. That is the whole process — no branch, no pull request.

```bash
git add homework/hw1/
git commit -m "HW1: LAMP stack"
git push
```

Your submission is whatever is on `main` at 11:59 PM Friday. Commit as you go rather than
all at once — the history is part of what I read.

Do not commit `.env` — `homework/hw1/.gitignore` already excludes it. Check with
`git status` before you commit.

**Done when** someone who has never seen your repository can clone it, copy `.env.example`
to `.env`, run one command, and fill out your survey.
