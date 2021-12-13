import { VFC } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Tooltip from 'components/atoms/controls/notifications/tooltip';
import { css } from '@emotion/react';
import { InputFieldProps, RhfRegisterInputFieldProps } from './props';
import useShowPassword from './hooks/useShowPassword';

type PasswordFieldProps = InputFieldProps & RhfRegisterInputFieldProps;

const eyeIconPositionStyle = css`
  top: 1px;
  right: 1px;
  left: auto;
  position: absolute;
  padding-right: 0 !important;
  padding-left: 0 !important;
  box-shadow: none !important;
`;

const PasswordField: VFC<PasswordFieldProps> = (props: PasswordFieldProps) => {
  const {
    label,
    id,
    placeholder,
    isRequired,
    showIcon,
    errorMessage,
    value,
    onChange,
    onBlur,
  } = props;

  const [inputType, icon, showPassword] = useShowPassword();

  return (
    <Form.Field required={isRequired}>
      {label && <label htmlFor={id}>{label}</label>}
      {showIcon ? (
        <div className="ui left icon input">
          <input
            id={id}
            placeholder={placeholder}
            type={inputType}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          <i className="lock icon" />
          <Button basic onClick={showPassword} css={eyeIconPositionStyle}>
            <i className={`eye ${icon} icon password-eye`} />
          </Button>
        </div>
      ) : (
        <div className="ui right icon input">
          <input
            id={id}
            placeholder={placeholder}
            type={inputType}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          <i className="eye slash icon" />
        </div>
      )}
      <Tooltip message={errorMessage} />
    </Form.Field>
  );
};

export default PasswordField;
