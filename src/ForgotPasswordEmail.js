import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '@aws-amplify/auth';

export default function ForgotPasswordEmail() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    setError('');
    try {
      await resetPassword({ username: email });
      localStorage.setItem('resetEmail', email); // حفظ الإيميل
      navigate('/verify-code');
    } catch (err) {
      setError(err.message || 'Failed to send code.');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        className="border p-2 w-full mb-2"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleSendCode}
      >
        Send Verification Code
      </button>
    </div>
  );
}
