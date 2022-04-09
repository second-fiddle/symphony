import { VFC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { convertLfToBr } from 'services/utils/StringUtil';
import { RhfRegisterInputFieldProps } from './props';

/**
 * テキストフィールド
 */
export const TextField: VFC<RhfRegisterInputFieldProps> = (props) => {
  const {
    label,
    id,
    placeholder,
    autoComplete,
    required,
    inputProps,
    sx,
    errorMessages,
    value,
    onChange,
    onBlur,
  } = props;

  const showMessage = convertLfToBr(errorMessages);

  return (
    <FormControl variant="outlined" error={!!showMessage}>
      <InputLabel htmlFor={id} required={required}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type="text"
        placeholder={placeholder}
        autoComplete={autoComplete}
        label={label}
        value={value}
        inputProps={inputProps}
        sx={sx}
        onChange={onChange}
        onBlur={onBlur}
      />
      <FormHelperText>{showMessage}</FormHelperText>
    </FormControl>
  );
};
