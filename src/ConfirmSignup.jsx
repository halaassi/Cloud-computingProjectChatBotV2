import React, { useState } from 'react';
import { confirmSignUp, resendSignUpCode } from '@aws-amplify/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ConfirmSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ''; 

  const [code, setCode] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      setMessage({ type: 'success', text: 'Account verified! You will be directed to log in.'});
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Account verification failed' });
    }
  };

  const handleResend = async () => {
    try {
      await resendSignUpCode({ username: email });
      setMessage({ type: 'success', text: 'The code has been sent back to your email.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div style={styles.container}>
      <h2>Email confirmation</h2>
      <p>A verification code has been sent to <strong>{email}</strong></p>
      <form onSubmit={handleConfirm} style={styles.form}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code    " 
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Account verification </button>
        <button type="button" style={styles.resendButton} onClick={handleResend}>
Resend code        </button>
        {message.text && (
          <div style={{ color: message.type === 'error' ? 'red' : 'green', marginTop: '10px' }}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    direction: 'rtl',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
  resendButton: {
    padding: '0.5rem',
    fontSize: '0.9rem',
    border: 'none',
    backgroundColor: '#ffc107',
    color: '#000',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};
