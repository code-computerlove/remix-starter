import type { LinksFunction, MetaFunction } from '@remix-run/node';

import { cssBundleHref } from '@remix-run/css-bundle';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
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

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Remix Starter',
	viewport: 'width=device-width,initial-scale=1',
});

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

export const CatchBoundary: React.FC = () => {
	const caught = useCatch();

	return (
		<html lang="en">
			<head>
				<title>Oops!</title>
				<Meta />
				<Links />
			</head>
			<body>
				<Header />
				<main id="main" className="main">
					<h1 className="visually-hidden">{caught.status} error</h1>
					<h2>Whoops, looks like that page doesn't exist!</h2>
					<p>
						Why not check out of our case studies, or return to the
						homepage.
					</p>
					<div className={styles404.container}>
						<LinkButton to="/" variant={ButtonVariant.Transparent}>
							Return to homepage
						</LinkButton>
					</div>
				</main>
				<Footer />
				<Scripts />
			</body>
		</html>
	);
};
