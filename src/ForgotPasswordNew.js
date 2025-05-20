import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmResetPassword } from '@aws-amplify/auth';

export default function ForgotPasswordNew() {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const email = localStorage.getItem('resetEmail');
  const code = localStorage.getItem('resetCode');

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

      setSuccess('✅ Password reset successfully! Redirecting...');
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetCode');

      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('Reset error:', err);
      setError(err.message || 'Reset failed.');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Set New Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
      <input
        type="password"
        className="border p-2 w-full mb-2"
        placeholder="New password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={handleReset}
      >
        Reset Password
      </button>
    </div>
  );
}
