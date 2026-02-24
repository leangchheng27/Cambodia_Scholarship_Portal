import React from 'react';

const SocialAuthButtons = ({ mode = 'login' }) => {
  const isLogin = mode === 'login';

  return (
    <>
      <button className={isLogin ? "social-btn" : "oauth-btn"}>
        <span style={{ marginRight: 8, fontSize: 20 }}>🌐</span> 
        {isLogin ? 'Continue with Google' : 'Sign up with Google'}
      </button>
      <button className={isLogin ? "social-btn secondary" : "phone-btn"}>
        {isLogin ? 'Continue with Phone Number' : 'Sign up with Phone Number'}
      </button>
    </>
  );
};

export default SocialAuthButtons;
