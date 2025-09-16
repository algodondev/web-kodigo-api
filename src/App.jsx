import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from "react-router";
import Login from './pages/login.jsx'
import { CreateUser } from './pages/CreateUser.jsx';
import Dashboard from './pages/Dashboard.jsx';
function App() {

  /// routerdom react
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path='/crearusuario' element={<CreateUser />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App