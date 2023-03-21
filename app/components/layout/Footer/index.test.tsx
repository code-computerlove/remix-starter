import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { checkA11y } from 'test/test-utils';
import { unstable_createRemixStub as createRemixStub } from '@remix-run/testing';
import { Footer } from '.';

describe('~/components/atoms/footer', () => {
	afterEach(() => {
		vi.clearAllMocks();
		cleanup();
	});

	test('passes accessibility checks', async () => {
		const { container } = setupTest();
		await checkA11y(container);
	});

	test('should render', async () => {
		setupTest();
		const btn = screen.getByTestId('footer');
		expect(btn).toBeTruthy();
	});
});

type TReturn = {
	container: HTMLElement;
	baseElement: HTMLElement;
};

const setupTest = (): TReturn => {
	// Make the stub
	const RemixStub = createRemixStub([
		{
			path: '/',
			element: <Footer />,
		},
	]);
	const utils = render(<RemixStub />);
	return {
		...utils,
	};
};
