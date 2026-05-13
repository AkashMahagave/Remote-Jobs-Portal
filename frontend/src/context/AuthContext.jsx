/**
 * Auth Context
 * This file acts as the 'Global State' for our application.
 * It stores the 'user' object and provides functions like login, logout, and register 
 * to any component that needs them (like the Navbar or Dashboard).
 */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the Context object
export const AuthContext = createContext();

/**
 * AuthProvider
 * This component wraps our entire application so that every page has access to auth data.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // The logged-in user's data
  const [loading, setLoading] = useState(true); // To show a loader while checking login status

  // Configure axios to always send cookies (important for security)
  axios.defaults.withCredentials = true;
  
  // The address of our Backend server.
  // In development, use the Vite proxy (/api).
  // In production, use the configured backend URL.
  const backendRoot = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:5050';
  const backendUrl = import.meta.env.DEV ? '/api' : `${backendRoot.replace(/\/$/, '')}/api`;

  // Check if a user is already logged in when the app starts
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  /**
   * checkUserLoggedIn
   * Asks the backend "Who is the current user?" based on the cookie.
   */
  const checkUserLoggedIn = async () => {
    try {
      const res = await axios.get(`${backendUrl}/auth/me`);
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * login
   * Sends credentials to the backend and updates the 'user' state.
   * Supports login with either email or phone number.
   */
  const login = async (identifier, password, loginMethod = 'email') => {
    try {
      const payload = { password };
      if (loginMethod === 'phone') {
        payload.phone = identifier;
      } else {
        payload.email = identifier;
      }
      const res = await axios.post(`${backendUrl}/auth/login`, payload);
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  /**
   * register
   * Creates a new account and logs the user in.
   */
  const register = async (name, email, password, role, phone) => {
    try {
      const payload = { name, email, password, role };
      if (phone) payload.phone = phone;
      const res = await axios.post(`${backendUrl}/auth/register`, payload);
      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Registration failed" };
    }
  };

  /**
   * logout
   * Clears the user state and tells the backend to clear the cookie.
   */
  const logout = async () => {
    try {
      await axios.get(`${backendUrl}/auth/logout`);
      setUser(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  // Provide the user data and functions to the rest of the app
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, backendUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

