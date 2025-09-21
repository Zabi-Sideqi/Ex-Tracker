# Ex-Tracker: Personal Finance Management Application

## Project Description

Ex-Tracker is a comprehensive personal finance management application designed to help users track their income and expenses efficiently. It provides a robust backend API built with Node.js, Express, and MongoDB, coupled with a dynamic frontend developed using React and Vite. Users can register, log in, add income and expense records, view dashboard summaries, and even download their financial data as Excel files.

## Features

- **User Authentication**: Secure registration and login with JWT-based authentication.
- **Income Tracking**: Record various income sources with details like icon, source, amount, and date.
- **Expense Tracking**: Log expenses by category, amount, and date, including support for icons.
- **Dashboard Overview**: Get a summary of total income, total expenses, and overall balance. View recent transactions and financial trends over the last 60 days.
- **Data Export**: Download income and expense data as Excel spreadsheets for further analysis.
- **Profile Management**: Users can manage their profiles, including uploading a profile photo.
- **Image Uploads**: Integrated Multer for handling profile photo uploads.
- **CORS Configuration**: Secure and flexible CORS setup to allow frontend-backend communication.

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcryptjs**: For password hashing.
- **jsonwebtoken**: For JWT (JSON Web Token) based authentication.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: For loading environment variables from a `.env` file.
- **multer**: Middleware for handling `multipart/form-data`, primarily for file uploads.
- **xlsx**: For reading and writing Excel files.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling for fast development.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Emoji-Picker-React**: For integrating emoji selection.
- **Moment.js**: For parsing, validating, manipulating, and formatting dates.
- **React Hot Toast**: For elegant and accessible notifications.
- **React Icons**: A collection of popular icon packs.
- **React Router DOM**: For declarative routing in React applications.
- **Recharts**: A composable charting library built with React and D3.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Autoprefixer & PostCSS**: For handling CSS vendor prefixes and transformations.
- **ESLint**: For linting and code quality.

## Installation

To set up and run the Ex-Tracker application, follow these steps:

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)

### Backend Setup

1.  **Clone the repository**:

    ```bash
    git clone <https://github.com/Zabi-Sideqi/Ex-Tracker.git>
    cd Ex-tracker/backend
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory with the following variables:

    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLIENT_URL=http://localhost:5173
    ```

    - Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., `mongodb://localhost:27017/extraker` or your Atlas URI).
    - Replace `your_jwt_secret_key` with a strong, random string for JWT token signing.
    - `CLIENT_URL` should match the URL where your frontend application will be running.

4.  **Run the backend server**:

    ```bash
    npm run dev
    ```

    The server will start on the specified `PORT` (default: 8000).

### Frontend Setup

1.  **Navigate to the frontend directory**:

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the frontend development server**:

    ```bash
    npm run dev
    ```

    The frontend application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

Once both the backend and frontend servers are running:

1.  Open your web browser and navigate to `http://localhost:5173`.
2.  **Register** a new user account or **Log In** if you already have one.
3.  Start tracking your income and expenses using the intuitive interface.
4.  View your financial summary on the dashboard.
5.  Use the export feature to download your data.

## API Endpoints

The backend exposes the following API endpoints:

### Authentication (`/api/v1/auth`)

- `POST /register`: Register a new user.
- `POST /login`: Log in a user and receive a JWT token.
- `GET /getUser`: Get authenticated user's information (requires JWT).
- `POST /images-upload`: Upload a profile image (requires JWT).

### Income (`/api/v1/income`)

- `POST /add`: Add a new income record (requires JWT).
- `GET /get`: Get all income records for the authenticated user (requires JWT).
- `GET /downloadexcel`: Download income data as an Excel file (requires JWT).
- `DELETE /:id`: Delete an income record by ID (requires JWT).

### Expense (`/api/v1/expense`)

- `POST /add`: Add a new expense record (requires JWT).
- `GET /get`: Get all expense records for the authenticated user (requires JWT).
- `GET /downloadexcel`: Download expense data as an Excel file (requires JWT).
- `DELETE /:id`: Delete an expense record by ID (requires JWT).

### Dashboard (`/api/v1/dashboard`)

- `GET /`: Get aggregated dashboard data (total income, total expense, balance, recent transactions, 60-day trends) for the authenticated user (requires JWT).

## Database Schema

### User Model

- `username`: String, required, unique
- `email`: String, required, unique
- `password`: String, required (hashed using bcryptjs)
- `profilePhoto`: String (URL to uploaded photo)
- `createdAt`: Date
- `updatedAt`: Date

### Income Model

- `userId`: ObjectId (refers to User model), required
- `icon`: String
- `source`: String, required (e.g., Salary, Freelance)
- `amount`: Number, required
- `date`: Date, default: current date

### Expense Model

- `userId`: ObjectId (refers to User model), required
- `icon`: String
- `category`: String, required
- `amount`: Number, required
- `date`: Date, default: current date

## Folder Structure

```
Ex-tracker/
├── backend/
│   ├── config/             # Database configuration
│   │   └── db.js
│   ├── controllers/        # Logic for handling requests
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── expenseController.js
│   │   └── incomeController.js
│   ├── middleware/         # Custom middleware (auth, uploads)
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/             # Mongoose schemas
│   │   ├── Expense.js
│   │   ├── income.js
│   │   └── User.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── incomeRoutes.js
│   ├── uploads/            # Directory for uploaded files (e.g., profile photos)
│   ├── package.json        # Backend dependencies and scripts
│   ├── server.js           # Main backend server file
│   └── incomes_details.xlsx # Example/generated Excel file
└── frontend/
    ├── public/             # Static assets
    ├── src/                # React source code
    │   ├── assets/         # Images, icons, etc.
    │   ├── components/     # Reusable React components
    │   ├── context/        # React Context API for global state
    │   ├── hooks/          # Custom React hooks
    │   ├── pages/          # Page-level React components
    │   ├── utils/          # Utility functions
    │   ├── App.jsx         # Main application component
    │   └── main.jsx        # Entry point for React app
    ├── index.html          # Main HTML file
    ├── package.json        # Frontend dependencies and scripts
    ├── vite.config.js      # Vite configuration
    └── eslint.config.js    # ESLint configuration
```

## Contributing

Contributions are welcome! Please feel free to fork the repository, create a new branch, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## Contact

For any questions or inquiries, please contact Zabi Sideqi zabi.sideqi@gmail.com.
