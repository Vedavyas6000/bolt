import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, GraduationCap, ArrowLeft } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection.jsx';
import FloatingElements from '../components/FloatingElements.jsx';

const StudentAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
        const payload = isLogin
          ? { email: formData.email, password: formData.password, role: 'student' }
          : { email: formData.email, password: formData.password, role: 'student' };

        if (!isLogin) {
          payload.name = formData.name;
        }

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          setApiError(data.message || 'An error occurred');
          return;
        }

        if (isLogin) {
          // Save token and redirect
          localStorage.setItem('token', data.token);
          window.location.href = '/student-dashboard';
        } else {
          // After registration, switch to login mode
          setIsLogin(true);
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          setErrors({});
          alert('Registration successful! Please log in.');
        }
      } catch (error) {
        setApiError('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80" />
      <FloatingElements />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <AnimatedSection animation="fadeInLeft">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-8 transition-all duration-500 hover:scale-105"
          >
            <ArrowLeft size={20} className="hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Home</span>
          </Link>
        </AnimatedSection>

        {/* Auth Card */}
        <AnimatedSection animation="scaleIn" delay={200} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl hover:shadow-3xl hover:border-white/20 transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4 hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-lg">
              <GraduationCap className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back!' : 'Join the Community'}
            </h2>
            <p className="text-white/70">
              {isLogin
                ? 'Continue your event journey'
                : 'Start discovering amazing events'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500 ${
                      errors.name
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-white/20 focus:ring-indigo-400'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500 ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-white/20 focus:ring-indigo-400'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500 ${
                    errors.password
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-white/20 focus:ring-indigo-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500 ${
                      errors.confirmPassword
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-white/20 focus:ring-indigo-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {apiError && (
              <p className="text-red-400 text-center text-sm mt-2 animate-pulse">{apiError}</p>
            )}

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-indigo-400 hover:text-indigo-300 text-sm transition-all duration-300 hover:scale-105"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="group w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 relative overflow-hidden"
            >
              <span className="relative z-10">{isLogin ? 'Sign In' : 'Create Account'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="text-center mt-8">
            <p className="text-white/70">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                  setErrors({});
                  setApiError('');
                }}
                className="text-indigo-400 hover:text-indigo-300 ml-2 font-medium transition-all duration-300 hover:scale-105"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* College Auth Link */}
          <div className="text-center mt-6 pt-6 border-t border-white/20">
            <p className="text-white/70 text-sm">
              Are you a college administrator?
            </p>
            <Link
              to="/college-auth"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-all duration-300 hover:scale-105"
            >
              College Login →
            </Link>
          </div>
        </AnimatedSection>
      </div>

    </div>
  );
};

export default StudentAuth;
