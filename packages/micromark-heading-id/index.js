/**
 * @typedef {import("micromark-util-types").Extension} Extension
 */

import {codes} from 'micromark-util-symbol';

/**
 * @returns {Extension} Fully-configured micromark extension for adding hading IDs
 */
export function micromarkHeadingId() {
  /** @type {Extension} */
  const syntaxExtension = {
    text: {
      [codes.leftCurlyBrace]: {
        name: 'headingIdMaybeStart',
        tokenize(effects, ok, nok) {
          return start;

          /** @type {import("micromark-util-types").State} */
          function start(code) {
            return effects.attempt(
              {
                tokenize(effects, ok, nok) {
                  return attemptStart;

                  /** @type {import("micromark-util-types").State} */
                  function attemptStart(code) {
                    if (code !== codes.leftCurlyBrace)
                      throw new Error(`Unexpected code ${code}`);
                    effects.enter('id');
                    effects.enter('idMarker');
                    effects.consume(code);
                    return attemptHash;
                  }

                  /** @type {import("micromark-util-types").State} */
                  function attemptHash(code) {
                    if (code !== codes.numberSign) {
                      return nok(code);
                    }
                    effects.consume(code);
                    effects.exit('idMarker');
                    effects.enter('idString');
                    effects.enter('chunkString', {contentType: 'string'});
                    return inside;
                  }

                  /** @type {import("micromark-util-types").State} */
                  function inside(code) {
                    if (
                      [
                        codes.carriageReturn,
                        codes.lineFeed,
                        codes.carriageReturnLineFeed,
                        null,
                        codes.backslash,
                        codes.leftCurlyBrace,
                      ].includes(
                        // @ts-ignore
                        code
                      )
                    ) {
                      return nok(code);
                    }
                    if (code === codes.rightCurlyBrace) {
                      effects.exit('chunkString');
                      effects.exit('idString');
                      effects.enter('idMarker');
                      effects.consume(code);
                      effects.exit('idMarker');
                      effects.exit('id');
                      return ok;
                    }
                    effects.consume(code);
                    return inside;
                  }
                },
              },
              ok,
              nok
            )(code);
          }
        },
      },
    },
  };

  return syntaxExtension;
}

export default micromarkHeadingId;
