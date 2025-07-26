import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection.jsx';
import FloatingElements from '../components/FloatingElements.jsx';
import { 
  LayoutDashboard, 
  Upload, 
  Image, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Filter,
  Search,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  Menu,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posters, setPosters] = useState([
    {
      id: 1,
      title: "Tech Innovation Summit 2025",
      category: "Workshop",
      description: "Join us for an exciting day of tech talks and workshops",
      image: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "2025-03-15",
      views: 1250,
      registrations: 85
    },
    {
      id: 2,
      title: "Annual Cultural Fest",
      category: "Cultural",
      description: "Celebrate diversity with music, dance, and art",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "2025-03-20",
      views: 2100,
      registrations: 320
    },
    {
      id: 3,
      title: "Inter-College Sports Meet",
      category: "Sports",
      description: "Compete in various sports and showcase your talent",
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400",
      date: "2025-03-25",
      views: 850,
      registrations: 150
    }
  ]);

  const [newPoster, setNewPoster] = useState({
    title: '',
    category: 'Workshop',
    description: '',
    image: '',
    date: ''
  });

  const stats = [
    {
      title: "Total Events",
      value: posters.length.toString(),
      icon: Calendar,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Total Views",
      value: posters.reduce((sum, poster) => sum + poster.views, 0).toLocaleString(),
      icon: Eye,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Total Registrations",
      value: posters.reduce((sum, poster) => sum + poster.registrations, 0).toString(),
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Growth Rate",
      value: "+23%",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    }
  ];

  const categories = ['All', 'Fest', 'Workshop', 'Sports', 'Cultural'];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Poster', icon: Upload },
    { id: 'posters', label: 'View Posters', icon: Image },
    { id: 'profile', label: 'Edit Profile', icon: Settings },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Fest': return 'bg-gradient-to-r from-pink-500 to-rose-500';
      case 'Workshop': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Sports': return 'bg-gradient-to-r from-green-500 to-teal-500';
      case 'Cultural': return 'bg-gradient-to-r from-purple-500 to-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredPosters = posters.filter(poster => {
    const matchesSearch = poster.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || poster.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreatePoster = (e) => {
    e.preventDefault();
    const poster = {
      id: posters.length + 1,
      ...newPoster,
      views: 0,
      registrations: 0
    };
    setPosters([...posters, poster]);
    setNewPoster({
      title: '',
      category: 'Workshop',
      description: '',
      image: '',
      date: ''
    });
    setActiveTab('posters');
  };

  const handleDeletePoster = (id) => {
    setPosters(posters.filter(poster => poster.id !== id));
  };

  return (
  <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <FloatingElements />
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
<div className={`fixed inset-y-0 left-0 w-64 bg-black/40 backdrop-blur-md border-r border-white/10 flex flex-col justify-between transition-all duration-500
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}
>
  <div className="p-6">
    {/* Logo */}
    <AnimatedSection animation="fadeInLeft" className="flex items-center space-x-3 mb-8">
      <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-lg">
        <LayoutDashboard className="w-6 h-6 text-white animate-pulse" />
      </div>
      <span className="text-xl font-bold text-white bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
        Admin Panel
      </span>
    </AnimatedSection>

    {/* Navigation */}
    <nav className="space-y-2">
      {sidebarItems.map((item, index) => (
        <AnimatedSection key={item.id} animation="fadeInLeft" delay={index * 100}>
          <button
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-500 hover:scale-105 ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-lg'
            }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'animate-pulse' : ''} />
            <span className="font-medium">{item.label}</span>
          </button>
        </AnimatedSection>
      ))}
    </nav>
  </div>

  {/* Logout Button */}
  <AnimatedSection animation="fadeInLeft" delay={500} className="p-6">
    <Link
      to="/"
      className="flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg"
    >
      <LogOut size={20} />
      <span className="font-medium">Logout</span>
    </Link>
  </AnimatedSection>
</div>


      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 p-4 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-500 hover:scale-110"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h1>
            </div>
            <div className="text-white/70">
              Welcome, Admin
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-3 pt-22">
          {activeTab === 'dashboard' && (
              <div className="space-y-8 mt-6">
              {/* Stats Cards */}
              <AnimatedSection animation="fadeInUp" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <AnimatedSection
                    key={index}
                    animation="scaleIn"
                    delay={index * 100}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} hover:scale-110 hover:rotate-12 transition-all duration-500 shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white animate-pulse" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                      {stat.value}
                    </h3>
                    <p className="text-white/60 text-sm">{stat.title}</p>
                  </AnimatedSection>
                ))}
              </AnimatedSection>

              {/* Recent Events */}
              <AnimatedSection animation="fadeInUp" delay={400} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-500">
                <h2 className="text-xl font-bold text-white mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Recent Events
                </h2>
                <div className="space-y-4">
                  {posters.slice(0, 3).map((poster, index) => (
                    <AnimatedSection 
                      key={poster.id} 
                      animation="fadeInLeft" 
                      delay={index * 100}
                      className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-500 cursor-pointer"
                    >
                      <img
                        src={poster.image}
                        alt={poster.title}
                        className="w-16 h-16 object-cover rounded-lg hover:scale-110 transition-transform duration-500"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{poster.title}</h3>
                        <p className="text-white/60 text-sm">{poster.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{poster.registrations} registered</p>
                        <p className="text-white/60 text-sm">{poster.views} views</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          )}

          {activeTab === 'upload' && (
            <AnimatedSection animation="scaleIn" className="max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-500">
                <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  Create New Event
                </h2>
                <form onSubmit={handleCreatePoster} className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={newPoster.title}
                      onChange={(e) => setNewPoster({...newPoster, title: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500"
                      placeholder="Enter event title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={newPoster.category}
                      onChange={(e) => setNewPoster({...newPoster, category: e.target.value})}
                      className="w-full px-4 py-3 bg-black/5 border border-black/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 transition-all duration-500"
                    >
                      <option value="Fest">Fest</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Sports">Sports</option>
                      <option value="Cultural">Cultural</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={newPoster.date}
                      onChange={(e) => setNewPoster({...newPoster, date: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={newPoster.image}
                      onChange={(e) => setNewPoster({...newPoster, image: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      value={newPoster.description}
                      onChange={(e) => setNewPoster({...newPoster, description: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:scale-105 transition-all duration-500 resize-none"
                      rows={4}
                      placeholder="Describe your event..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
                  >
                    <Plus size={20} className="relative z-10 group-hover:rotate-90 transition-transform duration-500" />
                    <span className="relative z-10">Create Event</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                </form>
              </div>
            </AnimatedSection>
          )}

          {activeTab === 'posters' && (
            <div className="mt-0 lg:mt-0 pt-0 lg:pt-0 lg:-mt-6">
              {/* Search and Filter */}
              <AnimatedSection animation="fadeInUp" className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 transition-all duration-500"
                    placeholder="Search events..."
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-12 pr-8 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 transition-all duration-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </AnimatedSection>

              {/* Posters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosters.map((poster, index) => (
                  <AnimatedSection
                    key={poster.id}
                    animation="scaleIn"
                    delay={index * 100}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={poster.image}
                        alt={poster.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-white text-sm font-medium rounded-full ${getCategoryColor(poster.category)} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {poster.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex space-x-2">
                          <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-110 shadow-lg">
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeletePoster(poster.id)}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 hover:scale-110 shadow-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors duration-300">
                        {poster.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-4 line-clamp-2 group-hover:text-white/80 transition-colors duration-300">
                        {poster.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">{poster.date}</span>
                        <div className="flex items-center space-x-4 text-white/70">
                          <span>{poster.views} views</span>
                          <span>{poster.registrations} registered</span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {filteredPosters.length === 0 && (
                <AnimatedSection animation="fadeInUp" className="text-center py-12">
                  <p className="text-white/60 text-lg">No events found</p>
                </AnimatedSection>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <AnimatedSection animation="scaleIn" className="max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-500">
                <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  Edit Profile
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      College Name
                    </label>
                    <input
                      type="text"
                      defaultValue="MIT College of Engineering"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Admin Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@mit.edu"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:scale-105 transition-all duration-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
                  >
                    <span className="relative z-10">Update Profile</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                </form>
              </div>
            </AnimatedSection>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
