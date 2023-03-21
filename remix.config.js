/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	cacheDirectory: './node_modules/.cache/remix',
	ignoredRouteFiles: ['**/.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],
	future: {
		unstable_cssModules: true,
		v2_routeConvention: true,
	},
	serverDependenciesToBundle: [],
};
