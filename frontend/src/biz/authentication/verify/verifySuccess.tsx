import { memo, VFC } from 'react';
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';

/**
 * 認証成功時のビュー
 */
export const VerifySuccess: VFC = memo(() => (
  <>
    <div className="ba b--silver br3">
      <Box className="pv2">
        <CheckCircleIcon fontSize="large" sx={{ color: green[300] }} />
      </Box>
      <Box className="mb3">メールアドレスの確認ができました</Box>
    </div>
    <div className="mt4">
      <Link to="/login" className="item">
        ログイン画面へ
      </Link>
    </div>
  </>
));
