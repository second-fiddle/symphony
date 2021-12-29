/* eslint-disable @typescript-eslint/restrict-template-expressions
 */
import { VFC } from 'react';
import EmailField from 'components/atoms/controls/emailField';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import { InputFieldProps } from 'components/atoms/controls/props';

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
        <EmailField
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

export default RhfEmailField;
