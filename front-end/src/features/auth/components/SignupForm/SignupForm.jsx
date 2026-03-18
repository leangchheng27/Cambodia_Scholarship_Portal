import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SignupForm.css';
import { useSignup, SIGNUP_STEPS } from '../../hooks/useSignup';
import { loginWithGoogle } from '../../services/authApi';

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const location = useLocation();

  const loginTarget = location.search ? `/login${location.search}` : '/login';
  const googleRedirect = new URLSearchParams(location.search).get('redirect');

  const {
    step,
    loading,
    error,
    message,
    handleSendOTP,
    handleVerifyOTP,
    handleSetPassword,
    handleResendOTP,
    goBack,
  } = useSignup();

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      setLocalError("Please enter your email address.");
      return;
    }
    setLocalError("");
    await handleSendOTP(email);
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setLocalError("Please enter a valid 6-digit OTP.");
      return;
    }
    setLocalError("");
    await handleVerifyOTP(otp);
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    if (!password || password.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    setLocalError("");
    await handleSetPassword(password);
  };

  const handleGoogleSignup = () => {
    loginWithGoogle(googleRedirect);
  };

  // Step 1: Email Input
  if (step === SIGNUP_STEPS.EMAIL) {
    return (
      <div className="signup-form-scrollable">
        <h1 className="auth-title">Sign Up</h1>
        <button type="button" className="social-btn" onClick={handleGoogleSignup}>
          <span className="icon">🌐</span> Sign up with Google
        </button>
        <div className="divider-row">
          <div className="line" />
          <span className="or-text">OR</span>
          <div className="line" />
        </div>
        <div className="muted-text">Sign up with your email address</div>
        <form onSubmit={onSubmitEmail} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              className="form-input" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Enter your email address" 
              required 
            />
          </div>
          {(error || localError) && <div className="form-error">{error || localError}</div>}
          {message && <div className="form-success">{message}</div>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Continue'}
          </button>
        </form>
        <div className="footer-text">Already have an account? <Link to={loginTarget}>Sign in</Link></div>
      </div>
    );
  }

  // Step 2: OTP Verification
  if (step === SIGNUP_STEPS.OTP) {
    return (
      <div className="signup-form-scrollable">
        <h1 className="auth-title">Verify Your Email</h1>
        <div className="muted-text">
          We've sent a 6-digit code to <strong>{email}</strong>
        </div>
        <form onSubmit={onSubmitOTP} className="auth-form">
          <div className="form-group">
            <label className="form-label">Enter OTP Code</label>
            <input 
              className="form-input" 
              type="text" 
              value={otp} 
              onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} 
              placeholder="Enter 6-digit code" 
              maxLength={6}
              required 
            />
          </div>
          {(error || localError) && <div className="form-error">{error || localError}</div>}
          {message && <div className="form-success">{message}</div>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
        <div className="footer-text">
          Didn't receive the code?{' '}
          <button 
            type="button" 
            className="link-btn" 
            onClick={handleResendOTP}
            disabled={loading}
          >
            Resend OTP
          </button>
        </div>
        <div className="footer-text">
          <button type="button" className="link-btn" onClick={goBack}>
            ← Back to email
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Set Password
  if (step === SIGNUP_STEPS.PASSWORD) {
    return (
      <div className="signup-form-scrollable">
        <h1 className="auth-title">Set Your Password</h1>
        <div className="muted-text">
          Email verified! Now create a secure password.
        </div>
        <form onSubmit={onSubmitPassword} className="auth-form">
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              className="form-input" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Create a password" 
              required 
            />
            <div className="muted-text">Use 8 or more characters with a mix of letters, numbers & symbols</div>
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input 
              className="form-input" 
              type="password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              placeholder="Confirm your password" 
              required 
            />
          </div>
          {(error || localError) && <div className="form-error">{error || localError}</div>}
          {message && <div className="form-success">{message}</div>}
          <div className="muted-text">
            By creating an account, you agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>.
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    );
  }

  return null;
};

export default SignupForm;