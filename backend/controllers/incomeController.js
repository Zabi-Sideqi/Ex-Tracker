/* import User from '../models/User.js'; */
import XLSX from 'xlsx';
import Income from '../models/income.js';

// Add Income Source
export const addIncome = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    const { icon, source, amount, date } = req.body;

    // validation Check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: 'Source, Amount, and Date are required' });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: date || Date.now(),
    });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    console.error('Error adding income:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  getAllIncomes
export const getAllIncomes = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Download Income as Excel
export const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const excelData = incomes.map(item => ({
      Icon: item.icon,
      Source: item.source,
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


// Delete Income
export const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete( req.params.id )
      res.json({ message: 'Income deleted successfully' });
  } catch (error) {
    console.error('Error deleting income:', error);
    res.status(500).json({ message: 'Server error' });
  }
};