// frontend/src/components/Charts/CustomPieChart.jsx
import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

// Custom Tooltip för färgad text
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const color = payload[0].payload.color || payload[0].color
    return (
      <div
        style={{
          background: '#fff',
          padding: '8px 12px',
          borderRadius: 8,
          boxShadow: '0 2px 8px #0001',
        }}
      >
        <span style={{ color: color, fontWeight: 600 }}>
          {payload[0].name}: ${payload[0].value}
        </span>
      </div>
    )
  }
  return null
}
const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width='100%' height={380}>
      <PieChart>
        <Pie
          data={data.map((entry, index) => ({
            ...entry,
            color: colors[index % colors.length],
          }))}
          dataKey='amount'
          nameKey='name'
          cx='50%'
          cy='50%'
          innerRadius={100}
          outerRadius={130}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {showTextAnchor && (
          <>
            <text
              x='50%'
              y='45%'
              dy={-25}
              textAnchor='middle'
              fill={colors[2] || '#666'}
              fontSize='14px'
            >
              {label}
            </text>
            <text
              x='50%'
              y='55%'
              dy={8}
              textAnchor='middle'
              fill={colors[2] || '#333'}
              fontSize='24px'
              fontWeight='semi-bold'
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart
