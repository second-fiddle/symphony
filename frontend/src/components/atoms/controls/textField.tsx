import { VFC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { convertLfToBr } from 'services/utils/StringUtil';
import { InputFieldProps, RhfRegisterInputFieldProps } from './props';

type Props = InputFieldProps & RhfRegisterInputFieldProps;

/**
 * テキストフィールド
 */
const TextField: VFC<Props> = (props) => {
  const {
    label,
    id,
    placeholder,
    required,
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
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <FormHelperText>{showMessage}</FormHelperText>
    </FormControl>
  );
};

export default TextField;
