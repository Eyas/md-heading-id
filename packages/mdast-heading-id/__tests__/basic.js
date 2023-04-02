import {fromMarkdown} from 'mdast-util-from-markdown';
import {micromarkHeadingId} from 'micromark-heading-id';
import {mdastHeadingId} from '../index.js';

describe('mdast plugin', () => {
  it('emits id node', () => {
    expect(
      fromMarkdown(`# simple id {#my-id-is-this-one}`, {
        extensions: [micromarkHeadingId()],
        mdastExtensions: [mdastHeadingId()],
      })
    ).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "children": [
              {
                "position": {
                  "end": {
                    "column": 13,
                    "line": 1,
                    "offset": 12,
                  },
                  "start": {
                    "column": 3,
                    "line": 1,
                    "offset": 2,
                  },
                },
                "type": "text",
                "value": "simple id ",
              },
              {
                "position": {
                  "end": {
                    "column": 32,
                    "line": 1,
                    "offset": 31,
                  },
                  "start": {
                    "column": 15,
                    "line": 1,
                    "offset": 14,
                  },
                },
                "type": "idString",
                "value": "my-id-is-this-one",
              },
            ],
            "depth": 1,
            "position": {
              "end": {
                "column": 33,
                "line": 1,
                "offset": 32,
              },
              "start": {
                "column": 1,
                "line": 1,
                "offset": 0,
              },
            },
            "type": "heading",
          },
        ],
        "position": {
          "end": {
            "column": 33,
            "line": 1,
            "offset": 32,
          },
          "start": {
            "column": 1,
            "line": 1,
            "offset": 0,
          },
        },
        "type": "root",
      }
    `);
  });
});
