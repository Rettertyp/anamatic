/* eslint-disable */
export default {
    displayName: 'util',
    preset: '../../jest.preset.js',
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
    coverageDirectory: '../../coverage/libs/util',
};
