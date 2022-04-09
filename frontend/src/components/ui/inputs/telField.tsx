import { VFC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { convertLfToBr } from 'services/utils/StringUtil';
import { format } from 'services/utils/TelUtil';
import { RhfRegisterInputFieldProps } from './props';

/**
 * 電話番号フィールド
 */
export const TelField: VFC<RhfRegisterInputFieldProps> = (props) => {
  const {
    label,
    id,
    autoComplete,
    placeholder,
    required,
    inputProps,
    sx,
    errorMessages,
    value,
    onChange,
    onBlur,
  } = props;

  const showMessage = convertLfToBr(errorMessages);
  const tel: string = format(value);

  return (
    <FormControl variant="outlined" error={!!showMessage}>
      <InputLabel htmlFor={id} required={required}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type="tel"
        autoComplete={autoComplete}
        placeholder={placeholder}
        label={label}
        value={tel}
        inputProps={inputProps}
        sx={sx}
        onChange={onChange}
        onBlur={onBlur}
      />
      <FormHelperText>{showMessage}</FormHelperText>
    </FormControl>
  );
};
