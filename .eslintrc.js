/*
 * @Date: 2020-10-27 09:48:01
 * @Author: Codeep2
 * @LastEditTime: 2020-10-27 10:14:45
 * @LastEditors: Codeep2
 * @Description: ESLint 配置
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
