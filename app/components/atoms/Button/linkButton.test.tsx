import type { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { checkA11y } from 'test/test-utils';
import { unstable_createRemixStub as createRemixStub } from '@remix-run/testing';

import { LinkButton, TLinkButton } from './index';

describe('atoms/button(LinkButton)', () => {
	afterEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	test('passes accessibility checks', async () => {
		const { container } = setupTest();
		await checkA11y(container);
	});

	test('should render', () => {
		setupTest();
		const linkBtn = screen.getByText('Link Button');
		expect(linkBtn).toBeTruthy();
		expect(linkBtn.getAttribute('href')).toBe('/test');
	});
});

type TestOverrides = {
	props?: Partial<TLinkButton>;
};

type TReturn = {
	props: TLinkButton;
	user: UserEvent;
	container: HTMLElement;
	baseElement: HTMLElement;
};

const getDefaultProps = (
	overrides: Partial<TLinkButton> = {}
): TLinkButton => ({
	to: '/test',
	...overrides,
});

const setupTest = (overrides: TestOverrides = {}): TReturn => {
	const props = getDefaultProps(overrides.props);
	// Make the stub
	const RemixStub = createRemixStub([
		{
			path: '/',
			element: (
				<LinkButton {...props}>
					{props.children ?? 'Link Button'}
				</LinkButton>
			),
		},
	]);
	const utils = render(<RemixStub />);
	return {
		...utils,
		props,
		user: userEvent.setup(),
	};
};
