import {micromark} from 'micromark';

import {micromarkHeadingId} from '../index.js';

import {jest} from '@jest/globals';
jest.useFakeTimers();

/** @type {import('micromark-util-types').HtmlExtension} */
const inspectSyntaxHtmlExtension = {
  enter: {
    id() {
      this.raw('[id]');
      this.buffer();
    },
    idMarker() {
      this.raw('[idMarker]');
      this.buffer();
    },
    idString() {
      this.raw('[idString]');
      this.buffer();
    },
  },
  exit: {
    id() {
      this.raw(this.encode(this.resume()));
      this.raw('[/id]');
    },
    idMarker() {
      this.raw(this.encode(this.resume()));
      this.raw('[/idMarker]');
    },
    idString() {
      this.raw(this.encode(this.resume()));
      this.raw('[/idString]');
    },
  },
};

describe('micromark extension', () => {
  it('noop without extensions', () => {
    const result = micromark(
      `
# regular heading
# with id {#id-1}
# with another {#anotherid}
Text.
    `,
      {extensions: [micromarkHeadingId()]}
    );

    expect(result).toMatchInlineSnapshot(`
      "<h1>regular heading</h1>
      <h1>with id id-1</h1>
      <h1>with another anotherid</h1>
      <p>Text.</p>
      "
    `);
  });

  it('emits regular syntax tree', () => {
    const result = micromark(
      `
# regular heading
# with id {#id-1}
# another id {#anotherid}
Text.
    `,
      {
        extensions: [micromarkHeadingId()],
        htmlExtensions: [inspectSyntaxHtmlExtension],
      }
    );

    expect(result).toMatchInlineSnapshot(`
      "<h1>regular heading</h1>
      <h1>with id [id][idMarker][/idMarker][idString]id-1[/idString][idMarker][/idMarker][/id]</h1>
      <h1>another id [id][idMarker][/idMarker][idString]anotherid[/idString][idMarker][/idMarker][/id]</h1>
      <p>Text.</p>
      "
    `);
  });

  it('ignores escaped opening brace', () => {
    const result = micromark(
      `# escaped \\{#not-id}
Foo.
      `,
      {
        extensions: [micromarkHeadingId()],
        htmlExtensions: [inspectSyntaxHtmlExtension],
      }
    );

    expect(result).toMatchInlineSnapshot(`
      "<h1>escaped {#not-id}</h1>
      <p>Foo.</p>
      "
    `);
  });

  it('gracefully aborts with missing hash', () => {
    const result = micromark(
      `
# regular heading
# with id {not-id}
# with another {alsonotid}
Text.
      `,
      {
        extensions: [micromarkHeadingId()],
        htmlExtensions: [inspectSyntaxHtmlExtension],
      }
    );

    expect(result).toMatchInlineSnapshot(`
      "<h1>regular heading</h1>
      <h1>with id {not-id}</h1>
      <h1>with another {alsonotid}</h1>
      <p>Text.</p>
      "
    `);
  });

  it('gracefully aborts with unmatched paren', () => {
    const result = micromark(
      `
# with id {#no
      `,
      {
        extensions: [micromarkHeadingId()],
        htmlExtensions: [inspectSyntaxHtmlExtension],
      }
    );

    expect(result).toMatchInlineSnapshot(`
      "<h1>with id {#no</h1>
      "
    `);
  });
});
