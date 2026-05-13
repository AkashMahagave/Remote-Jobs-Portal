/**
 * Navbar Component
 * This is a reusable component that appears at the top of every page.
 * It provides navigation links and shows different buttons based on whether the user is logged in.
 */
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Briefcase, LogOut, User as UserIcon, Menu, X } from "lucide-react";

const Navbar = () => {
  // We get the 'user' object and 'logout' function from AuthContext
  // This allows the Navbar to know if someone is logged in.
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  // Helper component for navigation links to avoid repetition
  const NavLinks = () => (
    <>
      <NavLink to="/" end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `py-2 md:py-0 transition ${isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600 font-medium"}`}>Home</NavLink>
      <NavLink to="/jobs" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `py-2 md:py-0 transition ${isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600 font-medium"}`}>Find Jobs</NavLink>
      <NavLink to="/companies" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `py-2 md:py-0 transition ${isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600 font-medium"}`}>Companies</NavLink>
      <NavLink to="/how-it-works" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `py-2 md:py-0 transition ${isActive ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600 font-medium"}`}>How it Works</NavLink>
    </>
  );

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="text-xl md:text-2xl font-black text-blue-600 flex items-center gap-2 tracking-tight">
          <div className="bg-blue-600 text-white p-1.5 rounded-xl shadow-lg shadow-blue-200">
            <Briefcase className="w-5 h-5 md:w-6 h-6" />
          </div>
          Remote Jobs
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-6 items-center">
          <NavLinks />
        </div>

        {/* User Actions Section (Login/Signup or Dashboard/Logout) */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden sm:flex items-center space-x-4">
            {user ? (
              // If user is logged in, show Dashboard and Logout
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1">
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden md:inline">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              // If user is NOT logged in, show Login and Register buttons
              <>
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-full border border-blue-600 font-bold transition text-sm md:text-base whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-2 rounded-full font-bold transition text-sm md:text-base whitespace-nowrap shadow-lg shadow-blue-100"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content (Dropdown) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 space-y-4">
            <NavLinks />
            <hr className="border-gray-100" />
            <div className="flex flex-col space-y-4 sm:hidden">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium flex items-center gap-2">
                    <UserIcon className="w-5 h-5" /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="text-red-600 font-medium flex items-center gap-2 text-left">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-blue-600 border border-blue-600 px-4 py-2 rounded-full font-bold text-center">Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-center">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

