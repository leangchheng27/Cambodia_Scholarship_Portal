import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext(null);

const decodeJwtPayload = (token) => {
  try {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
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
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("profile");
};

// Synchronously parse Google OAuth token from URL before first render
const urlParams = new URLSearchParams(window.location.search);
const urlToken = urlParams.get("token");
if (urlToken) {
  if (isTokenValid(urlToken)) {
    localStorage.setItem("token", urlToken);
    try {
      const payload = decodeJwtPayload(urlToken);
      if (payload?.id || payload?.email) {
        localStorage.setItem(
          "user",
          JSON.stringify({ id: payload.id, email: payload.email }),
        );
      }
    } catch (e) {}
  } else {
    clearStoredAuth();
  }
  window.history.replaceState({}, document.title, window.location.pathname);
}

export const AuthProvider = ({ children }) => {
  const savedToken = localStorage.getItem("token");
  const hasValidToken = isTokenValid(savedToken);

  if (!hasValidToken && savedToken) {
    clearStoredAuth();
  }

  // Initialize state from localStorage
  const [user, setUser] = useState(() => {
    if (!hasValidToken) return null;
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null;
    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return hasValidToken ? localStorage.getItem("token") || null : null;
  });

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  const [isInitializing, setIsInitializing] = useState(true);

  // Verify token with backend on app load or when token changes
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsInitializing(false);
        return;
      }
      try {
        const response = await API.get("/auth/me");
        console.log("AuthContext - Loaded user from backend:", response.data);
        setUser(response.data);
        // Also set profile with all the retrieved data
        setProfile(response.data);
      } catch {
        logout();
      } finally {
        setIsInitializing(false);
      }
    };
    verifyToken();
  }, [token]);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Persist token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Persist profile to localStorage whenever it changes
  useEffect(() => {
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("profile");
    }
  }, [profile]);

  const login = (userData) => {
    if (userData.token) {
      setToken(userData.token);
      const { token: _, ...userWithoutToken } = userData;
      setUser(userWithoutToken);
      // Also set profile from the login response so ProtectedRoute can immediately check it
      setProfile(userWithoutToken);
    } else {
      setUser(userData);
      setProfile(userData);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setProfile(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
  };

  const updateProfile = async (profileData) => {
    try {
      console.log("AuthContext - Updating profile with:", profileData);
      console.log("AuthContext - Current profile before update:", profile);
      console.log("AuthContext - Current user before update:", user);

      // Call backend API to save profile to database
      const response = await API.put("/auth/profile", profileData);
      console.log("AuthContext - Backend API response:", response.data);

      // Update local state with the response data
      const newProfile = { ...profile, ...response.data.profile };
      console.log("AuthContext - New profile after backend save:", newProfile);
      setProfile(newProfile);

      // Also merge profile data into user object
      if (user) {
        const newUser = { ...user, ...response.data.profile };
        console.log("AuthContext - New user after backend save:", newUser);
        setUser(newUser);
      }

      console.log("✅ Profile saved to database successfully");
    } catch (error) {
      console.error("❌ Error saving profile to database:", error);
      // Fallback: Update local state even if backend fails (user can retry)
      const newProfile = { ...profile, ...profileData };
      setProfile(newProfile);
      if (user) {
        const newUser = { ...user, ...profileData };
        setUser(newUser);
      }
      throw error;
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        profile,
        isAuthenticated,
        isInitializing,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
