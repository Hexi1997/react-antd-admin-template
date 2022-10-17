module.exports = {
  plugins: ['simple-import-sort'],
  extends: ['@white-matrix/eslint-config'],
  parserOptions: {
    project: require.resolve('./tsconfig.json')
  },
  rules: {
    'unicorn/filename-case': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-void': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'off',
    'react/react-in-jsx-scope': 'off',
    'eslint-comments/no-unused-disable': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['off', 'type'],
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'node/no-extraneous-import': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/unbound-method': 'off'
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    BASE_URL: true,
    GITHUB_CLIENT_ID: true
  }
};
