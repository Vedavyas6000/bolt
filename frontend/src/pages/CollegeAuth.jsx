import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Building, Mail, Lock, User, Phone, ArrowLeft, Upload, FileText, X, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection.jsx';
import FloatingElements from '../components/FloatingElements.jsx';

const CollegeAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    collegeName: '',
    adminName: '',
    contactNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    idDocument: null
  });
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFileUpload = (file) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, idDocument: 'Please upload a valid image (JPG, PNG) or PDF file' }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, idDocument: 'File size must be less than 5MB' }));
      return;
    }

    setFormData(prev => ({ ...prev, idDocument: file }));
    setErrors(prev => ({ ...prev, idDocument: '' }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, idDocument: null }));
    setErrors(prev => ({ ...prev, idDocument: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.collegeName.trim()) {
        newErrors.collegeName = 'College name is required';
      }
      if (!formData.adminName.trim()) {
        newErrors.adminName = 'Admin name is required';
      }
      if (!formData.contactNumber.trim()) {
        newErrors.contactNumber = 'Contact number is required';
      } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
        newErrors.contactNumber = 'Contact number must be 10 digits';
      }
      // Removed idDocument validation as per user request
      // if (!formData.idDocument) {
      //   newErrors.idDocument = 'Admin ID document is required for verification';
      // }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
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
      setIsLoading(true);
      try {
        const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';

        let response;
        if (isLogin) {
          const payload = { email: formData.email, password: formData.password, role: 'college' };
          response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
        } else {
          const formDataToSend = new FormData();
          formDataToSend.append('email', formData.email);
          formDataToSend.append('password', formData.password);
          formDataToSend.append('role', 'college');
          formDataToSend.append('college_name', formData.collegeName);
          formDataToSend.append('admin_name', formData.adminName);
          formDataToSend.append('contact_number', formData.contactNumber);
          if (formData.idDocument) {
            formDataToSend.append('idDocument', formData.idDocument);
          }

          response = await fetch(url, {
            method: 'POST',
            body: formDataToSend,
          });
        }

        const data = await response.json();

        if (!response.ok) {
          setApiError(data.message || 'An error occurred');
          setIsLoading(false);
          return;
        }

        if (isLogin) {
          // Save token and redirect
          localStorage.setItem('token', data.token);
          window.location.href = '/admin-dashboard';
        } else {
          // After registration, switch to login mode
          setIsLogin(true);
          setFormData({
            collegeName: '',
            adminName: '',
            contactNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            idDocument: null
          });
          setErrors({});
          alert('Registration successful! Please log in.');
        }
        setIsLoading(false);
      } catch (error) {
        setApiError('Server error. Please try again later.');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      <FloatingElements />
      
      <div className="relative z-10 w-full max-w-lg">
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
        <AnimatedSection animation="scaleIn" delay={200} className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:border-white/20 transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-6 hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-lg">
              <Building className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              {isLogin ? 'College Portal' : 'Partner With Us'}
            </h2>
            <p className="text-white/70">
              {isLogin 
                ? 'Manage your college events' 
                : 'Showcase your events to students'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <input
                      type="text"
                      name="collegeName"
                      placeholder="College Name"
                      value={formData.collegeName}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500 ${
                        errors.collegeName 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-white/20 focus:ring-indigo-400'
                      }`}
                    />
                  </div>
                  {errors.collegeName && (
                    <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.collegeName}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <input
                      type="text"
                      name="adminName"
                      placeholder="Admin Name"
                      value={formData.adminName}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500 ${
                        errors.adminName 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-white/20 focus:ring-indigo-400'
                      }`}
                    />
                  </div>
                  {errors.adminName && (
                    <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.adminName}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <input
                      type="tel"
                      name="contactNumber"
                      placeholder="Contact Number"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500 ${
                        errors.contactNumber 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-white/20 focus:ring-indigo-400'
                      }`}
                    />
                  </div>
                  {errors.contactNumber && (
                    <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.contactNumber}</p>
                  )}
                </div>

                {/* ID Document Upload */}
                <div>
                  <label className="block text-white mb-2">Upload Admin ID Document (JPG, PNG, PDF, max 5MB)</label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                    className={`w-full text-white bg-white/5 backdrop-blur-sm border rounded-xl p-2 cursor-pointer ${
                      errors.idDocument ? 'border-red-400' : 'border-white/20'
                    }`}
                  />
                  {errors.idDocument && (
                    <p className="text-red-400 text-sm mt-1 animate-pulse">{errors.idDocument}</p>
                  )}
                  {formData.idDocument && (
                    <div className="flex items-center justify-between mt-2 text-white/80">
                      <span>{formData.idDocument.name}</span>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-400 hover:text-red-600 transition-colors duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Official Email"
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
            disabled={isLoading}
            className={`group w-full py-4 text-white rounded-xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden ${
              isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-indigo-500/25'
            }`}
          >
            <span className="relative z-10">{isLogin ? 'Access Dashboard' : 'Join Platform'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="text-center mt-8">
            <p className="text-white/70">
              {isLogin ? "New to College Buzz?" : 'Already registered?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ 
                    collegeName: '', 
                    adminName: '',
                    contactNumber: '',  
                    email: '', 
                    password: '', 
                    confirmPassword: '',
                    idDocument: null
                  });
                  setErrors({});
                  setApiError('');
                }}
                className="text-indigo-400 hover:text-indigo-300 ml-2 font-medium transition-all duration-300 hover:scale-105"
              >
                {isLogin ? 'Join Platform' : 'Sign in'}
              </button>
            </p>
          </div>


          {/* Student Auth Link */}
          <div className="text-center mt-6 pt-6 border-t border-white/20">
            <p className="text-white/70 text-sm">
              Are you a student?
            </p>
            <Link
              to="/student-auth"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-all duration-300 hover:scale-105"
            >
              Student Login →
            </Link>
          </div>
        </AnimatedSection>
      </div>

    </div>
  );
};

export default CollegeAuth;
