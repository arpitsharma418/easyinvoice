# MERN Invoice Generator Platform

## Overview
EasyInvoice is a multi-page web app for freelancers and small businesses to handle invoice workflows:
- User registration and login
- Authenticated CRUD for invoices
- Invoice status tracking (`draft`, `sent`, `paid`)
- Invoice preview view
- PDF download/print support from the browser

The backend uses JWT stored in HTTP-only cookies, and invoice ownership is enforced server-side so users can only access their own invoices.

## Features

### Authentication
- Register account with `name`, `email`, `password`
- Login with credentials
- JWT-based auth via cookie (`token`)
- Logout endpoint to clear session cookie

### Invoice Management
- Create invoices with:
  - Invoice number, issue date, due date
  - Sender (fromBusiness) and client (toBusiness) details
  - Line items (`description`, `quantity`, `unitPrice`)
  - Tax rate, notes, status
- Automatic calculation of:
  - `subtotal`
  - `taxAmount`
  - `total`
- List all invoices for logged-in user
- Edit existing invoices
- Delete invoices

### Preview and Export
- Preview invoice layout from dashboard
- Download/print invoice as PDF using `react-to-print`

### Validation and Security
- Request validation with Joi
- Password hashing with bcrypt
- Protected invoice routes with auth middleware
- CORS and cookie parsing configured in backend

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify
- React To Print
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi validation
- JWT authentication
- bcrypt.js
- cors

## How It Works

### Backend Flow
1. `server.js` initializes middleware (`cors`, JSON parsing, cookie parser).
2. MongoDB connection is created through `MONGODB_URI`.
3. Auth routes are mounted at `/api/auth`.
4. Invoice routes are mounted at `/api/invoices`.
5. Protected routes use `authMiddleware`, which verifies the JWT from `req.cookies.token`.

### Frontend Flow
1. App bootstraps via `BrowserRouter` and `AuthProvider`.
2. Auth state is restored from `localStorage`.
3. Dashboard fetches invoices from the backend with credentials enabled.
4. Create/Edit actions submit invoice payloads; server recalculates totals.
5. Preview stores selected invoice in `localStorage` and renders printable view.

## API Reference

Base URL (local backend): `http://localhost:5000`

### Auth Routes
- `POST /api/auth/register`
  - Validates body (`name`, `email`, `password`)
  - Creates user + sets auth cookie
- `POST /api/auth/login`
  - Verifies credentials + sets auth cookie
- `GET /api/auth/logout`
  - Clears auth cookie

### Invoice Routes (Authenticated)
- `POST /api/invoices`
  - Create invoice (Joi validated)
- `GET /api/invoices`
  - Get all invoices for current user
- `PUT /api/invoices/:id`
  - Update invoice by ID
- `DELETE /api/invoices/:id`
  - Delete invoice by ID


## Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
```

## Local Setup

### Prerequisites
- Node.js 18+
- npm
- MongoDB (local or Atlas)

### 1) Clone and enter project
```bash
git clone <your-repo-url>
cd EasyInvoice.ai
```

### 2) Install dependencies
```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3) Configure environment
- Create/update `backend/.env` with backend variables
- Ensure `frontend/.env` has `VITE_API_URL`

### 4) Run backend
```bash
cd backend
npm run dev
```

### 5) Run frontend
```bash
cd frontend
npm run dev
```

## Available Scripts

### Backend (`backend/package.json`)
- `npm start` - run Node server
- `npm run dev` - run with nodemon

### Frontend (`frontend/package.json`)
- `npm run dev` - start Vite dev server
- `npm run build` - production build

## Author
Built by Arpit Sharma.