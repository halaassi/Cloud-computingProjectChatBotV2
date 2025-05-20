// import React, { useState } from 'react';
// import { Auth } from 'aws-amplify';

// export default function Signup() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [code, setCode] = useState('');
//   const [step, setStep] = useState('signup');

//   const handleSignup = async () => {
//     try {
//       await Auth.signUp({ username, password, attributes: { email } });
//       console.log('📨 Code sent!');
//       setStep('confirm');
//     } catch (err) {
//       console.error('❌ Signup error:', err);
//     }
//   };

//   const confirmSignup = async () => {
//     try {
//       await Auth.confirmSignUp(username, code);
//       console.log('✅ Confirmed!');
//     } catch (err) {
//       console.error('❌ Confirm error:', err);
//     }
//   };

//   return (
//     <div className="p-4 max-w-sm mx-auto">
//       <h2 className="text-xl font-bold mb-4">Signup</h2>
//       {step === 'signup' ? (
//         <>
//           <input className="border p-2 w-full mb-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//           <input className="border p-2 w-full mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//           <input className="border p-2 w-full mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//           <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSignup}>Sign Up</button>
//         </>
//       ) : (
//         <>
//           <input className="border p-2 w-full mb-2" placeholder="Confirmation Code" onChange={(e) => setCode(e.target.value)} />
//           <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={confirmSignup}>Confirm Code</button>
//         </>
//       )}
//     </div>
//   );
// }
import React, { useState } from 'react';
import { signUp, confirmSignUp } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [savedEmail, setSavedEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('signup');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

const handleSignup = async () => {
  try {
    await signUp({
      username: email,
      password,
      options: { userAttributes: { email } },
    });
    setSavedEmail(email);
    setStep('confirm');
    setSuccess('✅ Signup successful! Check your email for the verification code.');
    setError('');
  }catch (err) {
  console.error('❌ Signup error:', err);


  let message = 'Signup failed.';
  if (err.name === 'UsernameExistsException') message = 'An account with this email already exists.';
  else if (err.name === 'InvalidPasswordException') message = 'Password must be at least 8 characters with a number and special character.';
  else if (err.name === 'password is required to signUp') message = 'Password is required.';
  else if (err.name === 'username is required to signUp') message = 'Email is required.';
  else if (err.name === 'Invalid email address format.') message = 'Invalid email address format.';
  else if (err.name === 'NetworkError') message = 'Network issue. Please try again.';

  setError(message);
}
};

  const handleConfirm = async () => {
    try {
      await confirmSignUp({ username: savedEmail, confirmationCode: code });
      setSuccess('✅ Email confirmed! You can now log in.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
        console.log('Error code:', err.name);
  console.log('Error message:', err.message);
      console.error('❌ Confirmation error:', err);
      setError(err.message || 'Confirmation failed');
      let message = 'Something went wrong.';
  if (err.code === 'CodeMismatchException') message = 'Incorrect verification code.';
  else if (err.code === 'EmptyConfirmSignUpCode') message = 'Please enter a verification code.';
  setError(message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Signup</h2>
        {error && <p className="login-error">{error}</p>}
        {success && <p style={{ color: '#4caf50', textAlign: 'center' }}>{success}</p>}

        {step === 'signup' && (
          <>
            <input
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={handleSignup}>
              Signup
            </button>
          </>
        )}

        {step === 'confirm' && (
          <>
            <input
              className="login-input"
              placeholder="Verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="signup-button" onClick={handleConfirm}>
              Confirm Code
            </button>
          </>
        )}

        <button
          className="signup-button"
          onClick={() => navigate('/')}
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}