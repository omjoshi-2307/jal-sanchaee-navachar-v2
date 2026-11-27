# Backend

This is the first backend foundation for V2. It deliberately contains only a health endpoint and validated server configuration; database, authentication, irrigation planning, and credit flows are not implemented yet.


## Requirements

- Node.js 20 or newer
- npm

## Local setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The server defaults to `127.0.0.1:3000`. Set `PORT` to an integer from 1 through 65535 and `HOST` to the desired bind address. Invalid port values fail at startup instead of silently falling back.


## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the TypeScript server with watch mode |
| `npm test` | Run the Node.js test suite through `tsx` |
| `npm run typecheck` | Type-check without emitting files |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run the compiled server |


## API

- `GET /health` — returns a JSON liveness status and an ISO-8601 timestamp.
