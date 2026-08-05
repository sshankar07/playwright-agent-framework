import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['dist', 'node_modules', 'reports']
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules
    }
  }
];
