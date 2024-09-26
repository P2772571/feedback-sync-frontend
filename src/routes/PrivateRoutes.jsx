
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import DashboardLayout from '../layouts/DashboardLayout';
import Profile from '../pages/Profile';
import Goal from '../pages/Goal';
import Feedback from '../pages/Feedback';
import PIP from '../pages/Pip';
import DashboardHome from '../pages/DashboardHome';

const PrivateRoutes = () => {
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
        {/* Nested dashboard routes */}
        <Route index element={<DashboardHome />} />                {/* /dashboard (default to Home) */}
        <Route path="profile" element={<Profile />} />     {/* /dashboard/profile */}
        <Route path="goal" element={<Goal />} />           {/* /dashboard/goal */}
        <Route path="feedback" element={<Feedback />} />   {/* /dashboard/feedback */}
        <Route path="pip" element={<PIP />} />             {/* /dashboard/pip */}
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
