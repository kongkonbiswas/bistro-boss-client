import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
        globals: {
          ...globals.node
        }
    }
},
  {
    rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    "no-unused-expressions" : 'error',
    "prefer-const": "error",
    "no-undef": "error",
    "no-console": "warn"
  },
},
// Specifying files and directories to ignore
  {
    ignores: ["**/env", "**/dist/", "**/node_modules/"], 
  }
);