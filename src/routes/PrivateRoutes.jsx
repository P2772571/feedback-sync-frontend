
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import DashboardLayout from '../layouts/DashboardLayout';
import Profile from '../pages/Profile';
import Goal from '../pages/Goal';
import Feedback from '../pages/Feedback';
import PIP from '../pages/Pip';
import DashboardHome from '../pages/DashboardHome';
import { useSelector } from 'react-redux';

import ManageUsers from '../pages/admin/ManageUsers';

const PrivateRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.roles[0] || undefined;
  return (
    <Routes>
      {/* Protect all routes under /dashboard/* */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Redirect admin from /dashboard to /dashboard/manage-users */}
        {role === 'ADMIN' ? (
          <Route path="*" element={<Navigate to="/dashboard/manage-users" />} />
        ) : (
          <>
            <Route index element={<DashboardHome />} /> {/* /dashboard */}
            <Route path="feedback" element={<Feedback />} />
            <Route path="goals" element={<Goal />} />
            <Route path="pips" element={<PIP />} />
            <Route path="profile" element={<Profile />} />
          </>
        )}

        {/* Admin specific route */}
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="profile" element={<Profile/>} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
