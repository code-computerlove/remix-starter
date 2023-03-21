module.exports = {
	plugins: {
		'postcss-preset-env': {
			autoprefixer: {
				flexbox: 'no-2009',
			},
			stage: 3,
			features: {
				'custom-properties': false,
				'nesting-rules': true,
			},
		},
		// TODO: use HTML dir instead in the future to auto-detect and adjust this
		// Ideally drop support for things like iOS 14 and remove this altogether!
		'postcss-logical': { dir: 'ltr' },
	},
};
