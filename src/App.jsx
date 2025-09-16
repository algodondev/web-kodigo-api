import './App.css'
import { BrowserRouter,Routes,Route, Navigate } from "react-router";
import Login from './pages/login.jsx'
import { CreateUser } from './pages/CreateUser.jsx';
import Dashboard from './pages/Dashboard.jsx';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('Token');

  if (!token) {
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

function HomeRoute() {
  const token = localStorage.getItem('Token');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

function App() {

  /// routerdom react
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
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
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App