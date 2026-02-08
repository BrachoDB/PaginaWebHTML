# Parking Lot Frontend

## Overview
This is the frontend interface for the Parking Lot Management System, built with HTML5, CSS3, and Vanilla JavaScript.

## Setup & Running

1.  **Backend Required**: Ensure the Node.js backend is running on `http://localhost:3000`.
2.  **Serve Frontend**:
    It is recommended to use a local web server (like Live Server in VS Code or `http-server`) to avoid file protocol issues.
    
    If you have `npx` installed:
    ```bash
    npx http-server .
    ```
    Then open `http://localhost:8080` (or whatever port it assigns).

3.  **Login**:
    - **Admin**: `admin` / `admin123` (Created by seed script)
    - **Operator**: You (as Admin) need to create an Operator user first via the dashboard or API.

## Features implemented

- **Role-Based Login**: Redirects to appropriate view.
- **Operator View**:
  - **Parking Grid**: Visual representation of slots.
  - **Entry**: Click green slot to register vehicle.
  - **Exit**: Click red slot to calculate cost and generate ticket.
  - **Quote**: Shows cost *before* confirmation.
  - **Live Updates**: Grid refreshes every 10 seconds.
- **Admin View**:
  - Manage Users (Create/Delete).
  - Manage Tariffs (View/Delete).
- **Responsive Design**: Optimized for Tablets (large buttons, grid layout).
- **WhatsApp Support**: Floating button.

## Directory Structure
- `index.html`: Login Page
- `dashboard.html`: Main Application
- `css/`: Styles
- `js/`: Logic modules (`api`, `auth`, `app`)
