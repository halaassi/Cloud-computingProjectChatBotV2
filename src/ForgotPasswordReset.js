import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmResetPassword } from '@aws-amplify/auth';

export default function ForgotPasswordReset() {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleReset = async () => {
    setError('');
    setSuccess('');
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword
      });
      setSuccess('✅ Password reset successfully! Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('❌ Confirm error:', err);
      if (err.code === 'CodeMismatchException') {
        setError('Incorrect code.');
      } else if (err.code === 'InvalidPasswordException') {
        setError('Password must be at least 8 characters with a special character.');
      } else {
        setError(err.message || 'Reset failed.');
      }
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
      <input
        type="text"
        placeholder="Verification Code"
        className="border p-2 w-full mb-2"
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        className="border p-2 w-full mb-2"
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
