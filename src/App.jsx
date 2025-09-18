import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { useEffect, useState } from 'react';
import Login from './pages/login.jsx'
import { CreateUser } from './pages/CreateUser.jsx';
import { Home } from './pages/Home.jsx';
import BootcampDetail from './pages/BootcampDetail.jsx';
import { verificarAutenticacion } from './services/RestServices.js';
import Navbar from './components/Navbar.jsx';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await verificarAutenticacion();
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error de autenticación:', error.message);
        setIsAuthenticated(false);
        // Token inválido, redirigir al login
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return <div>Verificando autenticación...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function PublicRoute({ children }) {
  const token = localStorage.getItem('Token');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


// Component to handle body styles based on route
function BodyStyleManager() {
  const location = useLocation();

  useEffect(() => {
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

    if (isAuthRoute) {
      // Remove justify-content: center for auth routes
      document.body.style.justifyContent = 'flex-start';
    } else {
      // Restore justify-content: center for other routes
      document.body.style.justifyContent = 'center';
    }

    // Cleanup function to reset when component unmounts
    return () => {
      document.body.style.justifyContent = 'center';
    };
  }, [location.pathname]);

  return null;
}

function App() {

  /// routerdom react
  return (
    <BrowserRouter>
      <BodyStyleManager />
      <Routes>
        <Route path="/" element={<Navigate to={localStorage.getItem('Token') ? '/dashboard' : '/login'} replace />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/register' element={
          <PublicRoute>
            <CreateUser />
          </PublicRoute>
        } />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/bootcamp/:id' element={
          <ProtectedRoute>
            <BootcampDetail />
          </ProtectedRoute>
        } />
        <Route path='*' element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App