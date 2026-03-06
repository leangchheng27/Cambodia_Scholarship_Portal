import React from 'react';
import logo from '../../../../assets/Login/logo.png';
import './Authlogo.css';

const AuthLogo = () => (
  <div className="auth-logo-wrapper">
    <img src={logo} alt="Cambodia Scholarship Portal" className="auth-logo" />
  </div>
);

export default AuthLogo;