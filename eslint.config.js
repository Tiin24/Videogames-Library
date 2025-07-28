import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,

  // Configuración flexible para nombres de componentes
  {
    rules: {
      // Deshabilitar completamente la regla para máxima flexibilidad
      'vue/multi-word-component-names': 'off',

      // O si prefieres ser más específico pero flexible:
      // 'vue/multi-word-component-names': ['warn', {
      //   ignores: [
      //     // Nombres simples comunes
      //     'home', 'index', 'default', 'app', 'main',
      //     // Nombres de navegación
      //     'news', 'random', 'popular', 'genres', 'tags',
      //     'platforms', 'stores', 'developers', 'publishers',
      //     // Nombres con guiones (kebab-case)
      //     'advanced-search', 'best-rated', 'recently-released',
      //     'upcoming-release', 'most-anticipated'
      //   ]
      // }]
    }
  }
])
