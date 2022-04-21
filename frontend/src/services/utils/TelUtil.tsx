import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const phoneNumberUtil = PhoneNumberUtil.getInstance();
const region = 'JP';

/**
 * 電話番号のチェックを行う
 *
 * @param value 電話番号
 * @returns boolean true: 正常, false: 異常
 */
export const telValidator = (value: string): boolean => {
  if (!value) {
    return true;
  }
  try {
    const phoneNumber = phoneNumberUtil.parse(value, region);

    return !!phoneNumberUtil.isValidNumber(phoneNumber);
  } catch (error) {
    return false;
  }
};

/**
 * 電話番号をハイフン区切りにフォーマットする
 * @param value 電話番号
 * @returns string
 */
export const format = (value: string): string => {
  if (!value || !telValidator(value)) {
    return value;
  }
  try {
    const phoneNumber = phoneNumberUtil.parse(value, region);

    return phoneNumberUtil.format(phoneNumber, PhoneNumberFormat.NATIONAL);
  } catch (error) {
    return value;
  }
};
