/**
 * @typedef {import('mdast-util-from-markdown').Extension} FromMarkdownExtension
 * @typedef {import('./tree-extension').MdIdString} MdIdString
 */

/** @returns {FromMarkdownExtension} Fully-configured extension to add Heading ID nodes to Markdown. */
export function mdastHeadingId() {
  /** @type {FromMarkdownExtension} */
  const fromMarkdownExtension = {
    enter: {
      idString(token) {
        this.enter({type: 'idString', value: null}, token);
        this.buffer();
      },
    },
    exit: {
      idString(token) {
        const idString = this.resume();
        const node = /** @type {MdIdString} */ (this.exit(token));
        node.value = idString;
      },
    },
  };

  return fromMarkdownExtension;
}

export default mdastHeadingId;
