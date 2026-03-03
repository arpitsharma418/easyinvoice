import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          pauseOnHover: true,
        });

        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          pauseOnHover: true,
        });
      });

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card w-full max-w-md p-8 sm:p-10">
        <div className="text-center">
          <span className="chip">
            New Here?
          </span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Start creating invoices in minutes.
          </p>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/10" />
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Register with email
          </span>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="text-xs font-semibold text-slate-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full py-2 px-3 text-sm rounded-xl mt-2 outline-0 border border-black/10"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-xs font-semibold text-slate-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full py-2 px-3 text-sm rounded-xl mt-2 outline-0 border border-black/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-xs font-semibold text-slate-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full py-2 px-3 text-sm rounded-xl mt-2 outline-0 border-1 border-black/10"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-all cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span className="font-semibold text-blue-500">
                Log in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}