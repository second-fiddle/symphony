import React, { VFC } from 'react';
import { Route, Routes } from 'react-router';
import ProtectedRoutes from 'routes/protectdRoute';
import { DashboardPage } from 'pages/dashboardPage';

const Login = React.lazy(() => import('pages/authentication/login/loginPage'));
const ResetPassword = React.lazy(
  () => import('pages/authentication/resetPassword/reesetPasswordPage'),
);
const ChangePassword = React.lazy(
  () => import('pages/authentication/changePassword/changePasswordPage'),
);
const Signup = React.lazy(
  () => import('pages/authentication/signup/signupPage'),
);
const SignupTos = React.lazy(
  () => import('pages/authentication/signup/signupTosPage'),
);
const SignupIdentify = React.lazy(
  () => import('pages/authentication/signup/signupIdentifyPage'),
);
const SignupProfile = React.lazy(
  () => import('pages/authentication/signup/signupProfilePage'),
);
const SignupProfileConfirm = React.lazy(
  () => import('pages/authentication/signup/signupProfileConfirmPage'),
);
const SignupComplete = React.lazy(
  () => import('pages/authentication/signup/signupCompletePage'),
);
const Verify = React.lazy(() => import('pages/authentication/verify/verify'));

export const AppRoute: VFC = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="reset-password" element={<ResetPassword />} />
    <Route path="change-password" element={<ChangePassword />} />
    <Route path="signup">
      <Route path="tos" element={<SignupTos />} />
      <Route path="identify" element={<SignupIdentify />} />
      <Route path="profile" element={<SignupProfile />} />
      <Route path="confirm" element={<SignupProfileConfirm />} />
      <Route path="complete" element={<SignupComplete />} />
      <Route path="" element={<Signup />} />
    </Route>
    <Route path="verify" element={<Verify />} />
    <Route path="/" element={<ProtectedRoutes />}>
      <Route path="" element={<DashboardPage />} />
    </Route>
  </Routes>
);
