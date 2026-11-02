# Homelane

Starter monorepo for the Homelane web application.

## Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Package management: npm workspaces

## Requirements

- Node.js 24
- npm 12 or newer

## Run locally

```sh
npm install
cp backend/.env.example backend/.env
npm run dev
```

The frontend runs at <http://localhost:5173>. The Express API runs at <http://localhost:3000>; Vite proxies `/api` requests to it.

## Other commands

```sh
npm run build
npm start
npm run lint
```

The backend keeps the IPT2ME module layout under `backend/src`: controllers, database, middleware, models, routes, services, utilities, and validators. Empty folders are retained with `.gitkeep` until implementation begins.
