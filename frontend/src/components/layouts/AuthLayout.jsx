//frontend/src/components/layouts/AuthLayout.jsx

import React from 'react'
import CARD from '../../assets/images/card.png'
import { LuTrendingUpDown } from 'react-icons/lu'
const AuthLayout = ({ children }) => {
  return (
    <div className='flex flex-col md:flex-row min-h-screen overflow-y-auto max-h-screen'>
      <div className='w-full md:w-[60vw] px-4 pt-8 pb-12 flex flex-col items-center justify-center'>
        <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
        {children}
        {/* Mobile: Visa CARD och StatsInfoCard under formuläret */}
        <div className='md:hidden w-full flex flex-col items-center mt-8'>
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label='Track your income & expenses'
            value='56K'
            color='bg-purple-800'
          />
          <img
            src={CARD}
            className='w-64 max-w-full mt-6 shadow-lg shadow-blue-400/15 rounded-2xl'
            alt='Card preview'
          />
        </div>
      </div>
      <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
        <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 ' />
        <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-[80px] ' />
        <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 ' />

        <div className='grid grid-cols-1 z-20'>
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label='Track your income & expenses'
            value='56K'
            color='bg-purple-800'
          />
        </div>

        <img
          src={CARD}
          className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 rounded-2xl'
        />
      </div>
    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10 '>
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-slate-50 ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
        <span className='text-[20px]'>${value}</span>
      </div>
    </div>
  )
}
