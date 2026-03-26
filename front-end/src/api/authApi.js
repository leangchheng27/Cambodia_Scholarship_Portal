import API from '../services/api';

export async function login({ email, password }) {
  try {
    const response = await API.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return { token, user };
  } catch (error) {
    const message = error.response?.data?.error || 'Login failed';
    throw new Error(message);
  }
}

export async function registerSendOTP(email) {
  try {
    const response = await API.post('/auth/register', { email });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Failed to send OTP';
    throw new Error(message);
  }
}

export async function verifyOTP(email, otp) {
  try {
    const response = await API.post('/auth/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'OTP verification failed';
    throw new Error(message);
  }
}

export async function setPassword(email, password) {
  try {
    const response = await API.post('/auth/set-password', { email, password });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Failed to set password';
    throw new Error(message);
  }
}

export async function getCurrentUser() {
  try {
    const response = await API.get('/auth/me');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Failed to get user';
    throw new Error(message);
  }
}

export function loginWithGoogle() {
  window.location.href = 'http://localhost:3000/auth/google';
}

export async function forgotPassword(email) {
  try {
    const response = await API.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Failed to send reset email';
    throw new Error(message);
  }
}

export async function resetPassword(email, otp, newPassword) {
  try {
    const response = await API.post('/auth/reset-password', { email, otp, newPassword });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Failed to reset password';
    throw new Error(message);
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('profile');
}
