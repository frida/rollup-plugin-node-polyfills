
export default {
	input: 'dist-transpiled/index.js',
	external: [
		'path',
		'crypto',
		'@rollup/plugin-inject'
	],
	output: [
		{
			format: 'es',
			file: 'dist/index.mjs',
			generatedCode: {
				constBindings: true,
			},
		},
		{
			format: 'cjs',
			file: 'dist/index.js',
			exports: 'default',
			generatedCode: {
				constBindings: true,
			},
		}
	]
};
