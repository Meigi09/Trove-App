"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, isLoading, error } = useAuthStore();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formData.email, formData.password, formData.role);

      // Handle successful login based on role
      if (formData.role === "supplier") {
        console.log("Redirecting to supplier dashboard");
      } else if (formData.role === "customer") {
        console.log("Redirecting to customer dashboard");
      } else if (formData.role === "admin") {
        console.log("Redirecting to admin dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <button
            className="flex items-center space-x-3 text-gray-600 hover:text-coral-main transition-colors duration-300"
            onClick={() => {
              window.history.back();
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-light tracking-wide">Return</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-8">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-1 h-8 bg-gradient-to-b from-coral-main to-coral-secondary mx-auto mb-6"></div>
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 border border-gray-300 flex items-center justify-center bg-gradient-to-br from-coral-whisper to-coral-soft">
                <LogIn className="w-6 h-6 text-coral-main" />
              </div>
            </div>
            <h1 className="text-2xl font-extralight mb-3 tracking-tight">
              <span className="block text-gray-700">Welcome</span>
              <span className="block bg-gradient-to-r from-coral-main to-coral-secondary bg-clip-text text-transparent font-light">
                Back
              </span>
            </h1>
            <div className="w-6 h-px bg-gradient-to-r from-coral-main to-coral-secondary mx-auto mt-4"></div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-400">
              <p className="text-red-600 text-sm font-light">{error}</p>
            </div>
          )}

          {/* Account Type Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 border border-gray-200">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "customer" })}
                className={`py-3 px-3 font-light text-xs tracking-wide transition-all duration-300 ${
                  formData.role === "customer"
                    ? "bg-coral-main text-white shadow-sm"
                    : "text-gray-600 hover:text-coral-main hover:bg-coral-whisper"
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "supplier" })}
                className={`py-3 px-3 font-light text-xs tracking-wide transition-all duration-300 ${
                  formData.role === "supplier"
                    ? "bg-coral-main text-white shadow-sm"
                    : "text-gray-600 hover:text-coral-main hover:bg-coral-whisper"
                }`}
              >
                Supplier
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "admin" })}
                className={`py-3 px-3 font-light text-xs tracking-wide transition-all duration-300 ${
                  formData.role === "admin"
                    ? "bg-coral-main text-white shadow-sm"
                    : "text-gray-600 hover:text-coral-main hover:bg-coral-whisper"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-coral-main to-coral-secondary"></div>
              <div className="pl-5">
                <label className="block text-xs font-light text-gray-500 mb-2 tracking-widest uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-6 pr-0 py-3 bg-transparent border-0 border-b transition-all duration-300 text-gray-700 font-light placeholder-gray-400 outline-none ${
                      errors.email
                        ? "border-red-400"
                        : "border-gray-200 focus:border-coral-main"
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 font-light">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-coral-secondary to-coral-main"></div>
              <div className="pl-5">
                <label className="block text-xs font-light text-gray-500 mb-2 tracking-widest uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-6 pr-8 py-3 bg-transparent border-0 border-b transition-all duration-300 text-gray-700 font-light placeholder-gray-400 outline-none ${
                      errors.password
                        ? "border-red-400"
                        : "border-gray-200 focus:border-coral-secondary"
                    }`}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-coral-main transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1 font-light">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between pt-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 border transition-all duration-300 ${
                      formData.rememberMe
                        ? "border-coral-main bg-coral-main"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {formData.rememberMe && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm font-light text-gray-600 tracking-wide">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-light text-gray-500 hover:text-coral-main transition-colors duration-300 tracking-wide"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full py-4 border transition-all duration-500 overflow-hidden ${
                  isLoading
                    ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                    : "border-coral-main hover:bg-coral-main hover:shadow-lg"
                }`}
              >
                <div className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-light tracking-widest text-sm text-gray-500">
                        SIGNING IN
                      </span>
                    </div>
                  ) : (
                    <span className="font-light tracking-widest text-sm text-coral-main group-hover:text-white transition-colors duration-300">
                      ENTER RWANDA TREASURES
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Divider */}
            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-xs font-light text-gray-500 tracking-widest">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                className="group border border-gray-200 py-3 hover:border-coral-light hover:bg-coral-whisper transition-all duration-300"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-light text-gray-600 tracking-wide group-hover:text-coral-main transition-colors duration-300">
                    Google
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="group border border-gray-200 py-3 hover:border-coral-light hover:bg-coral-whisper transition-all duration-300"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-light text-gray-600 tracking-wide group-hover:text-coral-main transition-colors duration-300">
                    Facebook
                  </span>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-gray-100">
              <p className="text-sm font-light text-gray-600 leading-relaxed">
                New to Rwanda Treasures?{" "}
                <button
                  type="button"
                  className="text-coral-main hover:text-coral-secondary font-light transition-colors duration-300 tracking-wide underline"
                  onClick={() => {
                    window.location.href = "/signup";
                  }}
                >
                  Create account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
