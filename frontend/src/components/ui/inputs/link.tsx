import { FC } from 'react';
import { Link as RrdLink, LinkProps } from 'react-router-dom';

/**
 * リンク
 */
export const Link: FC<LinkProps> = (props) => {
  const { to, children } = props;

  return (
    <RrdLink to={to} className="link black-70 dim black-70">
      {children}
    </RrdLink>
  );
};
