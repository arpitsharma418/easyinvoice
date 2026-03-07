import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-16 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-lg border border-black/10 bg-black/2 p-6 shadow-lg shadow-slate-200/70 backdrop-blur-md sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-black text-slate-900">easyinvoice</p>
            <p className="mt-1 text-sm text-black">
              Fast, clean invoicing for freelancers and teams.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            <a href="#features" className="text-black transition hover:text-black/80">
              Features
            </a>
            <Link to="/login" className="text-black transition hover:text-black/80">
              Login
            </Link>
            <Link to="/register" className="text-black transition hover:text-black/80">
              Start Free
            </Link>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
          Copyright {new Date().getFullYear()} easyinvoice. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
