import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Bell, User } from 'lucide-react';
import AnimatedSection from '../AnimatedSection.jsx';
import TodaysBuzz from '../TodaysBuzz.jsx';

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
    <>
      <TodaysBuzz />
      <header className="sticky top-0 w-full z-50 backdrop-blur-xl bg-black/90 border-b border-gray-700/50 transition-all duration-500 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <AnimatedSection animation="fadeInLeft">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-3 bg-gradient-to-r from-yellow-400 to-green-400 rounded-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-neon">
                <Zap className="h-7 w-7 text-black group-hover:animate-pulse" />
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:via-green-300 group-hover:to-blue-300 transition-all duration-500 tracking-tight">
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
                className={`relative px-4 py-2 text-sm font-bold transition-all duration-500 hover:scale-105 text-white hover:text-yellow-400 hover:glow-text`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-green-400 transition-all duration-300 hover:w-full" />
              </button>
            ))}
            
            {/* Notification and Profile */}
            <div className="flex items-center space-x-3">
              <button className="p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110">
                <Bell size={20} />
              </button>
              <button className="p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110">
                <User size={20} />
              </button>
            </div>
            
            <Link
              to="/student-auth"
              className="group px-6 py-3 bg-gradient-to-r from-yellow-400 to-green-400 text-black rounded-xl font-bold hover:from-yellow-300 hover:to-green-300 transition-all duration-500 transform hover:scale-105 hover:shadow-neon relative overflow-hidden"
            >
              <span className="relative z-10 font-black">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </AnimatedSection>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-all duration-500 hover:scale-110"
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
        <div className={`md:hidden absolute top-18 left-0 w-full bg-black/95 backdrop-blur-xl border-b border-gray-700/50 transition-all duration-500 ${
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
                  className={`block px-4 py-3 text-sm font-bold transition-all duration-500 hover:scale-105 hover:bg-white/10 rounded-lg text-white hover:text-yellow-400`}
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
                className="group block w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-green-400 text-black rounded-xl font-bold text-center hover:from-yellow-300 hover:to-green-300 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
                style={{ 
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.5s ease 400ms'
                }}
              >
                <span className="relative z-10 font-black">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </nav>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
