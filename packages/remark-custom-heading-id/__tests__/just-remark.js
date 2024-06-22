import {remark} from 'remark';
import html from 'remark-rehype';
import stringify from 'rehype-stringify';
import {remarkHeadingId} from '../index.js';

import {jest} from '@jest/globals';
jest.useFakeTimers();

describe('plugin with vanilla remark', function () {
  it('should parse well', function () {
    let contents = remark().use(remarkHeadingId).use(html).use(stringify)
      .processSync(`# no id
# regular id {#someid}
# another {#much-longer-id}
# weird {#with spaces}
# utf-8 {#عنوان}
      `);

    expect(String(contents)).toMatchInlineSnapshot(`
      "<h1>no id</h1>
      <h1 id="someid">regular id</h1>
      <h1 id="much-longer-id">another</h1>
      <h1 id="with spaces">weird</h1>
      <h1 id="عنوان">utf-8</h1>"
    `);
  });

  // TODO: There seems to be an infinite loop here.
  // it('ignores empty ids', function () {
  //   let contents = remark()
  //     .use(remarkHeadingId)
  //     .use(html)
  //     .use(stringify)
  //     .processSync(`# empty id {#}`);

  //   expect(String(contents)).toMatchInlineSnapshot();
  // });

  it('should not allow IDs in paragraphs', function () {
    expect(() =>
      remark().use(remarkHeadingId).use(html).use(stringify)
        .processSync(`Regular text

# regular id {#someid}

Paragraph with ID {#someid}
      `)
    ).toThrowError('Unexpected node');
  });

  it('should not allow multiple IDs', function () {
    expect(() =>
      remark().use(remarkHeadingId).use(html).use(stringify)
        .processSync(`Regular text

# regular id {#someid} {#anotherid}
      `)
    ).toThrowError('Found 2 ids');
  });

  it('behaves well with other tags', function () {
    const contents = remark().use(remarkHeadingId).use(html).use(stringify)
      .processSync(`
Just a paragraph.

With some \`code\`.

# Header {#id1}

With descriptions!

# Header with \`code\` {#id2}
      `);

    expect(String(contents)).toMatchInlineSnapshot(`
      "<p>Just a paragraph.</p>
      <p>With some <code>code</code>.</p>
      <h1 id="id1">Header</h1>
      <p>With descriptions!</p>
      <h1 id="id2">Header with <code>code</code></h1>"
    `);
  });
});
