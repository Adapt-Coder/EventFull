import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate // To redirect users
} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import './App.css'; // Keep global styles if needed

function App() {
  // Simple state to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Add state for user info

  const handleLogin = (username) => { // Accept username
    setIsLoggedIn(true);
    setCurrentUser(username); // Store username
  };

  // Placeholder for logout
  // const handleLogout = () => {
  //  setIsLoggedIn(false);
  //  setCurrentUser(null); // Clear username
  // };

  return (
    <Router>
      {/* Removed the outer app-container div from here, as components handle their layout */}
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard username={currentUser} /> : <Navigate to="/login" replace />} // Pass username
        />
        {/* Remove About route */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
        
        {/* Redirect root path */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />
        {/* Optional 404 route */}
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
