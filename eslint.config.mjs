// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
      'app/assets/styles/normalize.css',
    ],
  },
  {
    rules: {
      '@stylistic/max-len': ['error', { code: 240, ignoreUrls: true, ignoreTemplateLiterals: true }],
      // `if (!x) { return; }` on one line is the idiom used throughout this project.
      '@stylistic/max-statements-per-line': ['error', { max: 2 }],
      '@stylistic/quote-props': ['error', 'as-needed'],
      // Storyblok bloks are untyped CMS payloads.
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': ['error', { singleline: { max: 5 } }],
      'no-underscore-dangle': 'off',
      'import/prefer-default-export': 'off',
    },
  },
  {
    // The project indents the contents of <script> blocks one level in.
    files: ['**/*.vue'],
    rules: {
      'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
      '@stylistic/indent': 'off',
    },
  },
);
