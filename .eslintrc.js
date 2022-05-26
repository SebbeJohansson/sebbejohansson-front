module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    /* 'plugin:vue-scoped-css/vue3-recommended',
    'plugin:vue/essential',
    'plugin:vue/vue3-recommended', */
    "@vue/typescript/recommended",
    "airbnb-base",
    "airbnb-typescript/base",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "max-len": ["error", { code: 240 }],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.test.ts", "**/*.test.tsx"] },
    ],
  },
  globals: {
    $nuxt: true,
  },
  settings: {
    "import/core-modules": ["vue", "vuex", "vue-meta", "axios"], // these modules are included in nuxt.js
  },
};
