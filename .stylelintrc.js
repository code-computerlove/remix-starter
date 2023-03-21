module.exports = {
	extends: ['stylelint-config-standard'],
	plugins: ['stylelint-order'],
	rules: {
		'block-no-empty': true,
		'color-no-invalid-hex': true,
		'declaration-block-no-duplicate-properties': true,
		'declaration-block-no-redundant-longhand-properties': true,
		'declaration-block-no-shorthand-property-overrides': true,
		'declaration-no-important': true,
		'length-zero-no-unit': true,
		'max-nesting-depth': 4,
		'no-duplicate-selectors': true,
		'order/properties-alphabetical-order': true,
		'property-no-unknown': true,
	},
	ignoreFiles: ['app/styles/*.css', 'public/build/**/*.css'],
};
