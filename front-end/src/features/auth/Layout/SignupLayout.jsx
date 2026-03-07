import React from 'react';
import SignupForm from '../components/SignupForm/SignupForm';
import AuthLogo from '../components/Authlogo/Authlogo';
import '../styles/SignupPage.css';

const SignupLayout = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left"><SignupForm /></div>
        <div className="auth-right"><AuthLogo /></div>
      </div>
    </div>
  );
};

export default SignupLayout;
