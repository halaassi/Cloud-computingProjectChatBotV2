import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './ChatBot'; 
import Signup from './Signup';
import Login from './Login';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import ForgotPasswordEmail from './ForgotPasswordEmail';
import ForgotPasswordCode from './ForgotPasswordCode';
import ForgotPasswordNew from './ForgotPasswordNew';
awsExports.Auth = {
  region: awsExports.aws_project_region,
  userPoolId: awsExports.aws_user_pools_id,
  userPoolWebClientId: awsExports.aws_user_pools_web_client_id,
  authenticationFlowType: 'USER_PASSWORD_AUTH',
  usernameAttributes: ['email'], 
};

Amplify.configure(awsExports);


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<ChatPage />} />
<Route path="/forgot-password" element={<ForgotPasswordEmail />} />
<Route path="/verify-code" element={<ForgotPasswordCode />} />
<Route path="/set-new-password" element={<ForgotPasswordNew />} />

      </Routes>
    </Router>
  );
}

export default App;