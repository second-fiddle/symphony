/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { VFC } from 'react';
import { InputFieldProps } from '@/components/ui/inputs/props';
import { PasswordField } from '@/components/ui/inputs';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';

/**
 * React hook form パスワードフィールド
 */
export const RhfPasswordField: VFC<InputFieldProps> = (props) => {
  const {
    name,
    control,
    label,
    id,
    placeholder,
    required,
    showStartIcon,
    showEndIcon,
    defaultValue = '',
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
        <PasswordField
          label={label}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          showStartIcon={showStartIcon}
          showEndIcon={showEndIcon}
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
