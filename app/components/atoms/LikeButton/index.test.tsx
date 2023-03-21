import type { LikeButtonProps } from './';

import {
	render,
	waitFor,
	screen,
	fireEvent,
	cleanup,
} from '@testing-library/react';
import { useLoaderData } from '@remix-run/react';
import { unstable_createRemixStub as createRemixStub } from '@remix-run/testing';
import { LikeButton } from './';

// Example implementation of Ryan Florence's tests from https://github.com/remix-run/remix/discussions/2481
type TPost = {
	id: string;
	title: string;
	liked: boolean;
};

describe('LikeButton', () => {
	// set up a fake "database" record again
	const fakePost: TPost = { id: '123', title: 'Fake Post', liked: false };

	afterEach(() => {
		// reset the fake record
		fakePost.liked = false;
		cleanup();
	});

	it('renders an empty heart initially', async () => {
		setupTest(fakePost);

		// Make sure the button is rendered before running this test
		await waitFor(() => screen.getByRole('button'));

		expect(screen.getByRole('button').innerHTML).toMatch('♡');
		expect(screen.getByLabelText('Like Fake Post')).toBeDefined();
	});

	// In this test we no longer need to mock useFetcher return values, the test
	// also no longer has to know the implementation details of the spelling of
	// "liked" in the formData
	it('optimistically renders the heart', async () => {
		setupTest(fakePost);

		// Make sure the button is rendered before running this test
		await waitFor(() => screen.getByRole('button'));

		fireEvent.click(screen.getByRole('button'));

		// assert it's optimistic, our action will not have changed this yet
		expect(fakePost.liked).toBe(false);
		await waitFor(() => screen.getByText('♥'));

		// wait for the action
		await waitFor(() => fakePost.liked === true);

		// expect to still see the heart
		expect(screen.getByText('♥')).toBeDefined();
	});
});

type TestOverrides = {
	props?: Partial<LikeButtonProps>;
};

type TReturn = {
	props: LikeButtonProps;
	container: HTMLElement;
	baseElement: HTMLElement;
};

const getDefaultProps = (
	overrides: Partial<LikeButtonProps> = {}
): LikeButtonProps => ({
	liked: false,
	label: 'Like',
	action: '/like',
	...overrides,
});

const setupTest = (fakePost: TPost, overrides: TestOverrides = {}): TReturn => {
	const props = getDefaultProps(overrides.props);

	// Now we're testing the component how it's more likely to be used:
	const TestSubject = (): JSX.Element => {
		const post = useLoaderData();
		return (
			<LikeButton
				liked={post.liked}
				label={
					post.liked ? `Unlike ${post.title}` : `Like ${post.title}`
				}
				action={`/post/${post.id}/like`}
			/>
		);
	};

	// Make the stub
	const RemixStub = createRemixStub([
		{
			path: '/post/:postId',
			loader: () => fakePost,
			element: <TestSubject />,
		},
		{
			path: '/post/:postId/like',
			action: async ({ request }) => {
				const formData = await request.formData();
				fakePost.liked = JSON.parse(formData.get('liked') as string);
				return null;
			},
		},
	]);
	const utils = render(<RemixStub initialEntries={['/post/123']} />);
	return {
		...utils,
		props,
	};
};
