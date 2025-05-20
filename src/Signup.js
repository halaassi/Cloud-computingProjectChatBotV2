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
    } catch (err) {
      console.error('❌ Signup error:', err);
      setError(err.message || 'Signup failed');
    }
  };

  const handleConfirm = async () => {
    try {
      await confirmSignUp({ username: savedEmail, confirmationCode: code });
      setSuccess('✅ Email confirmed! You can now log in.');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error('❌ Confirmation error:', err);
      setError(err.message || 'Confirmation failed');
      let message = 'Something went wrong.';
  if (err.code === 'UsernameExistsException') message = 'An account with this email already exists.';
  else if (err.code === 'InvalidPasswordException') message = 'Password must be at least 8 characters with special characters.';
  else if (err.code === 'InvalidParameterException') message = 'Invalid input. Please check your data.';
  else if (err.code === 'CodeMismatchException') message = 'Incorrect verification code.';
  else if (err.code === 'ExpiredCodeException') message = 'Verification code has expired.';
  else if (err.code === 'NetworkError') message = 'Network issue. Please try again.';
  
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






// import React, { useState } from 'react';
// import { signUp, confirmSignUp } from '@aws-amplify/auth';
// import { useNavigate } from 'react-router-dom';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [savedEmail, setSavedEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [code, setCode] = useState('');
//   const [step, setStep] = useState('signup');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       await signUp({
//         username: email,
//         password,
//         options: { userAttributes: { email } },
//       });
//       setSavedEmail(email);
//       setStep('confirm');
//       setSuccess('✅ Signup successful! Check your email for the verification code.');
//     } catch (err) {
//       console.error('❌ Signup error:', err);
//       setError(err.message || 'Signup failed');
//     }
//   };

//   const handleConfirm = async () => {
//     try {
//       await confirmSignUp({ username: savedEmail, confirmationCode: code });
//       setSuccess('✅ Email confirmed! You can now log in.');
//       setTimeout(() => navigate('/'), 1500);
//     } catch (err) {
//       console.error('❌ Confirmation error:', err);
//       setError(err.message || 'Confirmation failed');
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2 className="login-title">Signup</h2>
//         {error && <p className="login-error">{error}</p>}
//         {success && <p style={{ color: '#4caf50', textAlign: 'center' }}>{success}</p>}

//         {step === 'signup' && (
//           <>
//             <input
//               className="login-input"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               className="login-input"
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button className="login-button" onClick={handleSignup}>
//               Signup
//             </button>
//           </>
//         )}

//         {step === 'confirm' && (
//           <>
//             <input
//               className="login-input"
//               placeholder="Verification code"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />
//             <button className="signup-button" onClick={handleConfirm}>
//               Confirm Code
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }