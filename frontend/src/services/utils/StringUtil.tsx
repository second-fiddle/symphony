import { Fragment } from 'react';

const convert = (target: string) =>
  /* eslint-disable react/no-array-index-key */
  target
    .split(/(\\n)/)
    .map((text, index) => (
      <Fragment key={index}> {/\\n/.exec(text) ? <br /> : text}</Fragment>
    ));

export const convertLfToBr = (texts: string | string[] | undefined) => {
  if (!texts) {
    return texts;
  }
  if (Array.isArray(texts)) {
    return texts.map((text) => convert(text));
  }

  return convert(texts);
};
