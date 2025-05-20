import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ForgotPasswordCode.css';

export default function ForgotPasswordCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState(''); // ✅ حل المشكلة
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleNext = () => {
    if (!code.trim()) {
      setError('Please enter the code.');
      return;
    }

    setError(''); // Clear previous error
    console.log('Navigating with:', { email, code });
    navigate('/set-new-password', { state: { email, code } });
  };

  return (
    <div className="code-container">
      <div className="code-box">
        <h2 className="code-title">Enter Code</h2>

        {error && <p className="code-error">{error}</p>}

        <input
          type="text"
          className="code-input"
          placeholder="Enter the code sent to your email"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="code-button" onClick={handleNext}>
          Continue
        </button>
      </div>
    </div>
  );
}
