module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue-scoped-css/vue3-recommended',
    'plugin:vue/essential',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],
  rules: {
    'max-len': ["error", { "code": 170 }]                                                                                                                                
  },
  globals: {
    $nuxt: true
  },
};
