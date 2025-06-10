import React from 'react'
import {useDispatch} from "react-redux"
import authService from "../../appwrite/auth.js"
import {logout } from "../../store/authSlice.js"

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        })
    }
  return (
    <button
  className="inline-block px-6 py-2 bg-white text-gray-800 font-semibold rounded-full shadow-md hover:bg-blue-100 transition duration-200"
  onClick={logoutHandler}
>
  Logout
</button>
  )
}

export default LogoutBtn;