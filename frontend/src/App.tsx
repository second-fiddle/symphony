import { VFC, useEffect, Suspense } from 'react';
import { useLocation } from 'react-router';
import { FullpageCircularProgress } from 'components/ui/notifications';
import { Header } from 'biz/layouts/header';
import { AppRoute } from 'routes/appRoute';

const App: VFC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [hash, pathname]);

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<FullpageCircularProgress />}>
          <AppRoute />
        </Suspense>
      </main>
    </>
  );
};

export default App;
