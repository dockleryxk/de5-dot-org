// eslint.config.mjs
// ESLint flat config with Nuxt rules + Prettier conflict resolution
// eslint-config-prettier must be last to disable formatting rules that conflict with Prettier
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(
  // Pug templates are not parsed by vue-eslint-parser, so script setup variables
  // bound to templates appear "unused" to @typescript-eslint/no-unused-vars.
  // Disable the TS rule in Vue files and rely on vue/no-unused-vars instead.
  {
    files: ['**/*.vue'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  eslintConfigPrettier,
)
