
import Income from "../models/income.js";
import Expense from "../models/Expense.js";
import { isValidObjectId, Types } from "mongoose";


// Get Dashboard Data

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Total Income
        const totalIncomeAgg = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalIncome = totalIncomeAgg[0]?.total || 0;

        // Total Expense
        const totalExpenseAgg = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalExpense = totalExpenseAgg[0]?.total || 0;

        // Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // Get expense transactions in the last 60 days
        const last60DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        const expenseLast60Days = last60DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // fetch last 5 income and expense transactions
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                t => ({ ...t.toObject(), type: 'income' })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                t => ({ ...t.toObject(), type: 'expense' })
            )
        ].sort((a, b) => b.date - a.date).slice(0, 5);

        const totalBalance = totalIncome - totalExpense;

        // Final response
        res.json({
            totalBalance,
            totalIncome,
            totalExpense,
            last60DaysExpense: {
                total: expenseLast60Days,
                transactions: last60DaysExpenseTransactions
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions
            },
            recentTransactions: lastTransactions
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

