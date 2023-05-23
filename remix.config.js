/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	cacheDirectory: './node_modules/.cache/remix',
	ignoredRouteFiles: ['**/.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],
	future: {
		v2_routeConvention: true,
		v2_errorBoundary: true,
		v2_meta: true,
		v2_normalizeFormMethod: true,
	},
	serverDependenciesToBundle: [],
	serverModuleFormat: 'cjs',
	postcss: true,
};
