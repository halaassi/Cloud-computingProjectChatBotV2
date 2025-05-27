import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signOut } from '@aws-amplify/auth';
import './Login.css'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await signOut(); 
    } catch (err) {
      console.warn(' No previous session to sign out.', err);
    }

    try {
      await signIn({ username: email.trim(), password: password.trim() });
      console.log(' Login successful');
      navigate('/chat');
    } catch (err) {
      console.error(' Login failed:', err);

      switch (err.code) {
        case 'UserNotFoundException':
          setError('No account found with this email address.');
          break;
        case 'NotAuthorizedException':
          setError('Incorrect password. Please try again.');
          break;
        case 'UserNotConfirmedException':
          setError('Your account is not confirmed. Please check your email for the verification link.');
          break;
        case 'TooManyFailedAttemptsException':
        case 'LimitExceededException':
          setError('Too many attempts. Please wait and try again later.');
          break;
        case 'PasswordResetRequiredException':
          setError('Password reset required. Please reset your password before logging in.');
          break;
        default:
          if (err.message?.includes('Network') || err.message?.includes('fetch')) {
            setError('Network error. Please check your internet connection.');
          } else {
            setError(err.message || 'Login failed. Please try again.');
          }
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <button
          className="link-button"
          style={{
            background: 'none',
            border: 'none',
            color: '#555',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginTop: '10px'
          }}
          onClick={() => navigate('/forgot-password')}
        >
          Forgot your password?
        </button>

        <button className="signup-button" onClick={() => navigate('/signup')}>
          Don’t have an account? Sign up
        </button>
      </div>
    </div>
  );
}
