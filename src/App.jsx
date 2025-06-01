import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
// import { AuthTest } from './authTest.jsx';  // Named import
// import Login from './pages/Login.jsx'
// import Signup from './pages/SignUp.jsx'
// import Addpost from './pages/AddPost.jsx'
// // import TRTE from './components/RTE.jsx'  // Assuming you have a rich text editor component
// import TestForm from './testForm.jsx'  // Assuming you have a test form component


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      console.log("Current user data:", userData);
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };
  fetchUser();
}, [dispatch]);
// Added dispatch to dependency array for best practice

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full bg-white p-4'>
        <Header />
         {/* Uncomment this line to test authentication */}
        <main>
          {/* <Outlet /> or your main routing components go here */}
        </main>
        <Footer />
      </div>
    </div>
  ) : <h1 className='text-center text-2xl font-bold mt-20'>Loading...</h1>
}



export default App;

// export default App

