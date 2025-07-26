import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection.jsx';
import FloatingElements from '../components/FloatingElements.jsx';
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
  Globe
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
      icon: Zap,
      title: "Easy Login",
      description: "Quick and secure authentication for students and colleges"
    },
    {
      icon: Search,
      title: "Event Discovery",
      description: "Find the perfect events tailored to your interests"
    },
    {
      icon: Users,
      title: "College Community",
      description: "Connect with peers and build lasting relationships"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access events from colleges worldwide"
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Enjoy smooth, lag-free event browsing and registration"
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
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <FloatingElements />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp" delay={200}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Amazing{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                College Events
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={400}>
            <p className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Connect with your campus community and never miss out on the events that matter to you.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fadeInUp" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/student-auth"
                className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 relative overflow-hidden"
              >
                <span className="relative z-10">Join Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link
                to="/college-auth"
                className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10">For Colleges</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Events Carousel */}
      <section id="events" className="relative py-20 bg-black/30 backdrop-blur-sm overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              Trending Events
            </h2>
            <p className="text-xl text-white/70">Join thousands of students at these popular events</p>
          </AnimatedSection>

          <AnimatedSection animation="scaleIn" delay={300} className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {eventSlides.map((slideEvents, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                      {slideEvents.map((event) => (
                        <div key={event.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group cursor-pointer">
                          <div className="relative h-32">
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-2 left-2">
                              <span className={`px-2 py-1 bg-gradient-to-r ${getCategoryColor(event.category)} text-white text-xs font-medium rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                {event.category}
                              </span>
                            </div>
                            <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 transform group-hover:scale-110 transition-transform duration-300">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-white text-xs">{event.rating}</span>
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 leading-tight">{event.title}</h3>
                            <div className="space-y-1 mb-3">
                              <div className="flex items-center space-x-1 text-white/70">
                                <Calendar size={12} />
                                <span className="text-xs">{event.date}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-white/70">
                                <Clock size={12} />
                                <span className="text-xs">{event.time}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-white/70">
                                <MapPin size={12} />
                                <span className="text-xs">{event.location}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-white/70">
                                <Users size={12} />
                                <span className="text-xs">{event.attendees} attending</span>
                              </div>
                            </div>
                            <button className="group/btn w-full px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 text-xs relative overflow-hidden">
                              <span className="relative z-10">Join Event</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg transition-all duration-500"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg transition-all duration-500"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slide indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {eventSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Why Students Love Us
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The most trusted platform for discovering and joining college events
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection
                key={index}
                animation="fadeInUp"
                delay={index * 100}
                className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/8 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 transform hover:scale-105 cursor-pointer"
              >
                <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white group-hover:animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-20 bg-black/30 backdrop-blur-sm overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fadeInLeft">
              <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                Built for Students, By Students
              </h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                We understand what students want - easy access to events, seamless registration, 
                and a community that celebrates campus life. Our platform is designed with 
                student needs at the forefront.
              </p>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                From hackathons to cultural fests, sports tournaments to academic workshops - 
                discover events that match your interests and connect with like-minded peers 
                across your campus and beyond.
              </p>
              <Link
                to="/about"
                className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10">Learn More</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </AnimatedSection>
            <AnimatedSection animation="fadeInRight" className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Students collaborating"
                  className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-xl"
                />
                <img
                  src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="College event"
                  className="w-full h-48 object-cover rounded-lg mt-8 hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-xl"
                />
                <img
                  src="https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Campus life"
                  className="w-full h-48 object-cover rounded-lg -mt-8 hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-xl"
                />
                <img
                  src="https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Students studying"
                  className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-500 shadow-lg hover:shadow-xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg pointer-events-none" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="scaleIn" className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Ready to Level Up Your Campus Life?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join the community where every event is an opportunity to grow, learn, and have fun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/student-auth"
                className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 relative overflow-hidden"
              >
                <span className="relative z-10">Start Exploring</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link
                to="/college-auth"
                className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10">List Your Events</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-black/30 backdrop-blur-sm overflow-hidden">
        <FloatingElements />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Have questions or want to get involved? Reach out to us!
          </p>
          <form className="max-w-xl mx-auto space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
