import type { StorybookConfig } from '@storybook/react-vite';

// Note that there are some awesome examples of using Storybook with Remix here:
// https://github.com/mcansh/stubbbbbs/blob/main/stories/like-button.stories.tsx
// https://github.com/jrestall/remix-stubs/blob/main/apps/stubs-example/app/components/LikeButton.test.tsx
// https://github.com/remix-run/remix/blob/dev/packages/remix-testing/__tests__/stub-test.tsx

const config: StorybookConfig = {
	stories: [
		'../app/components/**/*.stories.mdx',
		'../app/components/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	core: {
		builder: '@storybook/builder-vite',
	},
	async viteFinal(config, options) {
		// Due to the deep imports vite will double import/bundle the RemixEntry component without this.
		config.resolve = {
			alias: {
				// prettier-ignore
				'@remix-run/react/dist/components': '@remix-run/react/dist/esm/components',
			},
		};
		return config;
	},
	framework: '@storybook/react-vite',
};

export default config;
