// Transactions.jsx
import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import TransactionInfoCard from '../../components/Cards/TransactionInfoCard'
import { useLocation } from 'react-router-dom'
import CustomPieChart from '../../components/Charts/CustomPieChart'

const Transactions = () => {
  const location = useLocation()
  const transactions = location.state?.transactions || []

  // Calculate total income and expense
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + (t.amount || 0), 0)
  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + (t.amount || 0), 0)

  // Pie chart data
  const pieData = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expense', amount: totalExpense },
  ]
  const pieColors = ['#fa2c37', '#875cf5']

  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-5 mx-auto'>
        <h2 className='text-2xl font-bold mb-2'>All Transactions</h2>
        <p className='text-gray-500 mb-6'>
          Overview of your income and expenses
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          {transactions.length === 0 ? (
            <p className='text-gray-500'>No transactions found.</p>
          ) : (
            transactions.map((item) => (
              <TransactionInfoCard
                key={item._id || item.id}
                title={item.type === 'expense' ? item.category : item.source}
                icon={item.icon}
                date={item.date}
                amount={item.amount}
                type={item.type}
              />
            ))
          )}
        </div>
        {/* Pie chart for income vs expense now at the bottom */}
        <div className='bg-white rounded-xl shadow-lg p-8'>
          <CustomPieChart
            data={pieData}
            label='Total'
            totalAmount={`$${totalIncome - totalExpense}`}
            colors={pieColors}
            showTextAnchor
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Transactions
