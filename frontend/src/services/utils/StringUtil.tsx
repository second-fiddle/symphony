import { Fragment } from 'react';

/**
 *
 * @param texts string|string[] 変換対象文字列
 * @returns <Fragment>[]
 */
const convert = (texts: string) =>
  /* eslint-disable react/no-array-index-key */
  texts
    .split(/(\\n)/)
    .map((text, index) => (
      <Fragment key={index}> {/\\n/.exec(text) ? <br /> : text}</Fragment>
    ));

/**
 * 改行コードをbrタグタグに変換する
 * @param texts string|string[]|undefined 変換対象文字列
 * @return <Fragment>[]
 */
export const convertLfToBr = (texts: string | string[] | undefined) => {
  if (!texts) {
    return texts;
  }
  if (Array.isArray(texts)) {
    return texts.map((text) => convert(text));
  }

  return convert(texts);
};
