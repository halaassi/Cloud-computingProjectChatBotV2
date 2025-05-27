import React, { useState } from 'react';
import { signUp, confirmSignUp } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [savedEmail, setSavedEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('signup');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    setSuccess('');
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: { email }
        }
      });
      setSavedEmail(email);
      setStep('confirm');
      setSuccess(' Signup successful! Check your email for the verification code.');
    } catch (err) {
      console.error(' Signup error:', err);
      let message = 'Signup failed.';
      if (err.code === 'InvalidPasswordException') {
        message = 'Password must be at least 8 characters and include special characters.';
      } else if (err.code === 'UsernameExistsException') {
        message = 'An account with this email already exists.';
      } else if (err.code === 'InvalidParameterException') {
        message = 'Invalid input. Please check your email and password.';
      } else {
        message = err.message || 'Signup failed.';
      }
      setError(message);
    }
  };

  const handleConfirm = async () => {
    setError('');
    setSuccess('');
    try {
      await confirmSignUp({
        username: savedEmail,
        confirmationCode: code
      });
      setSuccess(' Email confirmed! You can now log in.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(' Confirmation error:', err);
      let error = 'Something went wrong.';
      if (err.code === 'CodeMismatchException') {
        error = 'Incorrect verification code.';
      } else if (err.code === 'ExpiredCodeException') {
        error = 'Verification code has expired.';
      } else if (err.code === 'NetworkError') {
        error = 'Network issue. Please try again.';
      } else {
        error = err.error || 'Confirmation failed.';
      }
      setError(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Signup</h2>
        {error && <p className="login-error">{error}</p>}
        {success && <p style={{ color: '#4caf50', textAlign: 'center' }}>{success}</p>}

        {step === 'signup' && (
          <>
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
            <button className="login-button" onClick={handleSignup}>
              Signup
            </button>
          </>
        )}

        {step === 'confirm' && (
          <>
            <input
              className="login-input"
              placeholder="Verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="signup-button" onClick={handleConfirm}>
              Confirm Code
            </button>
          </>
        )}

        <button
          className="signup-button"
          onClick={() => navigate('/')}
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}
