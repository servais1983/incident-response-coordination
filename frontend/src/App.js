import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from './components/layouts/MainLayout';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import IncidentListScreen from './screens/IncidentListScreen';
import IncidentDetailScreen from './screens/IncidentDetailScreen';
import IncidentCreateScreen from './screens/IncidentCreateScreen';
import TaskListScreen from './screens/TaskListScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import EvidenceListScreen from './screens/EvidenceListScreen';
import EvidenceDetailScreen from './screens/EvidenceDetailScreen';
import TimelineScreen from './screens/TimelineScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import ReportScreen from './screens/ReportScreen';
import NotFoundScreen from './screens/NotFoundScreen';

// Components
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={<PrivateRoute><DashboardScreen /></PrivateRoute>} />
          
          <Route path="incidents" element={<PrivateRoute><IncidentListScreen /></PrivateRoute>} />
          <Route path="incidents/:id" element={<PrivateRoute><IncidentDetailScreen /></PrivateRoute>} />
          <Route path="incidents/create" element={<PrivateRoute><IncidentCreateScreen /></PrivateRoute>} />
          
          <Route path="tasks" element={<PrivateRoute><TaskListScreen /></PrivateRoute>} />
          <Route path="tasks/:id" element={<PrivateRoute><TaskDetailScreen /></PrivateRoute>} />
          
          <Route path="evidence" element={<PrivateRoute><EvidenceListScreen /></PrivateRoute>} />
          <Route path="evidence/:id" element={<PrivateRoute><EvidenceDetailScreen /></PrivateRoute>} />
          
          <Route path="timeline/:incidentId" element={<PrivateRoute><TimelineScreen /></PrivateRoute>} />
          
          <Route path="profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>} />
          
          <Route path="reports" element={<PrivateRoute><ReportScreen /></PrivateRoute>} />
          
          {/* Admin Routes */}
          <Route path="admin/users" element={<AdminRoute><UserListScreen /></AdminRoute>} />
        </Route>
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </>
  );
};

export default App;