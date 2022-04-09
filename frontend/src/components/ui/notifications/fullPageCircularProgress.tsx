import { VFC } from 'react';
import { Box, CircularProgress } from '@mui/material';

/**
 * ローディング
 */
export const FullpageCircularProgress: VFC = () => (
  <Box
    sx={{
      display: 'flex',
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
