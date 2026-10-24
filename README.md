# Ex-Tracker — Personal Finance Tracker

Ex-Tracker is a full-stack web application for recording income and expenses and reviewing personal financial activity through a dashboard. It combines a React frontend with a Node.js/Express API and MongoDB.

## Features

- Register and log in with JWT-based authentication
- Record income sources and expense categories
- View totals for income, expenses, and balance
- Review recent transactions and financial trends
- Export income and expense data to Excel
- Manage profile details and upload a profile photo
- Use authenticated API endpoints for personal finance data

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, Vite, React Router, Axios |
| UI | Tailwind CSS, React Icons, React Hot Toast |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| File uploads | Multer |
| Data export | xlsx |
| Code quality | ESLint |

## Architecture

```text
React + Vite frontend
        |
        | HTTP requests
        v
Node.js + Express API
        |
        +---- JWT authentication middleware
        |
        v
MongoDB through Mongoose
```

The frontend calls the API for authentication, income and expense operations, and dashboard summaries. The API uses MongoDB models to store user and transaction data.

## Run Locally

### Prerequisites

- Node.js 18 or later
- npm
- A MongoDB instance, local or hosted

### 1. Start the backend

```bash
git clone https://github.com/Zabi-Sideqi/Ex-Tracker.git
cd Ex-Tracker/backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Use your own local or hosted MongoDB connection string and a strong, unique JWT secret. Never commit the real `.env` file.

Start the backend using the script defined in the backend `package.json` (the project README currently uses):

```bash
npm run dev
```

### 2. Start the frontend

Open a second terminal:

```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), or use the URL shown in the terminal.

## API Areas

The API includes routes for:

- Authentication and user profile
- Income records
- Expense records
- Dashboard summaries and trends

Authenticated endpoints require a valid JWT. See the source code for the exact routes and request formats.

## What This Project Demonstrates

- Building a React frontend and REST API
- Authentication with JWT and password hashing
- CRUD operations backed by MongoDB
- Dashboard aggregation and transaction summaries
- File upload handling
- Exporting data to Excel
- Configuring frontend/backend communication

## Source Code

[View Ex-Tracker on GitHub](https://github.com/Zabi-Sideqi/Ex-Tracker)
