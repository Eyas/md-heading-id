import {remark} from 'remark';
import remarkMdx from 'remark-mdx';
import html from 'remark-rehype';
import stringify from 'rehype-stringify';
import {remarkHeadingId} from '../index.js';

describe('plugin with remark-mdx', () => {
  it('should parse well', () => {
    const file = remark()
      .use(remarkMdx)
      .use(remarkHeadingId)
      .use(html)
      .use(stringify).processSync(`# no id
# regular id {#someid}
# another {#much-longer-id}
# weird {#with spaces}
# utf-8 {#عنوان}
      `);

    expect(String(file)).toMatchInlineSnapshot(`
      "<h1>no id</h1>
      <h1 id=\\"someid\\">regular id</h1>
      <h1 id=\\"much-longer-id\\">another</h1>
      <h1 id=\\"with spaces\\">weird</h1>
      <h1 id=\\"عنوان\\">utf-8</h1>"
    `);
  });
});
