module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['Feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert']],
    'subject-case': [0],
    'type-case': [2, 'always', ['pascal-case', 'upper-case']],
  },
};
