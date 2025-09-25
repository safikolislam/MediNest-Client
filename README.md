# Multi-Vendor Medicine E-commerce Website

**Project name:** MediNest



## Project Overview

A full-stack multi-vendor e-commerce application for medicines and healthcare products built with the MERN stack (MongoDB, Express, React, Node). Features include user authentication (email/password + Google/GitHub social), seller and admin dashboards, dynamic product categories, cart & checkout with Stripe, invoices (PDF), admin-managed banner slider, and reporting tools with export and filtering.

---

## Key Features (10+ bullets)

* Multi-role authentication: **User**, **Seller**, **Admin** with role-based routes and permissions.
* Social login with **Google** and **GitHub** (default role = user).
* Responsive UI for **mobile, tablet, and desktop**, including responsive dashboards.
* **Admin dashboard**: manage users, categories, banner ads (slider), payments, sales reports, and export functionality (PDF/CSV/XLSX).
* **Seller dashboard**: manage medicines, payment history, request advertisement, and view seller-specific sales metrics.
* **Shop & Category pages**: tabular listing of medicines with search, sorting (by price), and pagination.
* **Cart & Checkout**: client-side cart, quantity modification, Stripe payment integration, and invoice generation (PDF printable).
* **Realtime toasts/alerts** for CRUD and auth operations (using SweetAlert2 or similar) — no default browser alerts.
* Use **TanStack Query** for all GET requests to fetch and cache data.
* Environment variables to hide Firebase config keys and MongoDB credentials.
* Access token stored in **localStorage** for private API calls; verified on server with middleware.
* **React Hook Form** for all forms and validation.
* Dynamic page titles using **react-helmet** or **re-title**.

---

## Tech Stack

* Frontend: React.js (Vite or CRA), React Router, TanStack Query, React Hook Form, Tailwind CSS or Bootstrap, Swiper.js for sliders
* Backend: Node.js, Express.js, JWT for auth, Stripe for payments
* Database: MongoDB (Atlas)
* Auth: Firebase Auth (optional) or custom JWT + social OAuth
* File storage: Firebase Storage or Cloudinary (for product images)
* Export/Reports: jsPDF / html2pdf for PDFs, csv-writer or json2csv for CSV/XLSX

---

## Repository & Commits Requirements

* **Client-side:** minimum **20 notable GitHub commits** (spread across features/components, e.g., auth, cart, checkout, UI, forms, dashboard sections).
* **Server-side:** minimum **12 notable GitHub commits** (e.g., auth, products API, payments, reports, admin routes).

### Suggested commit breakdown (client)

1. project: initial commit (Vite/CRA scaffold)
2. feat: add routing and layout
3. feat: navbar + responsive menu
4. feat: auth pages (login/signup) UI
5. feat: social login integration (Google/GitHub)
6. feat: implement React Hook Form for signup/login
7. feat: user profile & update profile page
8. feat: home page layout + slider placeholder
9. feat: category cards component
10. feat: shop page table + modal
11. feat: cart page UI + quantity controls
12. feat: checkout flow UI (stripe form placeholder)
13. feat: invoice page and print/PDF button
14. feat: admin dashboard layout
15. feat: seller dashboard layout
16. feat: API integration using TanStack Query for home/shop/category
17. feat: implement toasts for CRUD actions
18. chore: responsive fixes for mobile/tablet
19. feat: implement pagination, sort, search utilities
20. docs: add README and deployment scripts

### Suggested commit breakdown (server)

1. initial commit: express scaffold
2. feat: connect to MongoDB + env config
3. feat: auth routes (signup/login, JWT)
4. feat: social OAuth endpoints (if used)
5. feat: users CRUD (make admin/seller)
6. feat: categories API
7. feat: products API (CRUD + search/sort/pagination)
8. feat: banner/advertise API
9. feat: payments API + stripe webhook handler
10. feat: reports export endpoints (CSV/XLSX/PDF)
11. feat: middleware for auth & role-based access
12. docs: add server README and env samples

---



## API Endpoints (suggested)

### Auth

* `POST /api/auth/signup` — create user (role: user or seller)
* `POST /api/auth/login` — returns JWT access token
* `POST /api/auth/oauth` — social login (Google/GitHub)

### Users

* `GET /api/users` — admin only, list users
* `PATCH /api/users/:id/role` — make admin/seller or downgrade

### Categories

* `GET /api/categories` — list categories
* `POST /api/categories` — admin add category
* `PATCH /api/categories/:id` — admin update
* `DELETE /api/categories/:id` — admin delete

### Products (Medicines)

* `GET /api/products` — supports query params: `?page=&limit=&search=&sort=price_asc|price_desc&category=`
* `GET /api/products/:id` — product details
* `POST /api/products` — seller add product
* `PATCH /api/products/:id` — seller/admin update
* `DELETE /api/products/:id` — seller/admin delete
* `GET /api/products/discounts` — products with discounts (for slider)

### Banner / Advertise

* `GET /api/ads` — list advertised items
* `POST /api/ads` — seller request ad
* `PATCH /api/ads/:id/toggle` — admin toggle add/remove from slider

### Payments

* `POST /api/payments/create-intent` — create Stripe PaymentIntent
* `POST /api/payments/webhook` — stripe webhook for payment confirmation
* `GET /api/payments` — admin/seller filters by status

### Reports

* `GET /api/reports/sales?start=&end=&format=pdf|csv|xlsx` — admin download



## Important Implementation Notes & Tips

* **Private routes**: protect both client routes and server endpoints. Store JWT in localStorage; include `Authorization: Bearer <token>` for private API calls. On server, verify token using middleware and refresh token logic if you implement it.
* **After reload in private routes**: client must validate token and re-fetch user profile on app boot (e.g., in App.jsx), and keep the user logged in as long as token is valid. Use TanStack Query to fetch the current user and set global auth state accordingly.
* **Firebase & env**: if using Firebase Auth, keep `REACT_APP_FIREBASE_API_KEY` etc. in `.env.local` and never commit `.env` to GitHub. Use `process.env.REACT_APP_...` on the client and server `.env` for database URIs and JWT secrets.
* **TanStack Query**: use for all GET requests (home, categories, product list, product details, user/payments fetch). Use `useQuery` and `queryClient.invalidateQueries` after POST/PATCH/DELETE to refresh.
* **Notifications**: use SweetAlert2, react-toastify, or similar for CRUD feedback (success/error). Display toasts on create/update/delete and login/signup.
* **Pagination, search, sort**: implement on the server using MongoDB queries with `.skip()`/`.limit()` and index important fields (name, genericName, company) for search performance.
* **Stripe**: create PaymentIntent on the server and confirm on the client. Use Stripe webhooks to mark payment as `paid` and trigger seller payment record updates.
* **Invoice PDF**: generate client-side using jsPDF or server-side rendering to PDF. Provide a print button that opens a printable layout and triggers `window.print()` or generates downloadable PDF.
* **Export reports**: use libraries to convert JSON -> CSV/XLSX and serve as downloadable file from server.
* **No Lorem Ipsum**: add real-sounding sample text for product descriptions, category descriptions, and site copy.

---

## Environment Variables (example)

### Client (.env)

```
REACT_APP_API_URL=https://api.yoursite.com
REACT_APP_FIREBASE_API_KEY=xxxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxxxx
REACT_APP_FIREBASE_PROJECT_ID=xxxxx
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```







