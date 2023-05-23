module.exports = {
  extends: "@dmitrigrabov/eslint-config",
  ignorePatterns:['node_modules/**', 'dist/**', 'build/**', 'vite.config.js', '.eslintrc.cjs'],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  }
}
