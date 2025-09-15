// Login.jsx
import React, {  useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/input'
import { validateEmail } from '../../utils/helper'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosinstance'
import { UserContext } from '../../context/UserContext'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    //Make API call to login
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  }
  return (
    <AuthLayout>
    <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
      <p className='text-sm text-slate-700 mt-[5px] mb'>
        Please enter your credentials to access your account.
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label='Email Address'
          type='text'
          placeholder='Enter your email'
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label='Password'
          type='password'
          placeholder='Enter your password'
        />
        {error && <p className='text-sm text-red-500 mt-2'>{error}</p>}
        <button type='submit' className='w-full bg-purple-600 text-white py-3 rounded-lg mt-4 hover:bg-purple-700 transition duration-300'>
          Login
        </button>
        <p className='text-sm text-gray-500 mt-4'>
          Don't have an account? <a href='/signup' className='text-purple-600 hover:underline'>Sign up</a>
        </p>
      </form>


      
    </div>
    </AuthLayout>
  )
}
export default Login; 