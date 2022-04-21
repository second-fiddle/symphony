/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { VFC } from 'react';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import { InputFieldProps } from '@/components/ui/inputs/props';
import { TextField } from '@/components/ui/inputs';

/**
 * React hook form テキスト
 */
export const RhfTextField: VFC<InputFieldProps> = (props) => {
  const {
    name,
    control,
    label,
    id,
    placeholder,
    autoComplete,
    required,
    defaultValue = '',
    inputProps,
    sx,
    errors,
  } = props;

  const errorMessages = errors && errors[name];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { onChange, onBlur, value, ref },
        formState: { errors: formStateErrors },
      }) => (
        <TextField
          label={label}
          id={id}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          inputProps={inputProps}
          sx={sx}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          inputRef={ref}
          errorMessages={
            errorMessages ||
            (formStateErrors[name] &&
              `${
                (formStateErrors[name] as DeepMap<FieldValues, FieldError>)
                  ?.message
              }`)
          }
        />
      )}
    />
  );
};
