import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-green-400/20 to-yellow-400/20 rounded-full blur-3xl animate-float-slow" />
      
      {/* Floating particles */}
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-400/60 rounded-full animate-ping" />
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-green-400/60 rounded-full animate-bounce" />
      <div className="absolute top-2/3 left-2/3 w-4 h-4 bg-blue-400/60 rounded-full animate-pulse" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Animated lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent animate-slide-down" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-green-400/30 to-transparent animate-slide-down-delayed" />
    </div>
  );
};

export default AnimatedBackground;