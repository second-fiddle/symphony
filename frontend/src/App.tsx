import { VFC, useEffect, Suspense } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FullpageCircularProgress } from 'components/ui/notifications';
import { Header } from 'biz/layouts/header';
import { AppRoute } from 'routes/appRoute';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'pages/500';

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
          onReset={() => navigate(-1)}
        >
          <Suspense fallback={<FullpageCircularProgress />}>
            <AppRoute />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
};

export default App;
