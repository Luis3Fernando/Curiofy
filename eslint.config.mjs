// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-call': 'off', // Desactivar la regla de llamadas inseguras
      '@typescript-eslint/no-unsafe-member-access': 'off', // Desactivar el acceso a miembros inseguros
      '@typescript-eslint/no-unsafe-return': 'off', // Desactivar el retorno inseguro
      '@typescript-eslint/no-unsafe-assignment': 'off', // Desactivar la asignación insegura
      '@typescript-eslint/no-redundant-type-constituents': 'off',
    },
  },
);
