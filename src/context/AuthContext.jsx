import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = (userData) => {
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const updateProfile = (profileData) => {
    console.log("AuthContext - Updating profile with:", profileData);
    setUser((prev) => {
      const updatedUser = {
        name: prev?.name || 'Guest User',
        email: prev?.email || '',
        phone: prev?.phone || '',
        nationality: prev?.nationality || 'Cambodian',
        skills: prev?.skills || [],
        avatar: prev?.avatar || null,
        ...prev,
        ...profileData,
      };
      console.log("AuthContext - Updated user:", updatedUser);
      return updatedUser;
    });
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
