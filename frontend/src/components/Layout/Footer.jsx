import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent">College Buzz</h3>
            <p className="text-gray-400 mb-8 max-w-md text-lg font-medium">
              The ultimate platform connecting students across India with the most epic college events, 
              workshops, and experiences. Don't just attend - own your campus life!
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-yellow-400 transition-all duration-300 hover:scale-125">
                <Facebook className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-400 transition-all duration-300 hover:scale-125">
                <Twitter className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-all duration-300 hover:scale-125">
                <Instagram className="h-7 w-7" />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-400 transition-all duration-300 hover:scale-125">
                <Linkedin className="h-7 w-7" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-yellow-400">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 font-medium">🏠 Home</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 font-medium">🎉 Events</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 font-medium">💫 About Us</a></li>
              <li><a href="/student-auth" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 font-medium">🚀 Get Started</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-green-400">Let's Connect</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300 font-medium">hello@collegebuzz.com</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300 font-medium">+91 9987602631</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <MapPin className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300 font-medium">Mumbai, India 🇮🇳</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 font-medium">
            © 2025 College Buzz. All rights reserved. Made with ❤️ for students across India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
