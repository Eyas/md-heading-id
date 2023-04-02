import {remarkHeadingId} from '../index.js';
import {compile} from '@mdx-js/mdx';
import {VFile} from 'vfile';

describe('plugin with @mdx-js/mdx', () => {
  it('should parse well', async () => {
    const file = await compile(
      new VFile(`# no id
# regular id {#someid}
# another {#much-longer-id}
# weird {#with spaces}
# utf-8 {#عنوان}`),
      {
        remarkPlugins: [remarkHeadingId],
        outputFormat: 'function-body',
      }
    );

    expect(String(file)).toMatchInlineSnapshot(`
      "/*@jsxRuntime automatic @jsxImportSource react*/
      const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
      function _createMdxContent(props) {
        const _components = Object.assign({
          h1: "h1"
        }, props.components);
        return _jsxs(_Fragment, {
          children: [_jsx(_components.h1, {
            children: "no id"
          }), "\\n", _jsx(_components.h1, {
            id: "someid",
            children: "regular id"
          }), "\\n", _jsx(_components.h1, {
            id: "much-longer-id",
            children: "another"
          }), "\\n", _jsx(_components.h1, {
            id: "with spaces",
            children: "weird"
          }), "\\n", _jsx(_components.h1, {
            id: "عنوان",
            children: "utf-8"
          })]
        });
      }
      function MDXContent(props = {}) {
        const {wrapper: MDXLayout} = props.components || ({});
        return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
          children: _jsx(_createMdxContent, props)
        })) : _createMdxContent(props);
      }
      return {
        default: MDXContent
      };
      "
    `);
  });

  it('still okay with expressions', async () => {
    const file = await compile(
      new VFile(`# no id {5 * 3}
# regular id {2 + 2} {#someid}
    `),
      {
        remarkPlugins: [remarkHeadingId],
        outputFormat: 'function-body',
      }
    );

    expect(String(file)).toMatchInlineSnapshot(`
      "/*@jsxRuntime automatic @jsxImportSource react*/
      const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
      function _createMdxContent(props) {
        const _components = Object.assign({
          h1: "h1"
        }, props.components);
        return _jsxs(_Fragment, {
          children: [_jsxs(_components.h1, {
            children: ["no id ", 5 * 3]
          }), "\\n", _jsxs(_components.h1, {
            id: "someid",
            children: ["regular id ", 2 + 2]
          })]
        });
      }
      function MDXContent(props = {}) {
        const {wrapper: MDXLayout} = props.components || ({});
        return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
          children: _jsx(_createMdxContent, props)
        })) : _createMdxContent(props);
      }
      return {
        default: MDXContent
      };
      "
    `);
  });
});
