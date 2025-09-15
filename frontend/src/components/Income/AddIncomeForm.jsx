import React, { useState } from 'react'
import Input from '../inputs/input'
import EmojiPickerPopup from '../EmojiPickerPopup'
import { LuImage } from 'react-icons/lu'

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    icon: '',
  })
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const handleChange = (key, value) => {
    setIncome((income) => ({
      ...income,
      [key]: value,
    }))
  }

  return (
    <div className='space-y-5'>
      <div className='flex items-center gap-3 mb-2'>
        <button
          type='button'
          className='w-12 h-12 flex items-center justify-center bg-purple-50 text-purple-600 rounded-lg focus:outline-none hover:bg-purple-100 transition'
          onClick={() => setShowEmojiPicker(true)}
        >
          {income.icon ? (
            <img src={income.icon} alt='icon' className='w-10 h-10' />
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
          icon={income.icon}
          onSelect={(selectedIcon) => {
            handleChange('icon', selectedIcon)
            setShowEmojiPicker(false)
          }}
        />
      )}
      <Input
        value={income.source}
        onChange={({ target }) => handleChange('source', target.value)}
        label='Income Source'
        placeholder='e.g. Salary, Freelance'
        type='text'
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label='Amount'
        placeholder='e.g. 5000'
        type='number'
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label='Date'
        placeholder='mm/dd/yyyy'
        type='date'
      />
      <div className='flex justify-end mt-6'>
        <button
          type='button'
          className='bg-[#875cf5] text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-[#6c3ad6] transition-colors duration-200'
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  )
}

export default AddIncomeForm
