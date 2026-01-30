import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployerDashboard from './pages/EmployerDashboard';
import EmployerProfile from './pages/EmployerProfile';
import PublicProfile from './pages/PublicProfile';
import SeekerDashboard from './pages/SeekerDashboard';
import JobFeed from './pages/JobFeed';
import JobApplications from './pages/JobApplications';
import EditProfile from './pages/EditProfile';
import JobApply from './pages/JobApply';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobFeed />} />
          <Route path="/profile/:id" element={<PublicProfile />} />

          {/* Employer Routes */}
          <Route element={<PrivateRoute allowedRoles={['employer']} />}>
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/profile" element={<EmployerProfile />} />
            <Route path="/employer/job/:jobId/applications" element={<JobApplications />} />
          </Route>

          {/* Seeker Routes */}
          <Route element={<PrivateRoute allowedRoles={['seeker']} />}>
            <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
            <Route path="/seeker/profile/edit" element={<EditProfile />} />
            <Route path="/apply/:jobId" element={<JobApply />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
