// src/features/auth/services/authApi.js

// Simulate API call using localStorage for temporary storage
export async function login({ email, password }) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get stored accounts from localStorage
  const storedAccounts = localStorage.getItem('accounts');
  const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];
  
  // Find user by email and password
  const user = accounts.find(
    acc => acc.email === email && acc.password === password
  );
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Return user data (without password)
  const { password: _, ...userData } = user;
  return userData;
}

// Store user account during signup
export function registerAccount(userData) {
  const storedAccounts = localStorage.getItem('accounts');
  const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];
  
  // Check if email already exists
  if (accounts.some(acc => acc.email === userData.email)) {
    throw new Error('Email already registered');
  }
  
  // Add new account
  accounts.push(userData);
  localStorage.setItem('accounts', JSON.stringify(accounts));
  
  return userData;
}
