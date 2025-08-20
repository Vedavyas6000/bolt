import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection.jsx';
import AnimatedBackground from '../components/AnimatedBackground.jsx';
import EventCard3D from '../components/EventCard3D.jsx';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Users, 
  Search, 
  Star, 
  MapPin,
  Clock,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Sparkles,
  Target,
  Rocket
} from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2025",
      category: "Workshop",
      date: "March 15, 2025",
      time: "10:00 AM",
      location: "MIT Auditorium",
      image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      attendees: 500
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
      attendees: 1200
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
      attendees: 800
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
      attendees: 300
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
      attendees: 600
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
      attendees: 150
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
      attendees: 2000
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
      attendees: 200
    },
    {
      id: 9,
      title: "AI & Machine Learning Summit",
      category: "Workshop",
      date: "April 25, 2025",
      time: "9:00 AM",
      location: "Tech Center",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      attendees: 400
    },
    {
      id: 10,
      title: "Street Dance Competition",
      category: "Dance",
      date: "May 1, 2025",
      time: "5:00 PM",
      location: "Campus Plaza",
      image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.7,
      attendees: 800
    },
    {
      id: 11,
      title: "Startup Pitch Competition",
      category: "Hackathon",
      date: "May 5, 2025",
      time: "11:00 AM",
      location: "Innovation Hub",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      attendees: 250
    },
    {
      id: 12,
      title: "Classical Music Evening",
      category: "Music",
      date: "May 10, 2025",
      time: "7:30 PM",
      location: "Concert Hall",
      image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.6,
      attendees: 300
    }
  ];

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

  // Group events into slides of 4
  const eventsPerSlide = 4;
  const totalSlides = Math.ceil(events.length / eventsPerSlide);
  const eventSlides = Array.from({ length: totalSlides }, (_, index) =>
    events.slice(index * eventsPerSlide, (index + 1) * eventsPerSlide)
  );

  const features = [
    {
      icon: Rocket,
      title: "Instant Discovery",
      description: "Find events that match your vibe in seconds with smart recommendations"
    },
    {
      icon: Sparkles,
      title: "Live Updates",
      description: "Real-time notifications so you never miss the hottest events on campus"
    },
    {
      icon: Users,
      title: "Campus Network",
      description: "Connect with students across colleges and expand your social circle"
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered event suggestions based on your interests and activity"
    },
    {
      icon: Zap,
      title: "One-Click Join",
      description: "Register for events instantly without the hassle of multiple forms"
    },
    {
      icon: Star,
      title: "Exclusive Access",
      description: "Get early access to limited events and VIP experiences"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/40 to-black/80" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp" delay={200}>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
              Don't miss a{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                moment
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={400}>
            <p className="text-2xl sm:text-3xl text-gray-300 mb-4 max-w-4xl mx-auto font-bold">
              Your campus, your buzz.
            </p>
            <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Discover, join, and create unforgettable experiences with the most vibrant college community platform.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/student-auth"
                className="group px-10 py-5 bg-gradient-to-r from-yellow-400 to-green-400 text-black rounded-2xl font-black text-xl hover:from-yellow-300 hover:to-green-300 transition-all duration-500 transform hover:scale-105 hover:shadow-neon relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Rocket className="w-6 h-6" />
                  <span>Start Exploring</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link
                to="/college-auth"
                className="group px-10 py-5 bg-gray-900/80 backdrop-blur-sm border-2 border-gray-700 text-white rounded-2xl font-bold text-xl hover:bg-gray-800/80 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span>List Events</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Events Carousel */}
      <section id="events" className="relative py-20 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <h2 className="text-5xl font-black text-white mb-6 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
              🔥 Trending Events
            </h2>
            <p className="text-xl text-gray-300 font-semibold">Join thousands of students at these epic events</p>
          </AnimatedSection>

          <AnimatedSection animation="scaleIn" delay={300} className="relative max-w-8xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {eventSlides.map((slideEvents, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                      {slideEvents.map((event) => (
                        <EventCard3D
                          key={event.id}
                          event={event}
                          index={slideIndex * 4 + slideEvents.indexOf(event)}
                          onJoin={(event) => console.log('Join event:', event)}
                          onBookmark={(id) => console.log('Bookmark event:', id)}
                          onShare={(event) => console.log('Share event:', event)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full text-white hover:bg-gray-800 hover:scale-110 hover:shadow-neon transition-all duration-500"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-full text-white hover:bg-gray-800 hover:scale-110 hover:shadow-neon transition-all duration-500"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slide indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {eventSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-500 hover:scale-125 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-yellow-400 to-green-400 shadow-neon' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-black overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
              ⚡ Why Students Are Obsessed
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-semibold">
              The ultimate platform that's changing how students discover and experience campus life
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <AnimatedSection
                key={index}
                animation="fadeInUp"
                delay={index * 100}
                className="group p-8 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl hover:bg-gray-800/60 hover:border-yellow-400/30 hover:shadow-neon transition-all duration-500 transform hover:scale-105 cursor-pointer"
              >
                <div className="p-5 bg-gradient-to-r from-yellow-400 to-green-400 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <feature.icon className="w-10 h-10 text-black group-hover:animate-bounce" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 font-medium">
                  {feature.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-20 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fadeInLeft">
              <h2 className="text-5xl font-black text-white mb-8 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
                Built by Students, For Students
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-semibold">
                We get it. You want to find cool events, connect with awesome people, and make the most 
                of your college experience without the hassle.
              </p>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                That's why we created College Buzz - the platform that actually understands student life. 
                No boring interfaces, no complicated processes. Just pure, instant access to the events 
                that matter to you.
              </p>
              <Link
                to="/student-auth"
                className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-green-400 text-black rounded-xl font-bold hover:from-yellow-300 hover:to-green-300 transition-all duration-500 transform hover:scale-105 hover:shadow-neon relative overflow-hidden"
              >
                <span className="relative z-10 text-lg">Join the Movement</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </AnimatedSection>
            <AnimatedSection animation="fadeInRight" className="relative">
              <div className="grid grid-cols-2 gap-6">
                <img
                  src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Students collaborating"
                  className="w-full h-56 object-cover rounded-2xl hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-neon"
                />
                <img
                  src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="College event"
                  className="w-full h-56 object-cover rounded-2xl mt-8 hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-neon"
                />
                <img
                  src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Campus life"
                  className="w-full h-56 object-cover rounded-2xl -mt-8 hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-neon"
                />
                <img
                  src="https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Students studying"
                  className="w-full h-56 object-cover rounded-2xl hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-neon"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-green-400/10 rounded-2xl pointer-events-none" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-black overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="scaleIn" className="max-w-3xl mx-auto">
            <h2 className="text-6xl font-black text-white mb-8 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Own Your Campus?
            </h2>
            <p className="text-2xl text-gray-300 mb-12 font-bold">
              Stop scrolling. Start living. Your next adventure is one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/student-auth"
                className="group px-12 py-6 bg-gradient-to-r from-yellow-400 to-green-400 text-black rounded-2xl font-black text-2xl hover:from-yellow-300 hover:to-green-300 transition-all duration-500 transform hover:scale-105 hover:shadow-neon relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Rocket className="w-8 h-8" />
                  <span>Let's Go!</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link
                to="/college-auth"
                className="group px-12 py-6 bg-gray-900/80 backdrop-blur-sm border-2 border-gray-700 text-white rounded-2xl font-bold text-2xl hover:bg-gray-800/80 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Sparkles className="w-8 h-8" />
                  <span>Host Events</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-8 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
            💬 Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-semibold">
            Got ideas? Questions? Just want to say hi? We're all ears!
          </p>
          <form className="max-w-2xl mx-auto space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-6 py-4 rounded-xl bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-6 py-4 rounded-xl bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-6 py-4 rounded-xl bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 resize-none"
            />
            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-yellow-400 to-green-400 text-black rounded-xl font-black text-lg hover:from-yellow-300 hover:to-green-300 transition-all duration-500 transform hover:scale-105 hover:shadow-neon"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
