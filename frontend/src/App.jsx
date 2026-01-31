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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen">
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
