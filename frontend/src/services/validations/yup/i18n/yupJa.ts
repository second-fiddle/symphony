/* eslint-disable */
import * as yup from 'yup';
import { LocaleObject } from 'yup/lib/locale';

export const mixed = {
  default: ({ label }: any): string =>
    `${label ? `${label}の` : ''}値が不正です`,
  required: ({ label }: any): string =>
    `${label ? `${label}は` : ''}必須項目です`,
  // oneOf: ({ label, values }: any): string =>
  //   `${label ? `${label}には` : ''}以下のものが入力できます: ${values}`,
  notOneOf: ({ label, values }: any): string =>
    `${label ? `${label}には` : ''}以下のものは入力できません: ${values}`,

  // From user's perspective, defined and default is essentially same.
  defined: ({ label }: any): string => `${label ? `${label}は` : ''}必須です`,
};

export const string = {
  length: ({ label, length }: any): string =>
    `${label ? `${label}は` : ''}${length}文字である必要があります`,
  min: ({ label, min }: any): string =>
    `${label ? `${label}は` : ''}${min}文字以上のみ入力できます`,
  max: ({ label, max }: any): string =>
    `${label ? `${label}は` : ''}${max}文字まで入力できます`,
  matches: ({ label, regex }: any): string =>
    `${label ? `${label}は` : ''}以下の形式である必要があります: ${regex}`,
  email: ({ label }: any): string =>
    `${label ? `${label}は` : ''}正しいメールアドレスではありません`,
  url: ({ label }: any): string =>
    `${label ? `${label}は` : ''}正しいURLではありません`,
  uuid: ({ label }: any): string =>
    `${label ? `${label}は` : ''}正しいUUIDではありません`,
  trim: ({ label }: any): string =>
    `${label ? `${label}の` : ''}前後に空白は含められません`,
  lowercase: ({ label }: any): string =>
    `${label ? `${label}には` : ''}小文字のみ入力できます`,
  uppercase: ({ label }: any): string =>
    `${label ? `${label}には` : ''}大文字のみ入力できます`,
};

export const number = {
  min: ({ label, min }: any): string =>
    `${label ? `${label}には` : ''}${min}以上の数のみ入力可能です`,
  max: ({ label, max }: any): string =>
    `${label ? `${label}には` : ''}${max}以下の数のみ入力可能です`,
  lessThan: ({ label, less }: any): string =>
    `${label ? `${label}には` : ''}${less}未満の数のみ入力可能です`,
  moreThan: ({ label, more }: any): string =>
    `${label ? `${label}には` : ''}${more}より大きい数のみ入力可能です`,
  notEqual: ({ label, notEqual }: any): string =>
    `${label ? `${label}は` : ''}${notEqual}以外の数である必要があります`,
  positive: ({ label }: any): string =>
    `${label ? `${label}には` : ''}正の数のみ入力できます`,
  negative: ({ label }: any): string =>
    `${label ? `${label}には` : ''}負の数のみ入力できます`,
  integer: ({ label }: any): string =>
    `${label ? `${label}には` : ''}整数のみ入力可能です`,
};

export const date = {
  min: ({ label, min }: any): string =>
    `${label ? `${label}には` : ''}${min}以降の日付のみ入力可能です`,
  max: ({ label, max }: any): string =>
    `${label ? `${label}には` : ''}${max}以前の日付のみ入力可能です`,
};
export const { object } = yup;
export const array = {
  min: ({ label, min }: any): string =>
    `${label ? `${label}は` : ''}${min}つ以上必要です`,
  max: ({ label, max }: any): string =>
    `${label ? `${label}は` : ''}${max}つまで入力できます`,
};

const ja = {
  mixed,
  string,
  number,
  date,
  object,
  array,
};

yup.setLocale(ja as LocaleObject);

export const YupJa = yup;
