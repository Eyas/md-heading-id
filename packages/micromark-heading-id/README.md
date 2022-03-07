[![Build Status](https://github.com/Eyas/md-heading-id/actions/workflows/ci.yml/badge.svg)](https://github.com/Eyas/md-heading-id/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/Eyas/md-heading-id/branch/main/graph/badge.svg?token=BAF7ARB105)](https://codecov.io/gh/Eyas/md-heading-id)

# micromark-heading-id

Syntax support for `{#my-id}` syntax in
[micromark](https://github.com/micromark/micromark).

Most users should use
[remark-custom-heading-id](https://www.npmjs.com/package/remark-custom-heading-id)
instead, which works end-to-end with [remark](https://remarkjs.com/).

This extension does not modify the resultant Markdown AST, but only serves to
help micromark understand this extended syntax.
