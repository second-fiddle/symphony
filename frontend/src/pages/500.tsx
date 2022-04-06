import { VFC } from 'react';
import { Button } from 'components/ui/inputs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { convertLfToBr } from 'services/utils/StringUtil';

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

export const ErrorFallback: VFC<Props> = (props) => {
  const { error, resetErrorBoundary } = props;

  return (
    <div data-name="component">
      <section className="vh-100 mt5">
        <header className="tc pv4 lh-copy">
          <h2 className="tc f1-l fw1">{convertLfToBr(error.message)}</h2>
        </header>
        <p className="w4 m0a">
          <Button
            className="danger"
            startIcon={<ArrowBackIcon fontSize="small" />}
            onClick={resetErrorBoundary}
          >
            前に戻る
          </Button>
        </p>
      </section>
    </div>
  );
};
