import {
  ButtonProps as MuiButtonProps,
  CheckboxProps as MuiCheckboxProps,
  InputBaseProps,
} from '@mui/material';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import { RefCallBack } from 'react-hook-form';

export type InputFieldProps = InputBaseProps & {
  name: string;
  label?: string;
  showStartIcon?: boolean;
  showEndIcon?: boolean;
  errors?: { [name: string]: Array<string> };
  errorMessages?: string | string[] | undefined;
  control?: any;
};

export type RhfRegisterInputFieldProps = InputFieldProps & {
  inputRef?: RefCallBack;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
};

export type CheckboxProps = MuiCheckboxProps & {
  checked: boolean;
  label: string;
  labelPlacement?: 'top' | 'start' | 'bottom' | 'end';
  errors?: { [name: string]: Array<string> };
  errorMessages?: string | string[] | undefined;
  control?: any;
};

export type RhfRegisterCheckboxProps = CheckboxProps & {
  inputRef?: RefCallBack;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export type ButtonProps = MuiButtonProps;
