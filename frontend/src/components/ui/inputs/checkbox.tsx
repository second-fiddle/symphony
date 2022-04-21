import { VFC } from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { convertLfToBr } from '@/services/utils/StringUtil';
import { RhfRegisterCheckboxProps } from './props';

/**
 * チェックボックス
 */
export const CheckBox: VFC<RhfRegisterCheckboxProps> = (props) => {
  const {
    id,
    name,
    checked,
    label,
    labelPlacement,
    required,
    errorMessages,
    onChange,
  } = props;

  const showMessage = convertLfToBr(errorMessages);

  return (
    <FormControl variant="outlined" error={!!showMessage}>
      <FormControlLabel
        control={
          <MuiCheckbox
            id={id}
            name={name}
            checked={checked}
            required={required}
            onChange={onChange}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
      <FormHelperText>{showMessage}</FormHelperText>
    </FormControl>
  );
};
