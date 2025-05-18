import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

const NavBar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUsername(user.username))
      .catch(() => setUsername(''));
  }, []);

  const handleSignOut = async () => {
    await Auth.signOut();
    window.location.reload();
  };

  return (
    <div style={{ background: '#f2f2f2', padding: '10px' }}>
      <span>👤 {username}</span>
      <button onClick={handleSignOut} style={{ float: 'right' }}>Logout</button>
    </div>
  );
};

export default NavBar;
