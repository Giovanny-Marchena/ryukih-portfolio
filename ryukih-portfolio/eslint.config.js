module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // Avoids requiring React import for JSX
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': 'warn', // Warn on unused variables (like the React import)
    'react/prop-types': 'off', // Disable prop-types for simplicity
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};