# Laptop Pricing System

A full-stack web application for managing laptop components, creating laptop configurations, calculating quotations, and reviewing saved configurations.

The project is divided into two applications:

- **Frontend** — React + Vite
- **Backend** — Node.js + Express + MongoDB

  Because Prefill System Login so :
 **Demo**
   Email -    admin@laptopprice.com
   Password - Admin@123

---

## Project Overview:

The Laptop Pricing System provides an administrative interface for managing laptop component pricing and creating customized laptop quotations.

### Main Features

- User authentication
- JWT-based authorization
- Dashboard statistics
- Laptop component management
- Component search and filtering
- Component price history
- Laptop configuration creation
- Automatic quotation calculation
- Configuration search and filtering
- Configuration details
- Multiple configurations using the same components
- Responsive Material UI interface

---

## Project Structure

```text
laptop-pricing-system/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

# Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development and build tool |
| Material UI | UI components |
| Redux Toolkit | State management |
| React Router | Routing |
| Axios | API communication |
| Notistack | Notifications |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Express Validator | Request validation |
| dotenv | Environment configuration |
| CORS | Cross-origin requests |

---

# Requirements

Install the following before running the project:

- Node.js 18+
- npm 9+
- MongoDB

Check versions:

```bash
node --version
npm --version
mongod --version
```

---

# Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
```

```bash
cd laptop-pricing-system
```

---

# Backend Setup

Open the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## Backend Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/laptop-pricing
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

### Backend Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used for JWT signing |
| `JWT_EXPIRES_IN` | JWT expiration time |
| `CLIENT_URL` | Frontend URL |

> Never commit `.env` files containing secrets or credentials.

---

## Start Backend

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Backend API:

```text
http://localhost:5000
```

API base URL:

```text
http://localhost:5000/api
```

---

# Frontend Setup

Open a new terminal and go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

## Frontend Environment Variables

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

### Frontend Environment Variable

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## Start Frontend

```bash
npm run dev
```

Frontend will normally run at:

```text
http://localhost:5173
```

---

# Run Full Application

Both frontend and backend need to run.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Application:

```text
Frontend
http://localhost:5173

Backend
http://localhost:5000

API
http://localhost:5000/api
```

---

# Application Architecture

```text
                    Laptop Pricing System
                             │
             ┌───────────────┴───────────────┐
             │                               │
             ▼                               ▼
        Frontend                         Backend
        React/Vite                    Node/Express
             │                               │
             │                               │
             ▼                               ▼
       Redux Toolkit                   REST API
             │                               │
             │                               │
             └───────────────┬───────────────┘
                             │
                             ▼
                          MongoDB
```

---

# Authentication Flow

```text
User
 │
 ▼
Login Page
 │
 ▼
POST /api/auth/login
 │
 ▼
JWT Token
 │
 ▼
Frontend Authentication State
 │
 ▼
Protected API Requests
 │
 ▼
JWT Authentication Middleware
 │
 ▼
Protected Backend Controller
```

Authenticated requests use:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Main Application Modules

## 1. Authentication

Provides:

- Login
- JWT authentication
- Protected routes
- Session handling
- Authenticated API requests

---

## 2. Dashboard

The dashboard provides an overview of the pricing system.

### Dashboard Information

- Total components
- Active components
- Total configurations
- Total quoted value
- Recent configurations

---

## 3. Component Management

The system supports the following component categories:

```text
Processor
RAM
Storage
Graphics Card
Display
Battery
Keyboard
Operating System
```

### Component Operations

- Create component
- Edit component
- Activate component
- Deactivate component
- Search components
- Filter by category
- View component price
- View price history

---

# 4. Laptop Configuration

A laptop configuration contains one component from each required category.

Example:

```text
Processor          Intel Core i7-14700H
RAM                16GB DDR5
Storage            512GB NVMe SSD
Graphics Card      NVIDIA RTX 4060
Display            15.6 FHD IPS
Battery            70Wh Battery
Keyboard           Backlit Keyboard
Operating System   Windows 11 Pro
```

---

## Configuration Pricing

The quotation total is calculated from the selected components.

Example:

```text
Processor          ₹35,000
RAM                 ₹8,000
Storage             ₹7,000
Graphics Card      ₹20,000
Display            ₹10,000
Battery             ₹5,000
Keyboard            ₹3,000
Operating System    ₹8,000
--------------------------------
Total              ₹96,000
```

---

# 5. Configuration Management

Saved configurations can be:

- Viewed
- Searched
- Filtered by minimum price
- Filtered by maximum price
- Opened individually
- Reviewed with selected components
- Reviewed with quotation prices

Each configuration contains:

```text
Configuration Name
Configuration ID
Created Date
Created By
Selected Components
Price at Quotation
Total Price
```

---

# Multiple Configurations

The same component combination can be used by multiple configurations.

For example:

```text
Rahul Laptop
├── Same components
└── ₹96,000

Vishal Laptop
├── Same components
└── ₹96,000
```

The configuration name is independent from the selected components.

Therefore, multiple users/configurations can use the same component combination.

---

# API Endpoints

## Authentication

```http
POST /api/auth/login
GET  /api/auth/me
```

## Dashboard

```http
GET /api/dashboard/stats
```

## Components

```http
GET    /api/components
GET    /api/components/:id
POST   /api/components
PUT    /api/components/:id
DELETE /api/components/:id
```

## Configurations

```http
GET  /api/configurations
GET  /api/configurations/:id
POST /api/configurations
PUT  /api/configurations/:id
```

---

# Configuration API

Create configuration:

```http
POST /api/configurations
```

Example request:

```json
{
  "name": "Rahul Laptop",
  "componentIds": [
    "component-id-1",
    "component-id-2",
    "component-id-3",
    "component-id-4",
    "component-id-5",
    "component-id-6",
    "component-id-7",
    "component-id-8"
  ]
}
```

The configuration contains exactly one component from each required category.

---

# Configuration Validation

The backend validates:

- Configuration name
- Component IDs
- MongoDB ObjectIds
- Exactly 8 component IDs
- Required component categories
- Active component availability

The frontend handles validation errors returned by the backend.

---

# Data Flow

```text
React UI
   │
   ▼
Page Component
   │
   ▼
Service Layer
   │
   ▼
Axios
   │
   ▼
REST API
   │
   ▼
Controller
   │
   ▼
Validation
   │
   ▼
Model
   │
   ▼
MongoDB
```

---

# Frontend State Management

Redux Toolkit manages application state.

## Authentication

```text
authSlice
├── user
├── token
└── isAuthenticated
```

## Components

```text
componentSlice
└── items[]
```

## Configurations

```text
configurationSlice
└── items[]
```

---

# Backend Structure

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── componentController.js
│   │   ├── configurationController.js
│   │   └── dashboardController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Component.js
│   │   └── Configuration.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── componentRoutes.js
│   │   ├── configurationRoutes.js
│   │   └── dashboardRoutes.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── componentValidator.js
│   │   └── configurationValidator.js
│   │
│   └── app.js
│
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# Frontend Structure

```text
frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── components/
│   │   └── configuration/
│   │
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── components/
│   │   └── configurations/
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── componentService.js
│   │   └── configurationService.js
│   │
│   ├── store/
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── componentSlice.js
│   │       └── configurationSlice.js
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# Error Handling

The backend returns appropriate HTTP status codes.

| Status | Meaning |
|---|---|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request / Validation Error |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `409` | Conflict |
| `500` | Internal Server Error |

The frontend displays user-friendly error messages using alerts and notifications.

---

# Debugging

## Frontend

Open:

```text
F12 → Console
```

For API requests:

```text
F12 → Network → Fetch/XHR
```

Check:

- Request URL
- Request method
- Request payload
- Request headers
- Response status
- Response body

---

## Backend

Check the terminal running the backend:

```bash
npm run dev
```

For API testing, use:

```text
Postman
```

or browser developer tools.

---

# Common Issues

## Backend Not Connecting

Check:

```env
PORT=5000
```

and:

```env
MONGO_URI=mongodb://127.0.0.1:27017/laptop-pricing
```

Make sure MongoDB is running.

---

## Frontend Cannot Connect to Backend

Check:

```env
VITE_API_URL=http://localhost:5000/api
```

Make sure the backend is running.

---

## CORS Error

Check backend:

```env
CLIENT_URL=http://localhost:5173
```

Make sure it matches the frontend URL.

---

## 401 Unauthorized

Possible causes:

- JWT token expired
- Token missing
- Invalid token
- User session expired

---

# Development Checklist

## Backend

- [ ] MongoDB is running
- [ ] Backend `.env` configured
- [ ] Dependencies installed
- [ ] Backend starts successfully
- [ ] Login API works
- [ ] JWT authentication works
- [ ] Components API works
- [ ] Component CRUD works
- [ ] Price history works
- [ ] Configuration API works
- [ ] Configuration validation works
- [ ] Multiple configurations can use the same components
- [ ] Dashboard API works

## Frontend

- [ ] Frontend `.env` configured
- [ ] Dependencies installed
- [ ] Frontend starts successfully
- [ ] Login works
- [ ] Dashboard loads
- [ ] Components load
- [ ] Component search works
- [ ] Component filtering works
- [ ] Component creation works
- [ ] Component editing works
- [ ] Configuration creation works
- [ ] Price calculation works
- [ ] Configuration saves successfully
- [ ] Configuration list loads
- [ ] Configuration search works
- [ ] Configuration details show correct components
- [ ] Logout works

---

# Production

Before deploying:

1. Configure production MongoDB.
2. Configure production environment variables.
3. Use a strong JWT secret.
4. Configure the production frontend URL.
5. Configure CORS.
6. Build the frontend.
7. Start the backend in production mode.

### Frontend Build

```bash
cd frontend
npm run build
```

### Backend Start

```bash
cd backend
npm start
```

---

# Security

Never commit the following files or values:

```text
.env
JWT secrets
Database passwords
Private API keys
Production credentials
```

Make sure `.gitignore` includes:

```text
.env
.env.local
node_modules/
dist/
```

---

# Project Status

| Module | Status |
|---|---|
| Authentication | Complete |
| JWT Authorization | Complete |
| Dashboard | Complete |
| Component Management | Complete |
| Component Search | Complete |
| Component Filtering | Complete |
| Component Price History | Complete |
| Configuration Creation | Complete |
| Configuration Pricing | Complete |
| Configuration Listing | Complete |
| Configuration Details | Complete |
| Multiple Configurations | Complete |
| REST API | Complete |
| MongoDB Integration | Complete |
| Responsive Frontend | Complete |

---

# License

This project is intended for development, educational, and internal application use unless otherwise specified.

---

# Author

## Laptop Pricing System

Full-stack application built using:

**Frontend**

- React
- Vite
- Material UI
- Redux Toolkit
- React Router
- Axios
- Notistack

**Backend**

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Express Validator
