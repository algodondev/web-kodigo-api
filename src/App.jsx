import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from 'react';
import Login from './pages/login.jsx'
import { CreateUser } from './pages/CreateUser.jsx';
import { Home } from './pages/Home.jsx';
import BootcampDetail from './pages/BootcampDetail.jsx';
import { verificarAutenticacion } from './services/RestServices.js';

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

  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem('Token');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


function App() {

  /// routerdom react
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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