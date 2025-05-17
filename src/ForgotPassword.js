import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

export default function ForgetPassword() {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState('request');

  const handleRequest = async () => {
    try {
      await Auth.forgotPassword(username);
      console.log('📨 Code sent to email');
      setStep('reset');
    } catch (err) {
      console.error('❌ Error requesting reset:', err);
    }
  };

  const handleReset = async () => {
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword);
      console.log('✅ Password reset!');
    } catch (err) {
      console.error('❌ Error resetting password:', err);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      {step === 'request' ? (
        <>
          <input className="border p-2 w-full mb-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <button className="bg-yellow-600 text-white px-4 py-2 rounded" onClick={handleRequest}>Send Code</button>
        </>
      ) : (
        <>
          <input className="border p-2 w-full mb-2" placeholder="Code" onChange={(e) => setCode(e.target.value)} />
          <input className="border p-2 w-full mb-2" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleReset}>Reset Password</button>
        </>
      )}
    </div>
  );
}
