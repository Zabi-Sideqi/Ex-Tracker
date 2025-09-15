import React, { useState, useEffect } from 'react'
import { LuPlus } from 'react-icons/lu'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { prepareExpenseBarChartData } from '../../utils/helper'

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  // Custom tooltip for category and amount
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload
      return (
        <div
          style={{
            background: '#fff',
            padding: '10px 16px',
            borderRadius: 12,
            boxShadow: '0 2px 8px #875cf522',
            fontSize: 15,
          }}
        >
          <div style={{ fontWeight: 600, color: '#875cf5', marginBottom: 4 }}>
            {item.category || '-'}
          </div>
          <div style={{ color: '#333' }}>
            Amount: <span style={{ fontWeight: 600 }}>${item.amount}</span>
          </div>
        </div>
      )
    }
    return null
  }
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions)
    setChartData(result)
    return () => {}
  }, [transactions])

  return (
    <div className='bg-white rounded-xl shadow-lg p-8'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900 mb-1'>
            Expense Overview
          </h2>
          <p className='text-sm text-gray-500'>
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>
        <button
          className='flex items-center gap-2 bg-[#875cf5] text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-[#6c3ad6] transition-colors duration-200'
          onClick={onAddExpense}
        >
          <LuPlus className='text-lg' />
          Add Expense
        </button>
      </div>
      <div className='w-full h-72'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id='colorExpense' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#875cf5' stopOpacity={0.35} />
                <stop offset='100%' stopColor='#875cf5' stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='date'
              tick={{ fontSize: 16, fill: '#6c3ad6' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 16, fill: '#6c3ad6' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type='monotone'
              dataKey='amount'
              stroke='#875cf5'
              strokeWidth={4}
              fill='url(#colorExpense)'
              dot={{ r: 6, stroke: '#875cf5', strokeWidth: 2, fill: '#fff' }}
              activeDot={{
                r: 8,
                fill: '#875cf5',
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ExpenseOverview
