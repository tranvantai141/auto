module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/**/*'],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    indent: ['off'], // indent is handled by prettier
    'linebreak-style': ['error', 'unix'],
    // Removing this config so that we can accept both single and double quotes in the codebase.
    // quotes: ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    'react/display-name': ['off'],
    'prefer-const': 1,
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
