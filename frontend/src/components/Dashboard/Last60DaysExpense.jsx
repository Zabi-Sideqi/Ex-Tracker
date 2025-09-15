import React, { useState, useEffect } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last60DaysExpense = ({ data }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareExpenseBarChartData(data)
    setChartData(result)

    return () => {
      setChartData([])
    }
  }, [data])

  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between '>
        <h5 className='text-lg'> Last 60 Days Expense</h5>
      </div>
      <CustomBarChart data={chartData} xAxisKey='category' />
    </div>
  )
}

export default Last60DaysExpense
