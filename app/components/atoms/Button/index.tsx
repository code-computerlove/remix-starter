import { Link } from '@remix-run/react';

import styles from './index.module.css';

// Use Button for semantic button or LinkButton for anchor

export enum ButtonVariant {
	Link = 'link',
	Black = 'black',
	White = 'white',
	Transparent = 'transparent',
}

type TButtonShared = React.PropsWithChildren<{
	variant?: ButtonVariant;
	className?: string;
}>;

export type TButton = React.ButtonHTMLAttributes<HTMLButtonElement> &
	TButtonShared;
export type TLinkButton = {
	to: string;
} & TButtonShared;

export const Button: React.FC<TButton> = ({
	variant = ButtonVariant.Black,
	children,
	type = 'button',
	className,
	...buttonAttributes
}) => (
	<button
		className={`${styles.button} ${styles[variant] || ''} ${className}`}
		{...buttonAttributes}
		type={type}
	>
		{children}
	</button>
);

export const LinkButton: React.FC<TLinkButton> = ({
	variant = ButtonVariant.Black,
	children,
	className,
	...linkAttributes
}) => (
	<Link
		{...linkAttributes}
		className={`${styles.button} ${styles[variant]} ${className}`}
	>
		{children}
	</Link>
);
