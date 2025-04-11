import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use for redirection after login
import './LoginPage.css';
import logo from './assets/logo.png'; // Update logo path

function LoginPage({ onLogin }) { // Accept onLogin prop
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Basic validation (more robust validation later with Firebase)
    if (username && email && email.includes('@')) {
      console.log('Logging in with:', { username, email });
      // In a real app, you'd verify credentials here
      // For now, just simulate successful login
      onLogin(username); // Pass username to the handler
      navigate('/dashboard'); // Redirect to the dashboard
    } else {
      alert('Please enter a valid username and email address.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <img src={logo} alt="EventFull Logo" className="login-logo" />
        <h1>Welcome to EventFull</h1>
        <p>Find and connect with campus events tailored for you.</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage; 