import React from 'react'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Input = ({ value, onChange, label, type, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
      </label>
      <div className='relative'>
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='w-full bg-white border border-gray-300 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200'
        />
        {type === 'password' && (
          <button
            type='button'
            className='absolute inset-y-0 right-3 flex items-center cursor-pointer focus:outline-none'
            onClick={toggleShowPassword}
            tabIndex={-1}
          >
            {showPassword ? (
              <FaRegEyeSlash className='text-xl text-gray-500' />
            ) : (
              <FaRegEye className='text-xl text-gray-500' />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input
