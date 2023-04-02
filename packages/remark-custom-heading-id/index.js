/**
 * @typedef {import('mdast').Root} Root
 */

import {visit} from 'unist-util-visit';
import {micromarkHeadingId} from 'micromark-heading-id';
import {mdastHeadingId} from 'mdast-heading-id';

/**
 * @type {import('unified').Plugin<[], Root, Root>}
 * @this {import('unified').Processor<void, Root>}
 */
export function remarkHeadingId() {
  const data = this.data();

  /**
   * @param {string} key
   * @param {unknown} value
   */
  function add(key, value) {
    const list = /** @type {unknown[]} */ (data[key]) || (data[key] = []);
    list.push(value);
  }

  add('micromarkExtensions', micromarkHeadingId());
  add('fromMarkdownExtensions', mdastHeadingId());

  return function (node) {
    visit(node, 'idString', (node, _, parent) => {
      if (!parent) throw new Error(`Unexpected idString under no parent.`);
      if (parent.type !== 'heading')
        throw new Error(`Unexpected node ${node} under ${parent}`);
    });

    visit(node, 'heading', node => {
      const ids =
        /** @type {import("mdast-heading-id/tree-extension").MdIdString[]} */ (
          (getChildren(node) || []).filter(child => child.type === 'idString')
        );

      if (ids.length == 0) return;
      if (ids.length > 1)
        throw new Error(`Found ${ids.length} ids under heading ${node}.`);

      const idNode = ids[0];
      if (idNode.value && idNode.value.length > 0) {
        if (!node.data) node.data = {};
        if (!node.data.hProperties) node.data.hProperties = {};
        node.data.id = /** @type {{id?: string}} */ (node.data.hProperties).id =
          idNode.value;

        idNode.value = '';
        const children = getChildren(node);
        if (!children) return;

        const nodeIndex = children.indexOf(idNode);
        if (nodeIndex >= 1) {
          const previous = children[nodeIndex - 1];
          if (previous.type === 'text') {
            previous.value = previous.value.trimEnd();
          }
        }
        children.splice(nodeIndex, 1);
      }
    });
  };
}

/**
 * Util to simplify typings.
 * @param {import('mdast').Content | Root} node Tree
 */
function getChildren(node) {
  if ('children' in node) {
    return node.children;
  }
  return undefined;
}

export default remarkHeadingId;
