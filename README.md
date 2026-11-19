# Usmania Vision Co.

Storefront website for a luxury watches and eyewear brand. Visitors browse the catalogue, view product pages and place orders through WhatsApp. The site also has user sign-up/login, a contact form that sends email, and a basic admin dashboard backed by MongoDB.

## Tech stack

- React 19 + TypeScript
- TanStack Start (SSR and server functions) and TanStack Router (file-based routes), built with Vite
- Tailwind CSS 4 and shadcn/ui-style components (Radix UI)
- GSAP (ScrollTrigger), Lenis smooth scrolling, and React Three Fiber / three.js for the hero 3D scene
- MongoDB (official Node driver) for users and products
- JWT via `jose`
- Nodemailer over SMTP (Brevo) for contact-form emails
- Zod for validating server-function input

## Features

- Home page with a 3D hero scene, scroll animations, custom cursor and magnetic buttons
- Watches and glasses listing pages and product detail pages
- "Order via WhatsApp" links prefilled with the product name and price
- Cart page that lists products with search and list/grid/compact views; checkout continues on WhatsApp
- Brand story page and contact page; the contact form sends an email through SMTP
- Sign-up and login with JWT, stored in `localStorage` on the client
- Admin dashboard (`/admin`) that lists products from MongoDB and can delete them. Server functions for creating, updating and seeding products exist in `src/routes/api/products.ts`, and they require a user with `isAdmin: true`

The public catalogue pages currently read from the static list in `src/lib/products.ts`, not from the database.

## Project structure

```
.
├── agents/            # prompt/brief files used while building the site with AI agents
├── scripts/
│   └── seed-admin.ts  # creates or promotes an admin user in MongoDB
├── src/
│   ├── components/    # layout, navbar, product card, animations, 3D scene, ui/ primitives
│   ├── integrations/  # MongoDB client and models, Brevo SMTP mailer, Cloudinary helper
│   ├── lib/           # product data, auth context, JWT helpers, utils
│   ├── routes/        # pages and api/ server functions (auth, contact, products)
│   ├── server.ts      # SSR server entry
│   └── styles.css
├── vite.config.ts
├── vercel.json
└── wrangler.jsonc
```

## Getting started

Requires Node.js and a MongoDB database.

```bash
npm install
# create a .env file with the variables listed below
npm run dev
```

Other scripts:

| Script | What it does |
|--------|--------------|
| `npm run build` | Production build |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |
| `npm run seed:admin` | Create an admin user from `ADMIN_EMAIL` / `ADMIN_PASSWORD` |

The repo has config for both Vercel (`vercel.json`) and Cloudflare Workers (`wrangler.jsonc`).

## Environment variables

`.env.example` is currently empty. The code reads these variables:

| Variable | Used for |
|----------|----------|
| `MONGODB_URI` | MongoDB connection |
| `JWT_SECRET` | Signing and verifying auth tokens |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | SMTP (Brevo) for the contact form |
| `MAIL_FROM`, `MAIL_TO` | Contact-email sender and recipient |
| `CLOUDINARY_CLOUD_NAME` / `VITE_CLOUDINARY_CLOUD_NAME` | Building Cloudinary image URLs |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Used only by `npm run seed:admin` |
