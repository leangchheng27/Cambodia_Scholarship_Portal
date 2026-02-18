// src/features/auth/services/authApi.js

export async function login({ email, password }) {
  // Replace with your real API endpoint
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
}
