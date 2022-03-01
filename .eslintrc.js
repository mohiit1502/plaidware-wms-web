module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  // plugins: ['react'],
  rules: {
    // general
    indent: ['warn', 2, { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'no-unused-vars' : 'warn',
    'comma-dangle': [
      'warn',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'ignore'
      }
    ],
    'object-curly-spacing': 'off',
    'eol-last': ['warn', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    complexity: ['error', { max: 20 }],
    eqeqeq: ['warn', 'always'],
    // react
    'react/no-unescaped-entities': ['error', { forbid: ['>', '"', '}'] }],
    'react/prop-types': [2, { ignore: ['action', 'dispatch', 'nav', 'navigation'] }],
    'react/jsx-boolean-value': 2,
    'react/jsx-no-undef': 2,
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], //should add ".ts" if typescript project
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        noSortAlphabetically: true
      }
    ],
    'react/jsx-pascal-case': 2,
    'react/display-name': [0, { ignoreTranspilerName: false }]
  },
  // Map from global var to bool specifying if it can be redefined
  globals: {
    __DEV__: true,
    __dirname: false,
    __fbBatchedBridgeConfig: false,
    alert: false,
    cancelAnimationFrame: false,
    cancelIdleCallback: false,
    clearImmediate: true,
    clearInterval: false,
    clearTimeout: false,
    console: false,
    document: false,
    escape: false,
    Event: false,
    EventTarget: false,
    exports: false,
    fetch: false,
    FormData: false,
    global: false,
    Map: true,
    module: false,
    navigator: false,
    process: false,
    Promise: true,
    requestAnimationFrame: true,
    requestIdleCallback: true,
    require: false,
    Set: true,
    setImmediate: true,
    setInterval: false,
    setTimeout: false,
    window: false,
    XMLHttpRequest: false
  },
  settings: {
    react: {
      version: require('./package.json').dependencies.react
    }
  }
};
