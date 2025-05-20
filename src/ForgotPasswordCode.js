import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ForgotPasswordCode() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleNext = () => {
    if (!code.trim()) return;
    navigate('/set-new-password', { state: { email, code } });
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Enter Code</h2>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Enter the code sent to your email"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded w-full"
        onClick={handleNext}
      >
        Continue
      </button>
    </div>
  );
}
