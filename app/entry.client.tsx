import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

const hydrate = (): void => {
	startTransition(() => {
		hydrateRoot(
			document,
			<StrictMode>
				<RemixBrowser />
			</StrictMode>
		);
	});
};

document
	.querySelectorAll(
		'html > script, html > input, html > loom-container, html > grammarly-desktop-integration'
	)
	.forEach((s) => {
		s.parentNode?.removeChild(s);
	});

if (window.requestIdleCallback) {
	window.requestIdleCallback(hydrate);
} else {
	// Safari doesn't support requestIdleCallback
	// https://caniuse.com/requestidlecallback
	window.setTimeout(hydrate, 1);
}
