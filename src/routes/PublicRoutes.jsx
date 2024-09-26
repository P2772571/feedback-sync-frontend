
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import Signup from '../pages/authentication/Register';
import ForgotPassword from '../pages/authentication/ForgotPassword';
import PasswordReset from '../pages/authentication/PasswordReset';
const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/reset-password' element={<PasswordReset />} />
    </Routes>
  );
};

export default PublicRoutes;
