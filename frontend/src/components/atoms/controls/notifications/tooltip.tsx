import { VFC } from 'react';

type TooltipProps = {
  message: string | undefined;
  position?: 'above' | 'below' | 'left';
};

/**
 * コントロールにツールチップを表示します。
 */
const Tooltip: VFC<TooltipProps> = ({ message, position = 'above' }) => (
  <>
    {message && (
      <div
        className={`ui pointing ${position} prompt label`}
        role="alert"
        aria-atomic="true"
      >
        {message}
      </div>
    )}
  </>
);

export default Tooltip;
