import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';

import { Header, Footer } from './components';
import Background3D from './pages/Background3D';

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        console.log('Current user data:', userData);

        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Background3D />
        <div className="relative z-10 flex items-center justify-center min-h-screen bg-background text-foreground">
          <h1 className="text-3xl font-semibold animate-pulse">Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Background3D />
  
        <Header />
        <main >
          <Outlet />
        </main>
        <Footer />
      
    </>
  );
}

export default App;
