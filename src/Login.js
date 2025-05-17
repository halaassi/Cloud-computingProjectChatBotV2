import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await Auth.signIn(username, password);
      console.log('✅ Logged in!');
      navigate('/chat');
    } catch (err) {
      console.error('❌ Login error:', err);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="border p-2 w-full mb-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input className="border p-2 w-full mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}>Login</button>
    </div>
  );
}
