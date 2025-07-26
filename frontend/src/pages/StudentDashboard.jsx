import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection.jsx';
import FloatingElements from '../components/FloatingElements.jsx';
import { 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Star, 
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  User,
  Bell,
  Heart,
  Share2,
  Bookmark
} from 'lucide-react';

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const eventsPerPage = 16; // 4x4 grid

  // Sample events data
  const allEvents = [
    {
      id: 1,
      title: "Tech Innovation Summit 2025",
      category: "Workshop",
      date: "March 15, 2025",
      time: "10:00 AM",
      location: "MIT Auditorium",
      image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      attendees: 500,
      description: "Join us for cutting-edge tech discussions and workshops",
      isLive: true,
      isBookmarked: false,
      college: "MIT"
    },
    {
      id: 2,
      title: "Annual Cultural Fest",
      category: "Cultural",
      date: "March 20, 2025",
      time: "6:00 PM",
      location: "Main Campus",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      attendees: 1200,
      description: "Celebrate diversity with music, dance, and art",
      isLive: false,
      isBookmarked: true,
      college: "Stanford"
    },
    {
      id: 3,
      title: "Sports Championship",
      category: "Sports",
      date: "March 25, 2025",
      time: "9:00 AM",
      location: "Sports Complex",
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.7,
      attendees: 800,
      description: "Inter-college sports competition",
      isLive: true,
      isBookmarked: false,
      college: "Harvard"
    },
    {
      id: 4,
      title: "CodeStorm Hackathon 2025",
      category: "Hackathon",
      date: "March 30, 2025",
      time: "8:00 AM",
      location: "Computer Lab",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      attendees: 300,
      description: "48-hour coding marathon with amazing prizes",
      isLive: false,
      isBookmarked: true,
      college: "MIT"
    },
    {
      id: 5,
      title: "Dance Battle Royale",
      category: "Dance",
      date: "April 5, 2025",
      time: "7:00 PM",
      location: "Main Auditorium",
      image: "https://images.pexels.com/photos/1701194/pexels-photo-1701194.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      attendees: 600,
      description: "Ultimate dance competition",
      isLive: false,
      isBookmarked: false,
      college: "UCLA"
    },
    {
      id: 6,
      title: "Drama & Acting Workshop",
      category: "Acting",
      date: "April 10, 2025",
      time: "2:00 PM",
      location: "Theater Hall",
      image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.6,
      attendees: 150,
      description: "Learn from professional actors",
      isLive: false,
      isBookmarked: false,
      college: "NYU"
    },
    {
      id: 7,
      title: "Music Fest 2025",
      category: "Music",
      date: "April 15, 2025",
      time: "6:00 PM",
      location: "Open Ground",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      attendees: 2000,
      description: "Live performances by top artists",
      isLive: true,
      isBookmarked: true,
      college: "Berkeley"
    },
    {
      id: 8,
      title: "Parliamentary Debate Championship",
      category: "Debate",
      date: "April 20, 2025",
      time: "10:00 AM",
      location: "Conference Hall",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.7,
      attendees: 200,
      description: "Intellectual discourse and debate",
      isLive: false,
      isBookmarked: false,
      college: "Oxford"
    },
    // Add more events to demonstrate pagination
    ...Array.from({ length: 24 }, (_, i) => ({
      id: i + 9,
      title: `Event ${i + 9}`,
      category: ['Workshop', 'Cultural', 'Sports', 'Hackathon', 'Dance', 'Music'][i % 6],
      date: `April ${20 + (i % 10)}, 2025`,
      time: `${10 + (i % 8)}:00 AM`,
      location: `Venue ${i + 1}`,
      image: `https://images.pexels.com/photos/${2747449 + i}/pexels-photo-${2747449 + i}.jpeg?auto=compress&cs=tinysrgb&w=800`,
      rating: 4.5 + (i % 5) * 0.1,
      attendees: 100 + i * 50,
      description: `Description for event ${i + 9}`,
      isLive: i % 4 === 0,
      isBookmarked: i % 7 === 0,
      college: ['MIT', 'Stanford', 'Harvard', 'UCLA', 'NYU', 'Berkeley'][i % 6]
    }))
  ];

  const categories = ['All', 'Workshop', 'Cultural', 'Sports', 'Hackathon', 'Dance', 'Acting', 'Music', 'Debate'];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Workshop': return 'from-blue-500 to-cyan-500';
      case 'Cultural': return 'from-purple-500 to-pink-500';
      case 'Sports': return 'from-green-500 to-teal-500';
      case 'Hackathon': return 'from-orange-500 to-red-500';
      case 'Dance': return 'from-pink-500 to-rose-500';
      case 'Acting': return 'from-indigo-500 to-purple-500';
      case 'Music': return 'from-yellow-500 to-orange-500';
      case 'Debate': return 'from-gray-600 to-gray-800';
      default: return 'from-cyan-500 to-purple-500';
    }
  };

  // Filter events based on search and category
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  const toggleBookmark = (eventId) => {
    setBookmarkedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <FloatingElements />
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <AnimatedSection animation="fadeInLeft">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  <Zap className="h-6 w-6 text-white group-hover:animate-pulse" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  College Buzz
                </span>
              </Link>
            </AnimatedSection>

            <AnimatedSection animation="fadeInRight" className="flex items-center space-x-4">
              <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110">
                <Bell size={20} />
              </button>
              <button className="p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110">
                <User size={20} />
              </button>
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </Link>
            </AnimatedSection>
          </div>
      </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <AnimatedSection animation="fadeInUp" className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-white/70">Find events that match your interests and connect with your community</p>
        </AnimatedSection>

        {/* Search and Filter Section */}
        <AnimatedSection animation="fadeInUp" delay={200} className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 transition-all duration-500"
                placeholder="Search events, colleges, or keywords..."
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 transition-all duration-500"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="text-white/70">
              {filteredEvents.length} events found
            </div>
          </div>
        </AnimatedSection>

        {/* Events Grid */}
        <AnimatedSection animation="fadeInUp" delay={400} className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentEvents.map((event, index) => (
              <AnimatedSection
                key={event.id}
                animation="scaleIn"
                delay={index * 50}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group cursor-pointer"
              >
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Live Badge */}
                  {event.isLive && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full animate-pulse">
                        🔴 LIVE
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 bg-gradient-to-r ${getCategoryColor(event.category)} text-white text-xs font-medium rounded-full shadow-lg`}>
                      {event.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(event.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                          bookmarkedEvents.includes(event.id) || event.isBookmarked
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart size={16} className={bookmarkedEvents.includes(event.id) || event.isBookmarked ? 'fill-current' : ''} />
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs">{event.rating}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-200 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center space-x-2 text-white/70">
                      <Calendar size={12} />
                      <span className="text-xs">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <Clock size={12} />
                      <span className="text-xs">{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <MapPin size={12} />
                      <span className="text-xs">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <Users size={12} />
                      <span className="text-xs">{event.attendees} attending</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-indigo-400 text-sm font-medium">{event.college}</span>
                    <button className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105">
                      Join
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* No Results */}
          {currentEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No events found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          )}
        </AnimatedSection>

        {/* Pagination */}
        {totalPages > 1 && (
          <AnimatedSection animation="fadeInUp" delay={600} className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 hover:scale-110 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {totalPages > 5 && (
                <>
                  <span className="text-white/60 px-2">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 hover:scale-110 ${
                      totalPages === currentPage
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </AnimatedSection>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
