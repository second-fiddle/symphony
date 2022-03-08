/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { VFC } from 'react';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import { InputFieldProps } from 'components/ui/inputs/props';
import { PropertyCdField } from 'components/ui/inputs';

/**
 * React hook form メールアドレス
 */
export const RhfPropertyCdField: VFC<InputFieldProps> = (props) => {
  const {
    name,
    control,
    label,
    id,
    placeholder,
    readOnly,
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
        <PropertyCdField
          label={label}
          id={id}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
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
