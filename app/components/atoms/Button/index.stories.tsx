import type { StoryFn, Meta } from '@storybook/react';

import { unstable_createRemixStub as createRemixStub } from '@remix-run/testing';
import { Button, ButtonVariant } from '.';

const story: Meta<typeof Button> = {
	title: 'atoms/Button',
	component: Button,
	decorators: [
		(Story) => {
			const RemixStub = createRemixStub([
				{
					path: '/',
					element: <Story />,
				},
			]);

			return <RemixStub />;
		},
	],
};

export default story;

const Template: StoryFn<typeof Button> = (args) => (
	<Button {...args}>Test Button</Button>
);

export const Link = Template.bind({});
Link.args = { variant: ButtonVariant.Link };
export const Black = Template.bind({});
Black.args = { variant: ButtonVariant.Black };
export const White = Template.bind({});
White.args = { variant: ButtonVariant.White };
