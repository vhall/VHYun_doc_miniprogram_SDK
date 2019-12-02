module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    wx: true,
    Component: true,
    Page: true,
    require: true,
    module: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'no-prototype-builtins': 'off' // 禁止直接使用Object.prototypes 的内置属性
  }
}
