import React from 'react';
import './ForgotPasswordForm.css';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const {
    step,
    email,
    setEmail,
    otp,
    setOtp,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    success,
    handleSendOTP,
    handleVerifyOTP,
    handleResetPassword,
    handleBackToEmail,
    handleBackToOTP,
  } = useForgotPassword();

  return (
    <>
      <h1 className="auth-title">Reset Your Password</h1>

      {step === 1 ? (
        // Step 1: Enter Email
        <form onSubmit={handleSendOTP} className="auth-form">
          <p className="form-description">
            Enter your email address and we'll send you a code to reset your password.
          </p>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Code'}
          </button>
        </form>
      ) : step === 2 ? (
        // Step 2: Enter OTP
        <form onSubmit={handleVerifyOTP} className="auth-form">
          <p className="form-description">
            We've sent a 6-digit code to <strong>{email}</strong>
          </p>

          <div className="form-group">
            <label className="form-label">Reset Code</label>
            <input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="form-input code-input"
              maxLength="6"
              required
            />
            <p className="input-hint">Enter the 6-digit code from your email</p>
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            Verify Code
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={handleBackToEmail}
            disabled={loading}
          >
            Use different email
          </button>
        </form>
      ) : (
        // Step 3: Create New Password
        <form onSubmit={handleResetPassword} className="auth-form">
          <p className="form-description">
            Create a new password for your account
          </p>

          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              type="password"
              placeholder="Create a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={handleBackToOTP}
            disabled={loading}
          >
            Back
          </button>
        </form>
      )}

      <div className="muted-text">
        Remember your password? <Link to="/login">Back to Login</Link>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
