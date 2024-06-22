import { createRequire } from 'node:module';

/** @type {import('jest').Config} */
export const config = {
  prettierPath: createRequire(import.meta.url).resolve('prettier-2'),
  testRegex: "/__tests__/.*\\.js$",
};

export default config;
