import { VFC } from 'react';
import { Alert as MuiAlert } from '@mui/material';
import { convertLfToBr } from '@/services/utils/StringUtil';
import { HttpResultType } from '@/services/https/HttpResponse';

type Props = {
  severity?: HttpResultType;
  message: string | null | undefined;
};

/**
 * 通知メッセージを表示する
 */
export const Alert: VFC<Props> = (props) => {
  const { severity, message } = props;

  if (!message) {
    return null;
  }

  const showMessage = convertLfToBr(message);

  return (
    <MuiAlert variant="outlined" severity={severity} className="tl mb4">
      {showMessage}
    </MuiAlert>
  );
};
