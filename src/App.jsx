import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import Background3D from './pages/Background3D';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser()
        console.log("Current user data:", userData)
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error)
        dispatch(logout())
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [dispatch])

  return !loading ? (
  <>
    <Background3D />
    <div className="min-h-screen flex flex-col relative z-10">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  </>
) : (
  <>
    <Background3D className="dark"/>
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 relative z-10">
      <h1 className="text-3xl font-semibold text-indigo-700 animate-pulse">
        Loading...
      </h1>
    </div>
  </>
)

}

export default App
