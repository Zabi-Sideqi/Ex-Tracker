
import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"]


const FinanceOverview = ({ totalIncome, totalExpense, totalBalance }) => {
  const balanceData = [

    { name: 'Total Income', amount: totalIncome },
    { name: 'Total Expense', amount: totalExpense },
    { name: 'Total Balance', amount: totalBalance },
  ];
  return <div className='card'>
     <div className='flex items-center justify-between mb-4'>
    <h2 className='text-lg'>Finance Overview</h2>
    </div>

    <CustomPieChart
      data={balanceData}
      label='Total Balance'
      totalAmount={`$${totalBalance}`}
      colors={COLORS}
      showTextAnchor
    />

    </div>

    
  
}

export default FinanceOverview