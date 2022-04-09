/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { VFC } from 'react';
import { EmailField } from 'components/ui/inputs/';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import { InputFieldProps } from 'components/ui/inputs/props';

/**
 * React hook form メールアドレス
 */
export const RhfEmailField: VFC<InputFieldProps> = (props) => {
  const {
    name,
    control,
    label,
    id,
    placeholder,
    autoComplete,
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
        <EmailField
          label={label}
          id={id}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
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
