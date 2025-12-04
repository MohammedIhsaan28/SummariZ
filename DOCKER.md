# Dockerizing SummariZ (Next.js)

This project includes two Dockerfiles and a `docker-compose.yml` to help run the app locally and in production.

Files added:

- `Dockerfile` - production multi-stage build
- `Dockerfile.dev` - dev image for `npm run dev`
- `.dockerignore` - files excluded from Docker context
- `docker-compose.yml` - example compose with Postgres service

Quick commands

1. Build production image locally

```powershell
# from project root (Windows PowerShell)
docker build -t solar-app:latest -f Dockerfile .

# run the image
docker run --rm -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL="postgres://user:pass@host:5432/db" \
  solar-app:latest
```

2. Use docker-compose for local dev (runs production image + Postgres)

```powershell
# build and start services
docker compose up --build

# stop and remove
docker compose down
```

3. Development using `Dockerfile.dev`

```powershell
# build dev image
docker build -t solar-dev -f Dockerfile.dev .

# run (map source for faster iteration if you like)
docker run --rm -it -p 3000:3000 -v ${PWD}:/app solar-dev
```

Environment variables

This app uses several env vars in `lib/*` files — common ones to set inside containers:

- `DATABASE_URL` — database connection string (example: `postgres://postgres:postgres@db:5432/postgres`)
- `CLERK_*` / `NEXT_PUBLIC_*` / `OPENAI_KEY` / `STRIPE_*` — set as needed for external services

Notes & customization

- If you use a different package manager (pnpm, yarn), update the Dockerfiles accordingly.
- The production `Dockerfile` runs `npm run build` and `npm start`. If you host on platforms with special requirements (e.g., Vercel, Fly), adapt accordingly.
- `docker-compose.yml` provides a Postgres service for convenience; if you use Neon or other serverless DBs, remove the `db` service and set `DATABASE_URL` appropriately.

Compatibility note (peer dependency conflicts)

- This project currently has mixed dependency versions that may trigger npm peer-dependency resolution errors during `npm ci` or `npm install` (you may have seen `ERESOLVE` errors referencing `zod` and `@langchain/community`).
- The provided `Dockerfile` uses `npm install --legacy-peer-deps` as a pragmatic workaround so builds complete inside Docker. For reproducible builds you should:
  1. Run locally: `npm install --legacy-peer-deps`
  2. Commit the resulting `package-lock.json` to the repo so Docker builds use the same lockfile and don't attempt to re-resolve deps.

If you'd like, I can scan dependencies and propose an upgrade/downgrade plan to resolve the root cause instead of relying on `--legacy-peer-deps`.

If you want, I can:

- Add a `Makefile` or `scripts` to standardize Docker commands.
- Add healthchecks and a smaller runtime image (e.g., `gcr.io/distroless/nodejs`) after we confirm the app runs.
- Scan the codebase for needed env variables and add a `.env.example` configured for local compose.
