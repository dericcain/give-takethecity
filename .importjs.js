const testFilePattern = /lib\/__tests__/;

module.exports = {
  ignorePackagePrefixes: ['lodash.'],
  declarationKeyword: 'import',
  logLevel: 'debug',
  excludes: [
    './build/**',
    './public/**',
    './scripts/**',
    './flow-typed/**',
    './config/**',
  ]
}