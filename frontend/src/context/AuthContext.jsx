/**
 * Auth Context
 * This file acts as the 'Global State' for our application.
 * It stores the 'user' object and provides functions like login, logout, and register 
 * to any component that needs them (like the Navbar or Dashboard).
 * 
 * NOTE: This version uses localStorage for demo/portfolio purposes (no backend).
 */
import { createContext, useState, useEffect } from "react";

// Create the Context object
export const AuthContext = createContext();

/**
 * AuthProvider
 * This component wraps our entire application so that every page has access to auth data.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // The logged-in user's data
  const [loading, setLoading] = useState(true); // To show a loader while checking login status

  // Check if a user is already logged in when the app starts (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('rjp_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('rjp_user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * login
   * Simulates login using localStorage (no backend).
   */
  const login = async (identifier, password, loginMethod = 'email') => {
    try {
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem('rjp_users') || '[]');
        if (!Array.isArray(users)) users = [];
      } catch (e) {
        users = [];
      }

      const found = users.find(u => 
        loginMethod === 'phone' 
          ? u.phone === identifier 
          : u.email === identifier
      );

      if (!found) {
        return { success: false, message: "No account found. Please register first." };
      }
      if (found.password !== password) {
        return { success: false, message: "Incorrect password." };
      }

      const userData = { _id: found._id, name: found.name, email: found.email, role: found.role, phone: found.phone };
      setUser(userData);
      localStorage.setItem('rjp_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, message: "Login failed" };
    }
  };

  /**
   * register
   * Creates a new account using localStorage (no backend).
   */
  const register = async (name, email, password, role, phone) => {
    try {
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem('rjp_users') || '[]');
        if (!Array.isArray(users)) users = [];
      } catch (e) {
        users = [];
      }
      
      // Check if email already exists
      if (users.find(u => u.email === email)) {
        return { success: false, message: "An account with this email already exists." };
      }

      const newUser = {
        _id: `user_${Date.now()}`,
        name,
        email,
        password,
        role: role || 'jobseeker',
        phone: phone || ''
      };

      users.push(newUser);
      localStorage.setItem('rjp_users', JSON.stringify(users));

      const userData = { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role, phone: newUser.phone };
      setUser(userData);
      localStorage.setItem('rjp_user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, message: "Registration failed" };
    }
  };

  /**
   * logout
   * Clears the user state and localStorage.
   */
  const logout = async () => {
    setUser(null);
    localStorage.removeItem('rjp_user');
  };

  // Provide the user data and functions to the rest of the app
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
