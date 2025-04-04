import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile"); 
    } else {
      navigate("/signin"); 
    }
    setIsDropdownOpen(false)
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMobileToggle = () => {
    setIsMobile(!isMobile); 
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false); 
  };

  const handleLinkClick = () => {
    setIsMobile(false); 
  };

  return (
    <div className="fixed top-0 z-10 w-screen">
    <nav className="bg-linear-to-r from-slate-200 to-orange-600 shadow-lg p-4 lg:px-20  flex items-center justify-between">
      <Link to="/" className="text-2xl text-orange-500 hover:text-orange-900 font-bold font-inter">TastySearch</Link>

      {/* Hamburger icon for mobile view */}
      <button onClick={handleMobileToggle} className="md:hidden">
        {isMobile ? (
          <FaTimes className="text-white text-2xl" /> 
        ) : (
          <FaBars className="text-white text-2xl" /> 
        )}
      </button>

      {/* Desktop view */}
      <div className="hidden md:flex items-center space-x-10">
        <Link to="/" className="text-xl text-white hover:text-orange-100 font-bold font-inter">Home</Link>
        <Link to="/favorites" className="text-xl text-white hover:text-orange-100 font-bold font-inter">Favorites Recipe</Link>

        {isAuthenticated ? (
          <div className="relative">
            <button onClick={handleDropdownToggle} className="flex items-center space-x-2">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40">
                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-2 text-left text-black hover:bg-orange-500 font-bold font-inter hover:text-white cursor-pointer"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-black hover:bg-orange-500 font-bold font-inter hover:text-white cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signin" className="text-xl text-white hover:text-orange-100 font-bold font-inter">Login</Link>
            <Link to="/signup" className="bg-white hover:bg-amber-500 text-orange-500 hover:text-white font-bold font-inter px-4 py-2 rounded">Sign Up</Link>
          </>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <div className="md:hidden absolute top-16 left-0 z-50 w-[250px] h-screen bg-orange-600 font-bold font-inter p-4 flex flex-col pl-10 pt-24 space-y-6">
          <Link to="/" className="text-white text-xl" onClick={handleLinkClick}>Home</Link>
          <Link to="/favorites" className="text-white text-xl" onClick={handleLinkClick}>View Favorites</Link>

          {isAuthenticated ? (
            <div className="flex flex-col space-y-6">
              <button
                onClick={handleProfileClick}
                className="text-white text-xl text-start font-bold font-inter cursor-pointer" 
              >
                Profile
              </button>
              <button
                onClick={logout}
                className="text-white text-xl text-start font-bold font-inter cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/signin" className="text-white text-xl" onClick={handleLinkClick}>Login</Link>
              <Link to="/signup" className="bg-white text-orange-500 font-bold font-inter max-w-24 px-4 py-2 rounded" onClick={handleLinkClick}>Sign Up</Link>
            </> 
          )}
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navbar;
