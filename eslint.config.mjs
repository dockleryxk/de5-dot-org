// eslint.config.mjs
// ESLint flat config with Nuxt rules + Prettier conflict resolution
// eslint-config-prettier must be last to disable formatting rules that conflict with Prettier
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(eslintConfigPrettier)
