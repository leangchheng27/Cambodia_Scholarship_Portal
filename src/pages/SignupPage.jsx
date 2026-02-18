import React from 'react';
import SignupForm from '../features/auth/components/SignupForm/SignupForm';
import AuthLogo from '../features/auth/components/Authlogo/Authlogo';
import '../features/auth/styles/SignupPage.css';

const SignupPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left"><SignupForm /></div>
        <div className="auth-right"><AuthLogo /></div>
      </div>
    </div>
  );
};

export default SignupPage;
