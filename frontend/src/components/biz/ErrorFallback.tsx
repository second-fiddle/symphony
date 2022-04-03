import { VFC } from 'react';

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

export const ErrorFallback: VFC<Props> = (props) => {
  const { error } = props;

  return <div>{error.message}</div>;
};
