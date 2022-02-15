/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { InputFieldProps } from 'components/atoms/controls/props';
import PasswordField from 'components/atoms/controls/passwordField';
import { VFC } from 'react';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';

type RhfPasswordFieldProps = InputFieldProps;

/**
 * React hook form パスワードフィールド
 */
const RhfPasswordField: VFC<RhfPasswordFieldProps> = (props) => {
  const {
    name,
    control,
    label,
    id,
    placeholder,
    required,
    showStartIcon,
    showEndIcon,
    errors,
  } = props;

  const errorMessages = errors && errors[name];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
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

export default RhfPasswordField;
