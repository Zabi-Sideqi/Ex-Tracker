import React, { useState } from 'react'
import Input from '../inputs/input'
import EmojiPickerPopup from '../EmojiPickerPopup'
import { LuImage } from 'react-icons/lu'

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: '',
  })
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className='space-y-5'>
      {/* Only one icon button and text */}
      <div className='flex items-center gap-3 mb-2'>
        <button
          type='button'
          className='w-12 h-12 flex items-center justify-center bg-purple-50 text-purple-600 rounded-lg focus:outline-none hover:bg-purple-100 transition'
          onClick={() => setShowEmojiPicker(true)}
        >
          {expense.icon ? (
            <img src={expense.icon} alt='icon' className='w-10 h-10' />
          ) : (
            <span className='text-3xl'>
              <LuImage className='text-[#875cf5]' />
            </span>
          )}
        </button>
        <span className='ml-2 text-gray-700 font-medium'>Add Icon</span>
      </div>
      {showEmojiPicker && (
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={(selectedIcon) => {
            setExpense((prev) => ({ ...prev, icon: selectedIcon }))
            setShowEmojiPicker(false)
          }}
        />
      )}
      {/* ...existing code... */}
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange('category', target.value)}
        label='Category'
        placeholder='Rent, Groceries, etc'
        type='text'
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label='Amount'
        placeholder=''
        type='number'
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label='Date'
        placeholder='dd/mm/yyyy'
        type='date'
      />
      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='bg-[#875cf5] text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-[#6c3ad6] transition-colors duration-200'
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  )
}

export default AddExpenseForm
