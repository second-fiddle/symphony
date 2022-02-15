import { VFC } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import KeyIcon from '@mui/icons-material/Key';
import { convertLfToBr } from 'services/utils/StringUtil';
import { InputFieldProps, RhfRegisterInputFieldProps } from './props';
import useShowPassword from './hooks/useShowPassword';

type Props = InputFieldProps & RhfRegisterInputFieldProps;

/**
 * パスワードフィールド
 */
const PasswordField: VFC<Props> = (props) => {
  const {
    label,
    id,
    placeholder,
    required,
    showStartIcon,
    showEndIcon,
    errorMessages,
    value,
    onChange,
    onBlur,
  } = props;

  const [inputType, showIcon, handleShowPassword] = useShowPassword();
  const showMessage = convertLfToBr(errorMessages);

  return (
    <FormControl variant="outlined" error={!!showMessage}>
      <InputLabel htmlFor={id} required={required}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type={inputType}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        startAdornment={
          showStartIcon && (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          )
        }
        endAdornment={
          showEndIcon && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                edge="end"
                tabIndex={-1}
              >
                {showIcon ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }
        label={label}
      />
      <FormHelperText>{showMessage}</FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
