import { VFC } from 'react';
import styled from '@emotion/styled';
import { Alert as MuiAlert } from '@mui/material';
import { convertLfToBr } from 'services/utils/StringUtil';

const SAlert = styled(MuiAlert)`
  margin-bottom: 20px;
  text-align: left;
`;

type Props = {
  severity: 'error' | 'warning' | 'info' | 'success' | undefined;
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
    <SAlert variant="outlined" severity={severity}>
      {showMessage}
    </SAlert>
  );
};
