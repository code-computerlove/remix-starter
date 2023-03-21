import { Link } from '@remix-run/react';
import { clsx } from 'clsx';

import styles from './index.module.css';

const Header: React.FC = () => {
	return (
		<header className={styles.container}>
			<div className={clsx(styles.navigationWrapper, 'wrapper')}>
				<Link to="/">Homepage</Link>
			</div>
		</header>
	);
};

export { Header };
