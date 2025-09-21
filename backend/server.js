/* 
import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';



const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

connectDB();
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  
 */

// backend/server.js
import 'dotenv/config'
import express from 'express'
import path from 'path'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import incomeRoutes from './routes/incomeRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

const app = express()

// Middleware: CORS (allow origin från .env eller fallback)
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
app.use(
  cors({
    origin: [clientUrl, 'http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Body parsers
app.use(express.json()) // för application/json
app.use(express.urlencoded({ extended: true })) // för x-www-form-urlencoded

// (valfritt) Serve static files från en public-mapp, om du har en sådan
// app.use(express.static(path.join(process.cwd(), 'public')));

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/income', incomeRoutes)
app.use('/api/v1/expense', expenseRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

// Enkel healthcheck
app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Global error handler (fångar async/oväntade fel)
app.use((err, req, res, next) => {
  console.error('Global error handler:', err)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

// Start server efter att DB är uppkopplad
const PORT = process.env.PORT || 8000

const start = async () => {
  try {
    await connectDB() // anta att connectDB returnerar en promise
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} (client allowed: ${clientUrl})`
      )
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()

/* 
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
 */
