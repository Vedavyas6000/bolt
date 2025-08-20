import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Heart, Share2 } from 'lucide-react';

const EventCard3D = ({ event, index, onJoin, onBookmark, onShare }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Workshop': return 'from-blue-400 to-cyan-400';
      case 'Cultural': return 'from-purple-400 to-pink-400';
      case 'Sports': return 'from-green-400 to-teal-400';
      case 'Hackathon': return 'from-yellow-400 to-orange-400';
      case 'Dance': return 'from-pink-400 to-rose-400';
      case 'Acting': return 'from-indigo-400 to-purple-400';
      case 'Music': return 'from-yellow-400 to-orange-400';
      case 'Debate': return 'from-gray-400 to-gray-600';
      default: return 'from-cyan-400 to-purple-400';
    }
  };

  return (
    <div
      className={`group relative transform transition-all duration-700 hover:scale-105 ${
        isHovered ? 'z-20' : 'z-10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 100}ms`,
        transform: isHovered ? 'translateY(-20px) rotateX(5deg) rotateY(5deg)' : 'translateY(0) rotateX(0) rotateY(0)',
      }}
    >
      {/* 3D Card Container */}
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-neon transition-all duration-700">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Live badge */}
          {event.isLive && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              <span>LIVE</span>
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(event.category)} text-black text-xs font-bold rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
              {event.category}
            </span>
          </div>
          
          {/* Action buttons */}
          <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark?.(event.id);
              }}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-red-500 hover:scale-110 transition-all duration-300"
            >
              <Heart size={16} className={event.isBookmarked ? 'fill-current text-red-500' : ''} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare?.(event);
              }}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-blue-500 hover:scale-110 transition-all duration-300"
            >
              <Share2 size={16} />
            </button>
          </div>
          
          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">{event.rating}</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
            {event.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {event.description}
          </p>
          
          {/* Event details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <Calendar size={14} className="text-yellow-400" />
              <span className="text-sm">{event.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <Clock size={14} className="text-green-400" />
              <span className="text-sm">{event.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <MapPin size={14} className="text-blue-400" />
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <Users size={14} className="text-purple-400" />
              <span className="text-sm">{event.attendees} attending</span>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 text-sm font-semibold">{event.college}</span>
            <button
              onClick={() => onJoin?.(event)}
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-green-400 text-black font-bold rounded-lg hover:from-yellow-300 hover:to-green-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-neon-sm"
            >
              Join Event
            </button>
          </div>
        </div>
        
        {/* Hover glow border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-yellow-400/50 transition-all duration-700 pointer-events-none" />
      </div>
    </div>
  );
};

export default EventCard3D;