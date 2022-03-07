[![Build Status](https://github.com/Eyas/md-heading-id/actions/workflows/ci.yml/badge.svg)](https://github.com/Eyas/md-heading-id/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/Eyas/md-heading-id/branch/main/graph/badge.svg?token=BAF7ARB105)](https://codecov.io/gh/Eyas/md-heading-id)

# remark-custom-heading-id

Support for Heading ID Markdown Extensions for Remark, compatible with MDX.js.

## Get Started

Most users should use **remark-custom-heading-id**:

```bash
$ npm install remark-custom-heading-id --save
```

### ... with vanilla Remark

```js
import {remarkHeadingId} from 'remark-custom-heading-id';
import {remark} from 'remark';
import html from 'remark-rehype';
import stringify from 'rehype-stringify';

const result = remark().use(remarkHeadingId).use(html).use(stringify)
      .processSync(`# Hello, world {#hello}`);
console.log(String(result));

// Outputs:
// <h1 id="hello">Hello, world<h1>
```

### ... with MDX Remark

```js
import {remarkHeadingId} from 'remark-custom-heading-id';
import {remark} from 'remark';
import remarkMdx from 'remark-mdx';
import html from 'remark-rehype';
import stringify from 'rehype-stringify';

const result = remark()
  .use(remarkMdx)
  .use(remarkHeadingId)
  .use(html)
  .use(stringify).processSync(`# Hello, world {#hello}`);

console.log(String(result));

// Outputs:
// <h1 id="hello">Hello, world<h1>
```

### ... with MDX-based plugins (e.g. next-mdx-remote)

```js
import {remarkHeadingId} from 'remark-custom-heading-id';
import { serialize } from "next-mdx-remote/serialize"; // or similar...

export default async function getMdxProps(source) {
  return await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkHeadingId],
    }
  });
}
```
