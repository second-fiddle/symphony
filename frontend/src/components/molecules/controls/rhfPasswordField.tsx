/* eslint-disable react/destructuring-assignment,
                  @typescript-eslint/no-unsafe-assignment,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/restrict-template-expressions
*/
import { InputFieldProps } from 'components/atoms/controls/props';
import PasswordField from 'components/atoms/controls/passwordField';
import { VFC } from 'react';
import { Controller, DeepMap, FieldError, FieldValues } from 'react-hook-form';
import { FormInputProps } from 'semantic-ui-react';

type RhfPasswordFieldProps = InputFieldProps & FormInputProps;

const RhfPasswordField: VFC<RhfPasswordFieldProps> = (props) => (
  <Controller
    name={props.name}
    control={props.control}
    defaultValue=""
    render={({
      field: { onChange, onBlur, value, ref },
      formState: { errors },
    }) => (
      <PasswordField
        label={props.label}
        id={props.id}
        placeholder={props.placeholder}
        isRequired={props.required}
        showIcon={props.showIcon}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        inputRef={ref}
        errorMessage={
          errors[props.name] &&
          `${(errors[props.name] as DeepMap<FieldValues, FieldError>)?.message}`
        }
      />
    )}
  />
);

export default RhfPasswordField;
