"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { signup, isLoading, error } = useAuthStore();

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

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (formData.username.length > 30) {
      newErrors.username = "Username cannot exceed 30 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers and underscores";
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    try {
      await signup(
        formData.username,
        formData.name,
        formData.email,
        formData.role,
        formData.password
      );

      // Handle successful signup based on role
      if (formData.role === "supplier") {
        // Navigate to supplier dashboard
        console.log("Redirecting to supplier dashboard");
      } else if (formData.role === "customer") {
        // Navigate to customer dashboard
        console.log("Redirecting to customer dashboard");
      } else if (formData.role === "admin") {
        // Navigate to admin dashboard
        console.log("Redirecting to admin dashboard");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <button
            className="flex items-center space-x-3 text-gray-600 hover:text-coral-main transition-colors duration-500"
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
      <div className="pt-20 pb-16 px-8">
        <div className="max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-coral-main to-coral-secondary mx-auto mb-6"></div>
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 border border-gray-300 flex items-center justify-center bg-gradient-to-br from-coral-whisper to-coral-soft">
                <UserPlus className="w-8 h-8 text-coral-main" />
              </div>
            </div>
            <h1 className="text-2xl font-extralight mb-3 tracking-tight">
              <span className="block text-gray-700">Join</span>
              <span className="block bg-gradient-to-r from-coral-main to-coral-secondary bg-clip-text text-transparent font-light">
                Rwanda Treasures
              </span>
            </h1>
            <div className="w-8 h-px bg-gradient-to-r from-coral-main to-coral-secondary mx-auto mt-6"></div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-400">
              <p className="text-red-600 text-sm font-light">{error}</p>
            </div>
          )}

          {/* Account Type Selection */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 border border-gray-200">
              <button
                onClick={() => setFormData({ ...formData, role: "customer" })}
                className={`py-4 px-4 font-light text-xs tracking-wide transition-all duration-500 ${
                  formData.role === "customer"
                    ? "bg-gradient-to-r from-coral-main to-coral-secondary text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => setFormData({ ...formData, role: "supplier" })}
                className={`py-4 px-4 font-light text-xs tracking-wide transition-all duration-500 ${
                  formData.role === "supplier"
                    ? "bg-gradient-to-r from-coral-main to-coral-secondary text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Supplier
              </button>
              <button
                onClick={() => setFormData({ ...formData, role: "admin" })}
                className={`py-4 px-4 font-light text-xs tracking-wide transition-all duration-500 ${
                  formData.role === "admin"
                    ? "bg-gradient-to-r from-coral-main to-coral-secondary text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-coral-main to-coral-secondary"></div>
              <div className="pl-6">
                <label className="block text-xs font-light text-gray-500 mb-2 tracking-widest uppercase">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-0 py-3 bg-transparent border-0 border-b transition-all duration-500 text-gray-700 font-light placeholder-gray-400 outline-none ${
                      errors.username
                        ? "border-red-400"
                        : "border-gray-200 focus:border-coral-main"
                    }`}
                    placeholder="your_username"
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-red-500 mt-1 font-light">
                    {errors.username}
                  </p>
                )}
              </div>
            </div>

            {/* Full Name Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-coral-light to-coral-main"></div>
              <div className="pl-6">
                <label className="block text-xs font-light text-gray-500 mb-2 tracking-widest uppercase">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-0 py-3 bg-transparent border-0 border-b transition-all duration-500 text-gray-700 font-light placeholder-gray-400 outline-none ${
                      errors.name
                        ? "border-red-400"
                        : "border-gray-200 focus:border-coral-light"
                    }`}
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 font-light">
                    {errors.name}
                  </p>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-coral-secondary to-coral-light"></div>
              <div className="pl-6">
                <label className="block text-xs font-light text-gray-500 mb-2 tracking-widest uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-0 py-3 bg-transparent border-0 border-b transition-all duration-500 text-gray-700 font-light placeholder-gray-400 outline-none ${
                      errors.email
                        ? "border-red-400"
                        : "border-gray-200 focus:border-coral-secondary"
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
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-coral-main to-coral-secondary"></div>
              <div className="pl-6">
                <label className="block text-xs font-light text-gray-500 mb-2 tracking-widest uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-8 py-3 bg-transparent border-0 border-b transition-all duration-500 text-gray-700 font-light placeholder-gray-400 outline-none ${
                      errors.password
                        ? "border-red-400"
                        : "border-gray-200 focus:border-coral-main"
                    }`}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
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

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-coral-secondary to-coral-main"></div>
              <div className="pl-6">
                <label className="block text-xs font-light text-gray-500 mb-2 tracking-widest uppercase">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-8 pr-8 py-3 bg-transparent border-0 border-b transition-all duration-500 text-gray-700 font-light placeholder-gray-400 outline-none ${
                      errors.confirmPassword
                        ? "border-red-400"
                        : "border-gray-200 focus:border-coral-secondary"
                    }`}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 font-light">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-4 pt-4">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border transition-all duration-300 cursor-pointer ${
                    formData.agreeToTerms
                      ? "border-coral-main bg-coral-main"
                      : "border-gray-300 bg-white"
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      agreeToTerms: !formData.agreeToTerms,
                    })
                  }
                >
                  {formData.agreeToTerms && (
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
              <label className="text-sm font-light text-gray-600 leading-relaxed cursor-pointer">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-coral-main hover:text-coral-secondary font-light transition-colors duration-500 tracking-wide underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-coral-main hover:text-coral-secondary font-light transition-colors duration-500 tracking-wide underline"
                >
                  Privacy Policy
                </button>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-xs text-red-500 font-light">
                {errors.agreeToTerms}
              </p>
            )}

            {/* Create Account Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full py-6 border transition-all duration-700 overflow-hidden ${
                  isLoading
                    ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                    : "border-coral-main hover:bg-gradient-to-r hover:from-coral-main hover:to-coral-secondary"
                }`}
              >
                <div className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-light tracking-widest text-sm text-gray-500">
                        CREATING ACCOUNT
                      </span>
                    </div>
                  ) : (
                    <span className="font-light tracking-widest text-sm text-coral-main group-hover:text-white transition-colors duration-500">
                      JOIN RWANDA TREASURES
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
                <span className="px-6 bg-white text-xs font-light text-gray-500 tracking-widest">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            {/* Social Signup */}
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                className="group border border-gray-200 py-4 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white transition-all duration-500"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                  <span className="text-sm font-light text-gray-600 tracking-wide">
                    Google
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="group border border-gray-200 py-4 hover:bg-gradient-to-br hover:from-gray-50 hover:to-white transition-all duration-500"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-light text-gray-600 tracking-wide">
                    Facebook
                  </span>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 border-t border-gray-100">
              <p className="text-sm font-light text-gray-600 leading-relaxed">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-coral-main hover:text-coral-secondary font-light transition-colors duration-500 tracking-wide"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
