import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmResetPassword } from '@aws-amplify/auth';
import './ForgotPasswordNew.css';
export default function ForgotPasswordNew() {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const code = location.state?.code;

  useEffect(() => {
    if (!email || !code) {
      navigate('/forgot-password');
    }
  }, [email, code, navigate]);

  const handleReset = async () => {
    setError('');
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword
      });

      setSuccess(' Password reset successfully! Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('Reset error:', err);
      setError(err.message || 'Reset failed.');
    }
  };

  return (
    <div className="reset-container">
  <div className="reset-box">
    <h2 className="reset-title">Set New Password</h2>

    {error && <p className="reset-error">{error}</p>}
    {success && <p className="reset-success">{success}</p>}

    <input
      type="password"
      className="reset-input"
      placeholder="New password"
      onChange={(e) => setNewPassword(e.target.value)}
    />

    <button
      className="reset-button"
      onClick={handleReset}
    >
      Reset Password
    </button>
  </div>
</div>

  );
}
