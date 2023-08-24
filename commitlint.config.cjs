module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feature', 'bugfix', 'hotfix', 'N/A']],
    'subject-case': [0],
    'type-case': [4]
  }
};
