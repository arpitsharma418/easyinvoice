import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full z-50">
      <div className="bg-white shadow fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 py-2"
          >
            <img
              src="/invoice_logo.png"
              alt="invoice_logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-blue-700 tracking-tight">easyinvoice</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-700 font-medium transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Logout
                </button>
                <span
                  title={user.name}
                  className="ml-4 bg-blue-700 text-white w-9 h-9 flex items-center justify-center rounded-full font-bold text-lg shadow"
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold text-gray-700"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu: Dropdown from top */}
        <div
          className={`md:hidden absolute left-0 w-full bg-white shadow-lg z-40 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} top-16`}
          style={{ transitionProperty: 'max-height, opacity' }}
        >
          <div className="px-6 pt-4 pb-6">
            <nav className="flex flex-col gap-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="text-gray-700 hover:text-blue-700 font-medium text-lg"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); closeMenu(); }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition mt-2"
                  >
                    Logout
                  </button>
                  <span
                    title={user.name}
                    className="mt-4 bg-blue-700 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg shadow"
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold text-lg"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-semibold text-lg text-gray-700 mt-2"
                  >
                    Login
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}
