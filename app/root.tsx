import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';

import { cssBundleHref } from '@remix-run/css-bundle';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
	isRouteErrorResponse,
} from '@remix-run/react';

import { ButtonVariant, LinkButton } from '~/components/atoms/Button';
import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer';

import styles from './styles/globals.css';
import styles404 from '~/routes/404/index.module.css';

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: styles },
		...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
	];
};

export const meta: V2_MetaFunction = () => [
	{ name: 'charset', value: 'utf-8' },
	{ title: 'Remix Starter' },
	{ name: 'viewport', value: 'width=device-width,initial-scale=1' },
];

const App: React.FC = () => {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Header />
				<main id="main" className="main">
					<Outlet />
				</main>
				<Footer />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
};

export default App;

export const ErrorBoundary: React.FC = () => {
	const error = useRouteError();
	// Don't forget to typecheck with your own logic.
	// Any value can be thrown, not just errors!
	let errorMessage = 'Unknown error';
	if (typeof error === 'string') {
		errorMessage = error;
	}
	return (
		<html lang="en">
			<head>
				<title>Oops!</title>
				<Meta />
				<Links />
			</head>
			<body>
				<Header />
				{isRouteErrorResponse(error) ? (
					<main id="main" className="main">
						<h1 className="visually-hidden">500 error</h1>
						<h2>
							Whoops, looks like there was a problem loading that
							page
						</h2>
						<p>Why not return to the homepage?</p>
						<div className={styles404.container}>
							<LinkButton
								to="/"
								variant={ButtonVariant.Transparent}
							>
								Return to homepage
							</LinkButton>
						</div>
					</main>
				) : (
					<main id="main" className="main">
						<h1 className="visually-hidden">{errorMessage}</h1>
						<h2>Whoops, looks like that page doesn't exist!</h2>
						<p>
							Why not check out of our case studies, or return to
							the homepage.
						</p>
						<div className={styles404.container}>
							<LinkButton
								to="/"
								variant={ButtonVariant.Transparent}
							>
								Return to homepage
							</LinkButton>
						</div>
					</main>
				)}
				<Footer />
				<Scripts />
			</body>
		</html>
	);
};
