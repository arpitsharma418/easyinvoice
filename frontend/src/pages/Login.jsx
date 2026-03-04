import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData, {
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

        setFormData({ email: "", password: "" });
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.dir(err);
        setLoading(false);
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          pauseOnHover: true,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card w-full max-w-md p-8 sm:p-10">
        <div className="text-center">
          <span className="chip">Welcome Back</span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Login to easyinvoice
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Please enter your details to continue.
          </p>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-black/10" />
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Login with email
          </span>
          <div className="h-px flex-1 bg-black/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
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
            <div className="flex py-2 px-3 text-sm rounded-xl mt-2 outline-0 border border-black/10">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full outline-0"
              />
              {showPassword ? (
                <div className="cursor-pointer" onClick={handleShowPassword}>Hide</div>
              ) : (
                <div className="cursor-pointer" onClick={handleShowPassword}>Show</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              <span className="font-semibold text-blue-500">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
