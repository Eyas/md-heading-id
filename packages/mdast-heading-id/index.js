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
        const node = this.stack.length >= 1 ? this.stack[this.stack.length - 1] : undefined;
        this.exit(token);
        if (!node) {
          return;
        }
        if (node.type !== 'idString') {
          console.error(node);
          return;
        }
        (/** @type {MdIdString} */ node).value = idString;
      },
    },
  };

  return fromMarkdownExtension;
}

export default mdastHeadingId;
