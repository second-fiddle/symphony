import { FC } from 'react';
import { Button as MuiButton } from '@mui/material';
import { ButtonProps } from './props';

/**
 * ボタン
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    id,
    name,
    type = 'submit',
    className,
    variant = 'contained',
    fullWidth = true,
    disabled,
    href,
    startIcon,
    color,
    onClick,
    children,
  } = props;

  return (
    <MuiButton
      id={id}
      name={name}
      type={type}
      className={className}
      color={color}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      href={href}
      startIcon={startIcon}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};
