import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <Router>
      <Routes>
        <Route path="/" element={token?<Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={token?<Dashboard token={token} />:<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
