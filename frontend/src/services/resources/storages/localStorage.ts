/**
 * ローカルストレージの操作を行う
 */
/**
 * ローカルストレージキーを定義する
 */
export const LocalStorageKey = {
  LoginInfo: 'login-info',
} as const;
type LocalStorageKey = typeof LocalStorageKey[keyof typeof LocalStorageKey];

/**
 * ローカルストレージに登録されているデータを取得する
 * @param key ローカルストレージキー
 * @returns 取得データ
 */
export const getStoredInfo = <T>(key: LocalStorageKey): T | null => {
  const storedInfo = localStorage.getItem(key);

  return storedInfo ? (JSON.parse(storedInfo) as T) : null;
};

/**
 * ローカルストレージにデータを登録・更新する
 * @param key ローカルストレージキー
 * @param store 登録するオブジェクト
 */
export const setStoredInfo = <T>(key: LocalStorageKey, store: T): void =>
  localStorage.setItem(key, JSON.stringify(store));

/**
 * ローカルストレージから対象データを削除する
 * @param key ローカルストレージキー
 */
export const clearStored = (key: LocalStorageKey): void =>
  localStorage.removeItem(key);
