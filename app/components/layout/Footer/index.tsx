import { Link } from '@remix-run/react';

import styles from './index.module.css';

export type TFooter = React.FC;

export const Footer: TFooter = () => {
	return (
		<footer data-testid="footer" className={styles.container}>
			<Link to="/" aria-label="Test Homepage" id="footer-content">
				Home
			</Link>
			<p>
				&copy; Copyright {new Date().getFullYear()} Test Site Limited.{' '}
				<br /> All Rights Reserved.
			</p>
		</footer>
	);
};
