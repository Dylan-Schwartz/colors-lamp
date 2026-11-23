const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/', 'coverage/'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.browser,
        md5: 'readonly',
      },
    },
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['html/js/md5.js'],
    languageOptions: {
      globals: {
        module: 'writable',
        exports: 'writable',
      },
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['html/js/code.js'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest,
        addColor: 'readonly',
        searchColor: 'readonly',
      },
    },
  },
];
