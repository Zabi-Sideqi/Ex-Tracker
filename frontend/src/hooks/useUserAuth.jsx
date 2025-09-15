//frontend/src/hooks/useUserAuth.jsx
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) return

    let isMounted = true

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
        console.log('Fetched user info:', response.data)
        if (isMounted && response.data) {
          updateUser(response.data)
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching user info:', error)
          if (isMounted) {
            clearUser()
            navigate('/login')
          }
        }
      }
    }

    fetchUserInfo()

    return () => {
      isMounted = false
    }
  }, [user, updateUser, clearUser, navigate])
}
