/**
 * ユーザーモデル
 */
export type User = {
  id?: number;
  unionId: number;
  lastName: string;
  firstName: string;
  lastNameRuby: string;
  firstNameRuby: string;
  nickname: string;
  tel1: string;
  tel2: string;
  tel3: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
