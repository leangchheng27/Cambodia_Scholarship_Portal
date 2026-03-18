// src/features/auth/hooks/useSignup.js
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerSendOTP, verifyOTP, setPassword, login } from '../services/authApi';
import { useAuth } from '../../../context/AuthContext';

// Registration steps
export const SIGNUP_STEPS = {
  EMAIL: 'email',
  OTP: 'otp',
  PASSWORD: 'password',
};

export function useSignup() {
  const [step, setStep] = useState(SIGNUP_STEPS.EMAIL);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = (() => {
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect');
    return redirect && redirect.startsWith('/') ? redirect : null;
  })();

  // Step 1: Send OTP to email
  const handleSendOTP = async (userEmail) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      const result = await registerSendOTP(userEmail);
      setEmail(userEmail);
      setMessage(result.message);
      setStep(SIGNUP_STEPS.OTP);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (otp) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      const result = await verifyOTP(email, otp);
      setMessage(result.message);
      setStep(SIGNUP_STEPS.PASSWORD);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Set password and complete registration
  const handleSetPassword = async (password) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      await setPassword(email, password);
      
      // Automatically login after setting password
      const { token, user } = await login({ email, password });
      loginContext({ ...user, token });
      
      setMessage('Registration successful!');
      navigate(redirectPath || '/profile-setup');
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    return handleSendOTP(email);
  };

  // Go back to previous step
  const goBack = () => {
    if (step === SIGNUP_STEPS.OTP) {
      setStep(SIGNUP_STEPS.EMAIL);
    } else if (step === SIGNUP_STEPS.PASSWORD) {
      setStep(SIGNUP_STEPS.OTP);
    }
    setError(null);
    setMessage(null);
  };

  // Reset the entire flow
  const reset = () => {
    setStep(SIGNUP_STEPS.EMAIL);
    setEmail('');
    setError(null);
    setMessage(null);
  };

  return {
    step,
    email,
    loading,
    error,
    message,
    handleSendOTP,
    handleVerifyOTP,
    handleSetPassword,
    handleResendOTP,
    goBack,
    reset,
  };
}
