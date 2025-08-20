import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const TodaysBuzz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const buzzUpdates = [
    "🎵 Music Fest 2025 - 2000+ students registered!",
    "🏆 CodeStorm Hackathon - Registration closes in 2 days",
    "🎭 Drama Workshop - Only 15 spots left",
    "⚡ Tech Summit - Live streaming now available",
    "🎨 Cultural Fest - New dance categories added",
    "🏃‍♂️ Sports Championship - Team registrations open"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % buzzUpdates.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [buzzUpdates.length]);

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 text-black py-2 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/90 via-green-400/90 to-blue-400/90 animate-pulse" />
      <div className="relative flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 animate-bounce" />
          <span className="font-bold text-sm">TODAY'S BUZZ</span>
        </div>
        <div className="flex-1 text-center">
          <div className="animate-fade-in-out">
            <span className="font-medium text-sm">
              {buzzUpdates[currentIndex]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysBuzz;