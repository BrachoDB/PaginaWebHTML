# Parking Lot Backend Management System

## Overview
This is a production-ready Node.js + Express backend for a parking lot management system.

## Stack
- **Node.js**: Runtime
- **Express**: Framework
- **MySQL (via Sequelize)**: Database
- **Sequelize**: ORM
- **Bcrypt**: Password hashing
- **JWT**: Authentication
- **Vercel**: Deployment Configuration

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file in the root directory (see `.env.example` or just `.env` if locally):
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=parking_lot
    JWT_SECRET=supersecretkey
    ```

3.  **Database Seeding**:
    Run the seed script to create tables and initial data (Admin user, Tariffs, Spaces):
    ```bash
    npm run seed
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## API Endpoints

### Auth
- `POST /api/auth/login`: Login for Admin/Operator
- `POST /api/auth/register`: Register new user (Admin only)

### Vehicles (Operator/Admin)
- `POST /api/vehicles/entry`: Register vehicle entry using Plate and Type
- `POST /api/vehicles/exit`: Register vehicle exit using Plate

### Tariffs (Admin)
- `GET /api/tariffs`: List tariffs
- `POST /api/tariffs`: Create tariff
- `PUT /api/tariffs/:id`: Update tariff
- `DELETE /api/tariffs/:id`: Delete tariff

### Users (Admin)
- `GET /api/users`: List users
- `POST /api/users`: Create user
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Delete user

## Deployment
Configured for Vercel deployment via `vercel.json` and `api/index.js`.
