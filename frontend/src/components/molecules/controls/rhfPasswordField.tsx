/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { InputFieldProps } from 'components/atoms/controls/props';
import PasswordField from 'components/atoms/controls/passwordField';
import { VFC } from 'react';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import { FormInputProps } from 'semantic-ui-react';

type RhfPasswordFieldProps = InputFieldProps & FormInputProps;

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
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({
        field: { onChange, onBlur, value, ref },
        formState: { errors },
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
          errorMessage={
            errors[name] &&
            `${(errors[name] as DeepMap<FieldValues, FieldError>)?.message}`
          }
        />
      )}
    />
  );
};

export default RhfPasswordField;
