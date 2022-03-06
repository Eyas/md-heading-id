import {remark} from 'remark';
import html from 'remark-rehype';
import stringify from 'rehype-stringify';
import {remarkHeadingId} from '../index.js';

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
      <h1 id=\\"someid\\">regular id</h1>
      <h1 id=\\"much-longer-id\\">another</h1>
      <h1 id=\\"with spaces\\">weird</h1>
      <h1 id=\\"عنوان\\">utf-8</h1>"
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
});
