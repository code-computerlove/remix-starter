import { expect } from 'vitest';
import { axe } from 'vitest-axe';
import * as matchers from 'vitest-axe/matchers';
expect.extend(matchers);

// re-export everything
export * from '@testing-library/react';

export const checkA11y = async (
	component: string | Element,
	axeOptions = {}
): Promise<void> => {
	const results = await axe(component, axeOptions);

	expect(results).toHaveNoViolations();
};
