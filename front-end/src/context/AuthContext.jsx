import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Synchronously parse Google OAuth token from URL before first render
const urlParams = new URLSearchParams(window.location.search);
const urlToken = urlParams.get('token');
if (urlToken) {
  localStorage.setItem('token', urlToken);
  try {
    const payload = JSON.parse(atob(urlToken.split('.')[1]));
    localStorage.setItem('user', JSON.stringify({ id: payload.id, email: payload.email }));
  } catch (e) {}
  window.history.replaceState({}, document.title, window.location.pathname);
}

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });
  
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('profile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  // Persist token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  
  // Persist profile to localStorage whenever it changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('profile');
    }
  }, [profile]);
  
  const login = (userData) => {
    if (userData.token) {
      setToken(userData.token);
      const { token: _, ...userWithoutToken } = userData;
      setUser(userWithoutToken);
    } else {
      setUser(userData);
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    setProfile(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
  };
  
  const updateProfile = (profileData) => {
    console.log("AuthContext - Updating profile with:", profileData);
    
    const newProfile = { ...profile, ...profileData };
    setProfile(newProfile);
    
    // Also merge profile data into user object
    if (user) {
      const newUser = { ...user, ...profileData };
      setUser(newUser);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      profile, 
      isAuthenticated,
      login, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
