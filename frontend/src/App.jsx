// App.jsx
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import Transactions from './pages/Dashboard/Transactions'
import UserProvider from './context/UserProvider'
import { Toaster } from 'react-hot-toast'

// Import other components as needed

const App = () => {
  return (
    <UserProvider>
      <div className='min-h-screen overflow-y-auto'>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
            <Route path='/transactions' element={<Transactions />} />

            {/* Define other routes here */}
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '14px',
          },
        }}
      />
    </UserProvider>
  )
}

export default App

const Root = () => {
  //Check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem('token')
  //Redirect to home if authenticated else to login
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    <Navigate to='/login' />
  )
}
