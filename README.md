# Shula - Traditional Medicine

A modern e-commerce website for a natural medicine brand.

The site is built as a polished portfolio project for a small Hebrew-first brand that sells handmade herbal products, creams, oils, and traditional remedies.

## Live Demo

[Open the live website](https://shula-website-omega.vercel.app/)

## Main Features

- One-page storefront with smooth sections
- Hebrew and English language toggle
- RTL support for Hebrew
- Product catalog with images, descriptions, categories, and tags
- Product detail pages
- Cart state simulation
- Video hero section with optional sound
- Local content files for easier text editing
- Express backend simulation for future API/database connection

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Node.js
- Express

## Project Structure

```text
src/
  components/   Reusable UI parts like Header, Footer, Button, ProductCard
  pages/        Main pages: Home, ProductDetail, Cart
  hooks/        React state logic for language and cart
  services/     API layer used by the frontend
  data/         Products, content files, and local fallback data
  utils/        Small helper functions
  assets/       Imported assets such as the logo

public/
  images/       Product and site images served directly by the browser
  media/        Hero video and audio files

server/
  routes/       Express API routes
  controllers/  Request handlers
  data/         Mock backend product data
  server.js     Express app entry point
```

## Content Management

Site text is separated by language:

```text
src/data/content/he.json
src/data/content/en.json
```

This makes it easier to edit Hebrew and English content without working inside a large JavaScript object.

Products are stored in:

```text
src/data/products.js
server/data/products.js
```

The frontend can use local product data if the backend simulation is not running. The server data keeps the project ready for a future real API or database.

## Backend Simulation

The backend uses Express and mock data.

Current API examples:

```text
GET /api/products
GET /api/products/:id
GET /api/health
```

This structure makes it easy to replace the mock data later with a real database.

## Future Work

- Connect products to a real database
- Add user authentication
- Add a real checkout flow
- Connect to a payment provider such as Stripe, PayPal, or an Israeli clearing provider
- Add admin tools for editing products and content
- Add inventory management
- Add order history and email confirmations
- Improve SEO metadata for each product page

## Local Development

```bash
npm install
npm run dev
```

The development command runs the frontend and the backend simulation together.
