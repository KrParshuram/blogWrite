import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login")
    } else if (!authentication && authStatus !== authentication) {
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, authentication, navigate])

  if (loader) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-700 text-lg font-medium animate-pulse">
          Checking authentication...
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default Protected
