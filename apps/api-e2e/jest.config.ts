/* eslint-disable */
export default {
    displayName: 'api-e2e',
    preset: '../../jest.preset.js',
    globalSetup: '<rootDir>/src/support/global-setup.ts',
    globalTeardown: '<rootDir>/src/support/global-teardown.ts',
    setupFiles: ['<rootDir>/src/support/test-setup.ts'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': [
            '@swc/jest',
            {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        decorators: true,
                    },
                    transform: {
                        legacyDecorator: true,
                        decoratorMetadata: true,
                    },
                    target: 'es2022',
                },
                module: {
                    type: 'commonjs',
                },
                sourceMaps: 'inline',
            },
        ],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/api-e2e',
};
