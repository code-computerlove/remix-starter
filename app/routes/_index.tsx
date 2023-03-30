import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

import { LinkButton, ButtonVariant } from '~/components/atoms/Button';

type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

export const loader = async () => {
	try {
		const data = await fetch('https://jsonplaceholder.typicode.com/posts');
		const posts: Post[] = await data.json();
		return json(posts);
	} catch (e) {
		throw new Error('Unable to access API');
	}
};

export const HomePage: React.FC = () => {
	const posts = useLoaderData<typeof loader>();
	return (
		<>
			<LinkButton variant={ButtonVariant.Black} to="/about">
				About
			</LinkButton>
			{posts.map((item) => (
				<div key={item.id}>
					<h2>{item.title}</h2>
					<p>{item.body}</p>
				</div>
			))}
		</>
	);
};

export default HomePage;
