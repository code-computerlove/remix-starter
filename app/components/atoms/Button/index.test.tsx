import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import type { TButton } from './index';

import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { checkA11y } from 'test/test-utils';
import { unstable_createRemixStub as createRemixStub } from '@remix-run/testing';

import { Button } from './index';

describe('atoms/button', () => {
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
});

type TestOverrides = {
	props?: Partial<TButton>;
};

type TReturn = {
	props: TButton;
	user: UserEvent;
	container: HTMLElement;
	baseElement: HTMLElement;
};

const getDefaultProps = (overrides: Partial<TButton> = {}): TButton => ({
	...overrides,
});

const setupTest = (overrides: TestOverrides = {}): TReturn => {
	const props = getDefaultProps(overrides.props);
	// Make the stub
	const RemixStub = createRemixStub([
		{
			path: '/',
			element: <Button {...props}>{props.children ?? 'Button'}</Button>,
		},
	]);
	const utils = render(<RemixStub />);
	return {
		...utils,
		props,
		user: userEvent.setup(),
	};
};
