// backend/routes/expenseRoutes.js
import express from 'express';

import {
    addExpense,
     getAllExpenses,
      deleteExpense,
       downloadExpenseExcel } from '../controllers/expenseController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/add',protect, addExpense);
router.get('/get',protect, getAllExpenses);
router.get('/downloadexcel',protect, downloadExpenseExcel);
router.delete('/:id',protect, deleteExpense);

export default router;