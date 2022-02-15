import { VFC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { convertLfToBr } from 'services/utils/StringUtil';
import { InputFieldProps, RhfRegisterInputFieldProps } from './props';

type Props = InputFieldProps & RhfRegisterInputFieldProps;

/**
 * 所属コードフィールド
 */
const UnionCdField: VFC<Props> = (props) => {
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

  const iconDom = (position: 'start' | 'end') => (
    <InputAdornment position={position}>
      <ApartmentIcon />
    </InputAdornment>
  );

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
        startAdornment={showStartIcon && iconDom('start')}
        endAdornment={showEndIcon && iconDom('end')}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <FormHelperText>{showMessage}</FormHelperText>
    </FormControl>
  );
};

export default UnionCdField;
