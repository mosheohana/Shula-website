# שולה - רפואה מסורתית

A recruiter-ready full-stack e-commerce project for a traditional natural medicine brand.

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- React Router
- Node.js + Express simulation backend
- Mock product data with a service layer ready for a future database

## Run Locally

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend simulation: `http://localhost:4000/api/products`

## Structure

```text
src/
  components/
  pages/
  hooks/
  services/
  data/
  utils/
  assets/
server/
  routes/
  controllers/
  data/
  server.js
```

The frontend falls back to local mock data if the Express server is not running.
