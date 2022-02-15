/* eslint-disable @typescript-eslint/restrict-template-expressions
 */
import { VFC } from 'react';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import { InputFieldProps } from 'components/atoms/controls/props';
import TextField from 'components/atoms/controls/textField';

/**
 * React hook form テキスト
 */
export const RhfTextField: VFC<InputFieldProps> = (props) => {
  const { name, control, label, id, placeholder, required } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({
        field: { onChange, onBlur, value, ref },
        formState: { errors },
      }) => (
        <TextField
          label={label}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          inputRef={ref}
          errorMessages={
            errors[name] &&
            `${(errors[name] as DeepMap<FieldValues, FieldError>)?.message}`
          }
        />
      )}
    />
  );
};

export default RhfTextField;
