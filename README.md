# Remix Starter for Code Computerlove

![The Remix Code Stack](https://repository-images.githubusercontent.com/465928257/a241fa49-bd4d-485a-a2a5-5cb8e4ee0abf)

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix@latest --template codecomputerlove/remix-starter
```

## What's in the stack

-   Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
-   End-to-end testing with [Cypress](https://cypress.io)
-   Local third party request mocking with [MSW](https://mswjs.io)
-   Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
-   Code formatting with [Prettier](https://prettier.io)
-   Linting with [ESLint](https://eslint.org)
-   Static Types with [TypeScript](https://typescriptlang.org)
-   Component viewing and testing with [Storybook](https://storybook.js.org/)

## Development

-   This step only applies if you've opted out of having the CLI install dependencies for you:

    ```sh
    npx remix init
    ```

-   Initial setup: _If you just generated this project, this step has been done for you._

    ```sh
    npm run setup
    ```

-   Start dev server:

    ```sh
    npm run dev
    ```

This starts your app in development mode, rebuilding assets on file changes.

### Relevant code:

This is a pretty simple app, but it's a good example of how you can build a full stack app with Remix.

-   the default shell of your app [./app/root.tsx/](./app/root.tsx)
-   the default homepage [./app/routes/\_index.tsx](./app/routes/_index.tsx)

## Testing

### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

We have a utility for testing authenticated features without having to go through the login flow:

```ts
cy.login();
// you are now logged in as a new user
```

We also have a utility to auto-delete the user at the end of your test. Just make sure to add this in each test file:

```ts
afterEach(() => {
	cy.cleanupUser();
});
```

That way, we can keep your local db clean and keep your tests isolated from one another.

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

## Storybook

Note that there are some awesome examples of using Storybook with Remix here:
https://github.com/mcansh/stubbbbbs/blob/main/stories/like-button.stories.tsx

It used to be more of an issue with being able to Stub Remix:
https://github.com/remix-run/remix/discussions/2481

Read about Storybook 7 here:
https://chromatic-ui.notion.site/Storybook-7-migration-guide-dbf41fa347304eb2a5e9c69b34503937

And the new way to write Stries:
https://storybook.js.org/blog/storybook-csf3-is-here/

## Vitest

And some really great examples of using Vitest with Remix here:
https://github.com/jrestall/remix-stubs/blob/main/apps/stubs-example/app/components/LikeButton.test.tsx
https://github.com/remix-run/remix/blob/dev/packages/remix-testing/__tests__/stub-test.tsx
