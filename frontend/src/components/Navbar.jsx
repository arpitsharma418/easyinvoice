import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-40 px-4 pt-4 sm:px-8">
      <div className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between rounded-xl border border-black/20 bg-black/2 backdrop-blur-2xl px-4 sm:px-1.5">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 py-2">
          <img
            src="/invoice_logo.png"
            alt="invoice_logo"
            className="h-8 w-8 rounded-xl object-contain"
          />
          <span className="text-xl font-semibold tracking-tight sm:text-xl">
            easyinvoice
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {!user && (
            <a
              href="#features"
              className="text-sm font-medium"
            >
              Features
            </a>
          )}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm px-3 py-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-sm px-3 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-black/90 transition-all"
              >
                Logout
              </button>
              <span
                title={user.name}
                className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Signed as {user.name ? user.name: "User"}
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-black/20 px-4 py-2 text-sm font-semibold hover:bg-black/5 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-black/90 px-4 py-2 text-sm text-white transition-all hover:bg-black/80"
              >
                Start Free
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="h-7 w-7"
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

      <div
        className={`mx-auto mt-2 w-full max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-white backdrop-blur-md transition-all duration-300 md:hidden ${isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 pb-5 pt-4">
          <nav className="flex flex-col gap-3">
            {!user && (
              <a
                href="#features"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2 text-sm font-medium text-black"
              >
                Features
              </a>
            )}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2 text-sm text-black"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="rounded-lg bg-black/90 text-white px-4 py-2 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg border border-black/20 px-4 py-2 text-sm font-semibold hover:bg-black/5 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-black/90 px-4 py-2 text-sm text-white transition-all hover:bg-black/80 text-center"
                >
                  Start Free
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
}
