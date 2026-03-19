import React from 'react';
import './AuthLayout.css';
import logo from '../assets/login/logo.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="auth-form-wrapper">
          {children}
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-branding">
          <img src={logo} alt="CSP Logo" className="branding-logo" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
