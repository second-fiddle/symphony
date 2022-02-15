import { InputBaseProps } from '@mui/material';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import { RefCallBack } from 'react-hook-form';

export type InputFieldProps = InputBaseProps & {
  label?: string;
  name: string;
  required?: boolean;
  showStartIcon?: boolean;
  showEndIcon?: boolean;
  errors?: { [name: string]: Array<string> };
  errorMessages?: string | string[] | undefined;
  control?: any;
};

export type RhfRegisterInputFieldProps = {
  inputRef?: RefCallBack;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
};
