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

The frontend runs at <http://localhost:5173>. Start the backend separately from `../homelane-backend`; its PostgreSQL connection and staff credentials must be configured first. Vite proxies `/api` requests to <http://localhost:3000>. Set `VITE_API_URL` to the deployed backend's `/api` URL when deploying the frontend.

The shared map uses Leaflet and OpenStreetMap tiles. Visitor and buyer routes browse published listings; agent pages manage their own pins; admin listing reviews can correct pins and publish listings. Browser location is optional and stays in the browser. Walking directions use the OpenStreetMap based Valhalla service.

## Other commands

```sh
npm run build
npm start
npm run lint
```
