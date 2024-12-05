// eslint.config.js
const reactPlugin = require('eslint-plugin-react');

module.exports = [
  {
    files: ['**/*.{js,jsx}'],  // Aplica a todos los archivos JS y JSX
    languageOptions: {
      parser: require('@babel/eslint-parser'),  // Usar el parser correcto para Babel
      parserOptions: {
        ecmaVersion: 2020,  // Especifica la versión de ECMAScript
        sourceType: 'module',  // Habilita el uso de módulos ES
      },
    },
    plugins: {
      react: reactPlugin,  // Cargar el plugin de React
    },
    rules: {
      'react/prop-types': 'off',  // Desactivar la regla de prop-types de React
      semi: ['error', 'always'],  // Requerir punto y coma
    },
  },
  {
    files: ['**/*.jsx'],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/prop-types': 'off',  // Desactivar la regla de prop-types de React
    },
  },
];
