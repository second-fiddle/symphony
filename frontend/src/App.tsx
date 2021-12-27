import { VFC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import LoginPage from 'pages/login/loginPage';
import DashboardPage from 'pages/dashboardPage';
import { FullpageCircularProgress } from 'components/atoms/progress/fullPageCircularProgress';
import RequireAuth from 'providers/requireAuth';
import Header from 'components/organisms/layouts/header';

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
          <Route
            path="/"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
      <FullpageCircularProgress show={false} />
    </>
  );
};

export default App;
