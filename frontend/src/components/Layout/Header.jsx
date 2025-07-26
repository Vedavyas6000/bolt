import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import AnimatedSection from '../AnimatedSection.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'about', label: 'About Us' },
  ];

  const isActive = (id) => {
    if (id === 'home') {
      return location.pathname === '/';
    }
    // For scroll links, active state can be handled differently if needed
    return false;
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10 transition-all duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <AnimatedSection animation="fadeInLeft">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Zap className="h-6 w-6 text-white group-hover:animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-500">
                College Buzz
              </span>
            </Link>
          </AnimatedSection>

          {/* Desktop Navigation */}
          <AnimatedSection animation="fadeInRight" className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === 'home') {
                    window.location.href = '/';
                  } else {
                    scrollToSection(link.id);
                  }
                }}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-500 hover:scale-105 text-white hover:text-indigo-400`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/student-auth"
              className="group px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 hover:shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </AnimatedSection>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-indigo-400 hover:bg-white/10 rounded-lg transition-all duration-500 hover:scale-110"
          >
            <div className="relative w-6 h-6">
              <Menu 
                size={24} 
                className={`absolute inset-0 transition-all duration-500 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} 
              />
              <X 
                size={24} 
                className={`absolute inset-0 transition-all duration-500 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/20 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
            <nav className="px-4 py-4 space-y-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'home') {
                      window.location.href = '/';
                    } else {
                      scrollToSection(link.id);
                    }
                  }}
                  className={`block px-3 py-2 text-sm font-medium transition-all duration-500 hover:scale-105 hover:bg-white/10 rounded-lg text-white hover:text-indigo-400`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s ease ${index * 100}ms`
                  }}
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/student-auth"
                onClick={() => setIsMenuOpen(false)}
                className="group block w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium text-center hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
                style={{ 
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.5s ease 400ms'
                }}
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
