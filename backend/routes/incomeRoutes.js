// backend/routes/incomeRoutes.js

import express from 'express';
import {
    addIncome,
    getAllIncomes,
    downloadIncomeExcel,
    deleteIncome
} from '../controllers/incomeController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIncomes);
router.get('/:downloadexcel', protect, downloadIncomeExcel);
router.delete('/:id', protect, deleteIncome);

export default router;

