import { VFC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import LoginPage from 'pages/login/loginPage';
import { FullpageCircularProgress } from 'components/atoms/notifications/fullPageCircularProgress';
import Header from 'components/pages/layouts/header';
import ProtectedRoutes from 'routes/protectdRoute';
import DashboardPage from 'pages/dashboardPage';
import ChangePasswordPage from 'pages/changePassword/changePasswordPage';
import ResetPasswordPage from 'pages/resetPassword/reesetPasswordPage';
import SignUpPage from 'pages/signup/signUp';

const App: VFC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="" element={<DashboardPage />} />
          </Route>
        </Routes>
      </main>
      <FullpageCircularProgress show={false} />
    </>
  );
};

export default App;
