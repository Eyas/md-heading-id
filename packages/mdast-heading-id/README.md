[![Build Status](https://github.com/Eyas/md-heading-id/actions/workflows/ci.yml/badge.svg)](https://github.com/Eyas/md-heading-id/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/Eyas/md-heading-id/branch/main/graph/badge.svg?token=BAF7ARB105)](https://codecov.io/gh/Eyas/md-heading-id)

# mdast-heading-id

[MDast](https://github.com/syntax-tree/mdast) utility to insert "ID" nodes in
the AST.

Most users should use
[remark-custom-heading-id](https://www.npmjs.com/package/remark-custom-heading-id)
instead, which works end-to-end with [remark](https://remarkjs.com/).

This utility works with the
[micromark-heading-id](https://www.npmjs.com/package/micromark-heading-id)
extension for [micromark](https://github.com/micromark/micromark) to insert
nodes based on the `{#my-id}` extended syntax for Markdown.
