import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      // eslint-plugin-react-hooks v7 (pulled in by eslint-config-next 16) adds
      // React Compiler advisory rules. Keep the previous lint baseline
      // (rules-of-hooks + exhaustive-deps) until existing components are
      // refactored for them.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/incompatible-library': 'off',
    },
  },
  {
    // Node verification scripts, not Next.js modules.
    files: ['scripts/**/*.mjs'],
    rules: {
      '@next/next/no-assign-module-variable': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'node_modules/**', 'next-env.d.ts', 'tmp/**']),
]);
