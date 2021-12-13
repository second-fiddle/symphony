import { VFC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import AuthLayout from 'components/templates/layouts/authLayout';
import LoginPage from 'pages/login/loginPage';
import { Dimmer, Loader } from 'semantic-ui-react';
import AuthProvider from 'providers/authProvider';
import RequireAuth from 'providers/requireAuth';
import DashboardPage from 'pages/dashboardPage';

const App: VFC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <AuthProvider>
      <div className="container">
        <Dimmer active={false}>
          <Loader size="huge">Loading</Loader>
        </Dimmer>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route path="" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
