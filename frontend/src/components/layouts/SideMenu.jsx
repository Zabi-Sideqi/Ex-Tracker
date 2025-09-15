// SideMenu.jsx
import React, { useContext } from 'react'
import { BASE_URL } from '../../utils/apiPaths'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar'
const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext)
  // console.log('SideMenu user:', user)

  const navigate = useNavigate()

  const handleClick = (route) => {
    if (route === '/logout') {
      handleLogout()
      return
    }
    navigate(route)
  }

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate('/login')
  }

  return (
    <div className='w-64 h-[calc(100vh-61px)] border-r border-gray-200/50 bg-white  p-5 sticky top[16px] z-20 '>
      <div className='flex flex-col items-center justify-center gap-3 mb-7'>
        {user &&
        user.profilePhoto &&
        typeof user.profilePhoto === 'string' &&
        user.profilePhoto.trim() !== '' ? (
          <img
            src={
              user.profilePhoto.startsWith('http')
                ? user.profilePhoto
                : `${BASE_URL}/uploads/${user.profilePhoto}`
            }
            alt='profile image'
            className='w-20 h-20 bg-slate-400 rounded-full object-cover'
          />
        ) : (
          <CharAvatar
            username={user && user.username ? user.username : 'User'}
            style='text-black flex items-center justify-center text-3xl font-semibold'
            width='w-20'
            height='h-20'
          />
        )}
        <h5 className='text-gray-950 font-medium leading-6'>
          {user && user.username ? user.username : 'User'}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex item-center gap-4 text-[15px] 
                        ${
                          activeMenu === item.label
                            ? ' text-white bg-purple-500'
                            : ''
                        }
                        py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className='text-xl' />
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default SideMenu
