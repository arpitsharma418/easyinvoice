import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        toast.error(err.data.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
          pauseOnHover: true,
        });
      });

    setLoading(false);
  };

  return (
    <div>
      <div className="p-8 w-110 mt-28 mx-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center font-bold text-3xl mb-1">
            Create Account
          </h1>
          <p className="text-sm opacity-60 text-center mb-5">
            Join easyinvoice and start managing invoices
          </p>

          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="p-2 text-sm mt-1 rounded outline-0 focus:ring-3 ring-gray-300 transition-all duration-150 border border-black/10"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col mt-2">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="p-2 text-sm mt-1  rounded outline-0 focus:ring-3 ring-gray-300 transition-all duration-150 border border-black/10"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col mt-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="p-2 text-sm mt-1 rounded outline-0 focus:ring-3 ring-gray-300 transition-all duration-150 border border-black/10"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 bg-blue-600 text-white rounded w-full p-2 cursor-pointer hover:bg-blue-700 transition-all duration-150 text-sm"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          {/* Login Link */}
          <p className="mt-5 text-sm text-center">
            Already have an account?
            <Link to="/login" className="ml-1">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
