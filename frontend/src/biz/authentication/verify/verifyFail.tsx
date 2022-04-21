import { memo, VFC } from 'react';
import { Alert } from '@/components/ui/notifications';
import { Link } from 'react-router-dom';
import { HttpResult } from '@/services/https';

type Props = HttpResult;

/**
 * 認証失敗
 * @param httpResponse httpレスポンス
 * @returns
 */
export const VerifyFail: VFC<Props> = memo((props) => {
  const { result, message } = props;

  return (
    <>
      <Alert severity={result} message={message} />
      <Link to="/signup/tos" className="item">
        本人確認へ
      </Link>
    </>
  );
});
