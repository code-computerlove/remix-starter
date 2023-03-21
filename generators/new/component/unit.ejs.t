---
to: "src/components/<%= type %>/<%= name %>/index.test.tsx"
---
import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import type { T<%= h.inflection.camelize(name) %> } from './';

import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { checkA11y } from 'test/test-utils';

import { <%= h.inflection.camelize(name) %> } from './';

describe('~/components/<%= type %>/<%= name %>', () => {
	afterEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	test('passes accessibility checks', async () => {
		const { container } = setupTest();
		await checkA11y(container);
	});

	test('should render', async () => {
		const { user, props } = setupTest({ props: { onClick: vi.fn() } });
		const button = screen.getByText('Button');
		expect(button).toBeTruthy();
		await user.click(button);
		expect(props.onClick).toHaveBeenCalledTimes(1);
	});
})

type TestOverrides = {
	props?: Partial<T<%= h.inflection.camelize(name) %>>;
};

type TReturn = {
	props: T<%= h.inflection.camelize(name) %>;
	user: UserEvent;
	container: HTMLElement;
	baseElement: HTMLElement;
};

const getDefaultProps = (overrides: Partial<T<%= h.inflection.camelize(name) %>> = {}): T<%= h.inflection.camelize(name) %> => ({
	...overrides,
});

const setupTest = (overrides: TestOverrides = {}): TReturn => {
	const props = getDefaultProps(overrides.props);
	const utils = render(
    	<<%= h.inflection.camelize(name) %> {...props}>{props.children ?? 'Component'}</<%= h.inflection.camelize(name) %>>
	);
	return {
		...utils,
		props,
		user: userEvent.setup(),
	};
};
