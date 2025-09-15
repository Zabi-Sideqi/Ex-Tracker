// expenseController.js
import XLSX from 'xlsx';
import Expense from '../models/Expense.js';

// Add expense Source
export const addExpense = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    const { icon, category, amount, date } = req.body;

    // validation Check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: 'Category, Amount, and Date are required' });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: date || Date.now(),
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  getAllExpenses
export const getAllExpenses = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Download Expense as Excel
export const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const excelData = expenses.map(item => ({
      Icon: item.icon,
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
    }));
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, 'Incomes');
    XLSX.writeFile(wb, 'incomes_details.xlsx');
    res.download('incomes_details.xlsx');

  } catch (error) {
    console.error('Error downloading income Excel:', error);
    res.status(500).json({ message: 'Server error' });
  }


}


// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete( req.params.id )
      res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
};