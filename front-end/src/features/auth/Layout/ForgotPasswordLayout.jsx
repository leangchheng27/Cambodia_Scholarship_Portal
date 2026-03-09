import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm/ForgotPasswordForm';
import AuthLogo from '../components/Authlogo/Authlogo';
import '../styles/loginPage.css';

const ForgotPasswordLayout = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left"><ForgotPasswordForm /></div>
        <div className="auth-right"><AuthLogo /></div>
      </div>
    </div>
  );
};

export default ForgotPasswordLayout;
