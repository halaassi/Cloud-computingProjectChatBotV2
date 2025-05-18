import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('signup');

  const handleSignup = async () => {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      console.log('📨 Code sent!');
      setStep('confirm');
    } catch (err) {
      console.error('❌ Signup error:', err);
    }
  };

  const confirmSignup = async () => {
    try {
      await Auth.confirmSignUp(username, code);
      console.log('✅ Confirmed!');
    } catch (err) {
      console.error('❌ Confirm error:', err);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      {step === 'signup' ? (
        <>
          <input className="border p-2 w-full mb-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input className="border p-2 w-full mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className="border p-2 w-full mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSignup}>Sign Up</button>
        </>
      ) : (
        <>
          <input className="border p-2 w-full mb-2" placeholder="Confirmation Code" onChange={(e) => setCode(e.target.value)} />
          <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={confirmSignup}>Confirm Code</button>
        </>
      )}
    </div>
  );
}