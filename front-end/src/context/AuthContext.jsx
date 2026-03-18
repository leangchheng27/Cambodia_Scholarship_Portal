import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const decodeJwtPayload = (token) => {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

const isTokenValid = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload) return false;
  if (!payload.exp) return true;
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp > nowInSeconds;
};

const clearStoredAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('profile');
};

// Synchronously parse Google OAuth token from URL before first render
const urlParams = new URLSearchParams(window.location.search);
const urlToken = urlParams.get('token');
if (urlToken) {
  if (isTokenValid(urlToken)) {
    localStorage.setItem('token', urlToken);
    try {
      const payload = decodeJwtPayload(urlToken);
      if (payload?.id || payload?.email) {
        localStorage.setItem('user', JSON.stringify({ id: payload.id, email: payload.email }));
      }
    } catch (e) {}
  } else {
    clearStoredAuth();
  }
  window.history.replaceState({}, document.title, window.location.pathname);
}

export const AuthProvider = ({ children }) => {
  const savedToken = localStorage.getItem('token');
  const hasValidToken = isTokenValid(savedToken);

  if (!hasValidToken && savedToken) {
    clearStoredAuth();
  }

  // Initialize state from localStorage
  const [user, setUser] = useState(() => {
    if (!hasValidToken) return null;
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return null;
    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });
  
  const [token, setToken] = useState(() => {
    return hasValidToken ? localStorage.getItem('token') || null : null;
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
    console.log("AuthContext - Current profile before update:", profile);
    console.log("AuthContext - Current user before update:", user);
    
    const newProfile = { ...profile, ...profileData };
    console.log("AuthContext - New profile after merge:", newProfile);
    setProfile(newProfile);
    
    // Also merge profile data into user object
    if (user) {
      const newUser = { ...user, ...profileData };
      console.log("AuthContext - New user after merge:", newUser);
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
