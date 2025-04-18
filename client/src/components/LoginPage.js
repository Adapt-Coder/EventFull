import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function
import { auth } from '../firebaseConfig'; // Import the auth instance
import './LoginPage.css';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';

function LoginPage() { // Removed onLogin prop
  // Removed username state, using email as the primary identifier
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add password state
  const [error, setError] = useState(''); // State for login errors
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      // Use Firebase sign-in function
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation is now handled by the onAuthStateChanged listener in App.js
      // navigate('/dashboard'); // No longer navigate directly here
    } catch (err) {
      console.error("Firebase Login Error:", err);
      // Provide user-friendly error messages
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/invalid-email'){
          setError('Please enter a valid email address.');
      } else {
        setError('Failed to login. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <img src={logo} alt="EventFull Logo" className="login-logo" /> 
        <h1>Welcome Back!</h1> {/* Updated Heading */}
        <p>Log in to access your EventFull dashboard.</p>
        <form onSubmit={handleLogin}>
          {/* Remove Username field */}
          {/* <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div> */} 
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          {/* Add Password field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display errors */} 
          <button type="submit" className="login-submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {/* Add Link/Button for Sign Up */}
          <p className="signup-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage; 