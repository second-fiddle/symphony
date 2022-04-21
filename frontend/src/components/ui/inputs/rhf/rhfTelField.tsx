/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { VFC } from 'react';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import { InputFieldProps } from '@/components/ui/inputs/props';
import { TelField } from '@/components/ui/inputs';

/**
 * React hook form テキスト
 */
export const RhfTelField: VFC<InputFieldProps> = (props) => {
  const {
    name,
    control,
    label,
    id,
    autoComplete,
    placeholder,
    required,
    defaultValue,
    inputProps,
    sx,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { onChange, onBlur, value, ref },
        formState: { errors },
      }) => (
        <TelField
          label={label}
          id={id}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          inputProps={inputProps}
          sx={sx}
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
