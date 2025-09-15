import React, {useContext , useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/input'
import { validateEmail } from '../../utils/helper'
import { ProfilePhotoInput } from '../../components/inputs/profilePhoto'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosinstance'
import {UserContext} from '../../context/UserContext'
import uploadImage from '../../utils/uploadImage'



const SignUp = () => {
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const {updateUser} = useContext( UserContext);
  const navigate = useNavigate()
  let profileImageUrl = '';

  const validatePassword = (pwd) =>
    /^(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(pwd)

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and contain at least one number and one special character.'
      )
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')

    try {
      // Upload profile photo if exists
      if(profilePhoto){
        const imgUploadRes = await uploadImage(profilePhoto);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        username: name,
        email,
        password,
        profilePhoto: profileImageUrl

      });
      
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
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
  };


  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-sm text-slate-700 mt-[5px] mb'>
          Please fill in the information below to create your account.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoInput image={profilePhoto} setImage={setProfilePhoto} />
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            label='Name'
            type='text'
            placeholder='Enter your name'
          />
          <div className='mb-4'></div>
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
            placeholder='Choose a password'
          />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label='Confirm Password'
            type='password'
            placeholder='Confirm your password'
          />
          {error && <p className='text-sm text-red-500 mt-2'>{error}</p>}
          <button
            type='submit'
            className='w-full bg-purple-600 text-white py-3 rounded-lg mt-4 hover:bg-purple-700 transition duration-300'
          >
            Sign Up
          </button>
          <p className='text-sm text-gray-500 mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='text-purple-600 hover:underline'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
