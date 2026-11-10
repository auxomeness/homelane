# Homelane Frontend

Frontend application for Homelane. The backend lives in the separate [homelane-backend](https://github.com/auxomeness/homelane-backend) repository.

## Stack

- Frontend: React, TypeScript, Vite
- Package management: npm

## Requirements

- Node.js 24
- npm 12 or newer

## Run locally

```sh
npm install
npm run dev
```

The frontend runs at <http://localhost:5173>. Start the backend separately from its repository; Vite proxies `/api` requests to <http://localhost:3000>.

## Other commands

```sh
npm run build
npm start
npm run lint
```
