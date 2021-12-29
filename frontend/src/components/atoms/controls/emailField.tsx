import { VFC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { InputFieldProps, RhfRegisterInputFieldProps } from './props';

type EmailFieldProps = InputFieldProps & RhfRegisterInputFieldProps;

/**
 * メールアドレスフィールド
 */
const EmailField: VFC<EmailFieldProps> = (props) => {
  const {
    label,
    id,
    placeholder,
    required,
    showStartIcon,
    showEndIcon,
    errorMessage,
    value,
    onChange,
    onBlur,
  } = props;

  const iconDom = (position: 'start' | 'end') => (
    <InputAdornment position={position}>
      <EmailIcon />
    </InputAdornment>
  );

  return (
    <FormControl variant="outlined" error={!!errorMessage}>
      <InputLabel htmlFor={id} required={required}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type="email"
        placeholder={placeholder}
        startAdornment={showStartIcon && iconDom('start')}
        endAdornment={showEndIcon && iconDom('end')}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default EmailField;
