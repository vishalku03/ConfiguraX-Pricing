# Laptop Pricing System — Backend

Backend REST API for the Laptop Pricing System.

This backend provides authentication, dashboard statistics, laptop component management, component price history, and laptop configuration management.

---

## Features

### Authentication

- User login
- JWT-based authentication
- Protected API routes
- Authenticated user information
- Token-based authorization

### Dashboard

Provides pricing system statistics:

- Total components
- Active components
- Total configurations
- Total quoted value
- Recent configurations

### Component Management

Manage laptop components such as:

- Processor
- RAM
- Storage
- Graphics Card
- Display
- Battery
- Keyboard
- Operating System

Supported operations:

- Create component
- Get components
- Get component by ID
- Update component
- Activate / deactivate component
- Component search
- Category filtering
- Component price history

### Configuration Management

Create and manage laptop quotations.

Each configuration contains:

- Configuration name
- Selected component IDs
- Component information
- Price at quotation
- Total quotation price
- Created date
- Created by

The same component combination can be used in multiple configurations with different configuration names.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Express Validator | Request validation |
| Axios | External/API communication where required |
| dotenv | Environment configuration |
| CORS | Cross-origin requests |

---

## Requirements

Make sure the following are installed:

- Node.js 18+
- npm 9+
- MongoDB

Check versions:

```bash
node --version
npm --version
mongod --version


Installation
1. Clone the Repository
git clone <repository-url>
2. Open the Backend Project
cd laptop-pricing-backend
3. Install Dependencies
npm install
Environment Variables

Create a .env file in the backend root directory.

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/laptop-pricing
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
Environment Variables
Variable	Description
PORT	Backend server port
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret used for JWT signing
JWT_EXPIRES_IN	JWT expiration time
CLIENT_URL	Frontend application URL

Never commit .env to Git.

Run the Server
Development
npm run dev
Production
npm start

The API will normally run at:

http://localhost:5000

API base URL:

http://localhost:5000/api