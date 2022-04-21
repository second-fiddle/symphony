import { Button, Link } from '@/components/ui/inputs';
import { VFC } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFoundPage: VFC = () => (
  <div data-name="component">
    <section className="vh-100 mt5">
      <header className="tc pv4 lh-copy">
        <h1 className="f1 f-headline-l code mb4 fw9 dib tracked-tight">404</h1>
        <h2 className="tc f1-l fw1">該当ページがありません</h2>
      </header>
      <p className="w4 m0a">
        <Link to="/">
          <Button startIcon={<ArrowBackIcon fontSize="small" />}>
            前に戻る
          </Button>
        </Link>
      </p>
    </section>
  </div>
);

export default NotFoundPage;
