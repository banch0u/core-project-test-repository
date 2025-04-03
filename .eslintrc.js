// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false, // allow JSX parsing without separate babel config
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'import', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': ['error', {
      packageDir: [__dirname], // important in monorepos or nested packages
    }],
    'react/react-in-jsx-scope': 'off', // not needed with React 17+
    'react/prop-types': 'off',
    'no-undef': 'error',
    'react/display-name': 'off'
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'], // Add any others you use
      },
    },
  },

};
