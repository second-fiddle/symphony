import { VFC } from 'react';
import { Box, CircularProgress } from '@mui/material';

type Props = {
  show: boolean;
};

/**
 * ローディング
 */
export const FullpageCircularProgress: VFC<Props> = (props) => {
  const { show } = props;

  return (
    <Box
      sx={{
        display: show ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
