module.exports = {
  env: {
    commonjs: true,
    es6: true,
  },
  extends: [
    'react-app',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    quotes: ["error", "double"],
    "linebreak-style": 0,
    "no-console": ["error", { allow: ["warn", "error"] }] //sa facem logger intr-un fisier
  },
};
