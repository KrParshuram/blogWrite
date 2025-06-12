import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth.js'
import { logout } from '../../store/authSlice.js'

function LogOutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      onClick={logoutHandler}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white shadow hover:bg-blue-200 dark:hover:bg-blue-700 transition duration-300"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
        />
      </svg>
      Logout
    </button>
  )
}

export default LogOutBtn
