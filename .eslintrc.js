module.exports = {
    root: true,
    env: {
      node: true,
      es6: true,
    },
    parserOptions: {
      ecmaVersion: 2021,
    },
    extends: ['eslint:recommended'],
    rules: {
      // Indentation
      'indent': ['error', 2],
  
      // Semicolons
      'semi': ['error', 'always'],
  
      // Quotes
      'quotes': ['error', 'single'],
  
      // Variable Declaration
      'no-var': 'error',
  
      // Unused Variables
      'no-unused-vars': 'warn',
  
      // Function Parameters
      'space-before-function-paren': ['error', 'never'],
  
      // Arrow Functions
      'prefer-arrow-callback': 'error',
  
      // Object Literal Shorthand
      'object-shorthand': 'error',
  
      // Destructuring
      'prefer-destructuring': ['error', { 'object': true, 'array': true }],
  
      // Consistent Return
      'consistent-return': 'error',
  
      // Block Scoping
      'block-scoped-var': 'error',
  
      // String Concatenation
      'prefer-template': 'error',
    },
  };