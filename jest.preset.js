const nxPreset = require('@nx/jest/preset').default;

module.exports = {
	...nxPreset,
	transform: {
		'^.+\\.(ts|js|mts|mjs|cts|cjs|html)$': [
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
};
