jest = require('jest');
module.exports = {
    preset: 'js-jest',
    testEnvironment: 'node',
    testMatch: ["**/tests/**/*.test.js"],
    verbose: true,
    forceExit: true,

}