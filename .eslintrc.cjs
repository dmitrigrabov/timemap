module.exports = {
  extends: "@dmitrigrabov/eslint-config",
  ignorePatterns:['node_modules/**', 'dist/**', 'build/**'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  }
}
