/* eslint-disable @typescript-eslint/restrict-template-expressions
 */
import { VFC } from 'react';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import { InputFieldProps } from 'components/atoms/controls/props';
import UnionCdField from 'components/atoms/controls/unionCdField';

/**
 * React hook form メールアドレス
 */
export const RhfUnionCdField: VFC<InputFieldProps> = (props) => {
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
        <UnionCdField
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

export default RhfUnionCdField;
