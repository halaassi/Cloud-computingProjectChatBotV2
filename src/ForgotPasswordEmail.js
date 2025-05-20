import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '@aws-amplify/auth';
import './ForgotPasswordEmail.css'; 
export default function ForgotPasswordEmail() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    setError('');
    try {
      await resetPassword({ username: email.trim() });
      localStorage.setItem('resetEmail', email);
      navigate('/verify-code', { state: { email } }); 
    } catch (err) {
  console.error('❌ Forgot password error:', err);
  if (err.code === 'UserNotFoundException') {
    setError('This email is not registered.');
  } else if (err.code === 'InvalidParameterException') {
    setError('Please confirm your account before resetting password.');
  } else {
    setError(err.message || 'Failed to send code.');
  }
}
  };

  return (
  <div className="forgot-container">
  <div className="forgot-box">
    <h2 className="forgot-title">Forgot Password</h2>

    {error && <p className="forgot-error">{error}</p>}

    <input
      type="email"
      className="forgot-input"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <button className="forgot-button" onClick={handleSendCode}>
      Send Verification Code
    </button>

    <button className="forgot-link" onClick={() => navigate('/login')}>
      Back to Login
    </button>
  </div>
</div>
  );
}
