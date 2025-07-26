import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home.jsx';
import StudentAuth from './pages/StudentAuth.jsx';
import CollegeAuth from './pages/CollegeAuth.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="student-auth" element={<StudentAuth />} />
            <Route path="college-auth" element={<CollegeAuth />} />
          </Route>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
