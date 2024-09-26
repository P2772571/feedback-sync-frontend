
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Private Routes (for authenticated users only) */}
        <Route path="dashboard/*" element={<PrivateRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
