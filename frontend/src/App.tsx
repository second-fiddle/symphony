import { Suspense, useEffect, VFC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router';
import { Header } from './biz/layout/header';
import { FullpageCircularProgress } from './components/ui/notifications';
import { ErrorFallback } from './pages/500';
import { AppRoute } from './routes/appRoute';

const App: VFC = () => {
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <>
      <Header />
      <main>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => navigate(-1)}>
          <Suspense fallback={<FullpageCircularProgress />}>
            <AppRoute />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
};

export default App;
