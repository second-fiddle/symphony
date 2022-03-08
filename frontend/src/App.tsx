import { VFC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import LoginPage from 'pages/authentication/login/loginPage';
import { FullpageCircularProgress } from 'components/ui/notifications';
import Header from 'biz/layouts/header';
import ProtectedRoutes from 'routes/protectdRoute';
import DashboardPage from 'pages/dashboardPage';
import ChangePasswordPage from 'pages/authentication/changePassword/changePasswordPage';
import ResetPasswordPage from 'pages/authentication/resetPassword/reesetPasswordPage';
import VerifyPage from 'pages/authentication/verify/verify';
import { httpClient } from 'services/https';
import {
  SignupIdentifyPage,
  SignupProfileConfirmPage,
  SignupProfilePage,
  SignupTosPage,
  SignupCompletePage,
} from 'pages/authentication/signup';

const App: VFC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const refreshCookie = async () =>
      await httpClient.get('/sanctum/csrf-cookie'); // eslint-disable-line
    refreshCookie().catch((err) => console.log(err));

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
          <Route path="signup">
            <Route path="tos" element={<SignupTosPage />} />
            <Route path="identify" element={<SignupIdentifyPage />} />
            <Route path="profile" element={<SignupProfilePage />} />
            <Route path="confirm" element={<SignupProfileConfirmPage />} />
            <Route path="complete" element={<SignupCompletePage />} />
          </Route>
          <Route path="verify" element={<VerifyPage />} />
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
