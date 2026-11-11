# AGENTS.md file

## Node.js Runtime

This project runs on [Node.js](https://nodejs.org) (>=16). Make sure you have Node.js installed before working with the codebase. [Bun](https://bun.sh) (>=1.1) is also supported as an alternative runtime.

The client is written as ES modules in `js/` and bundled by [Rollup](https://rollupjs.org) into `dist/` (`headless.cjs`, `headless.esm.js` and `headless.umd.js`, for Node.js, bundlers and browsers), using the following command:

```bash
npm run build
```

## Formatting

Always format the code before committing using, making sure that the JavaScript code is properly formatted using:

```bash
npm run pretty
```

The formatting rules are defined in `.prettierrc.cjs` (via `prettier-config-hive`) and `.eslintrc.cjs` (via `eslint-config-hive`), with `types/.eslintrc.cjs` (via `typescript-eslint`) for the TypeScript declarations.

## Testing

To run the suite of tests for Headless API use the following command:

```bash
npm run build && npm test
```

Try to run the tests whenever making changes to the codebase, before committing new code.

The tests ([Mocha](https://mochajs.org)) live in `test/` as CommonJS files (eg: `test/api/base.cjs` for the `API` of `js/base.js`, its methods in their order of declaration), and require the package built in `dist/`, so run `npm run build` before them. They record the requests of the `API` instead of reaching a Headless server, so they require no network access.

## Style Guide

- Always update `CHANGELOG.md` according to semantic versioning, mentioning your changes in the unreleased section.
- Write commit messages using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Never bump the internal package version in `package.json`. This is handled automatically by the release process.
- JavaScript, TypeScript, JSON and YAML files use CRLF as the line ending, Markdown files use LF.
- The implementation should be done in JavaScript (ES modules) compatible with the Node.js versions (16 to 26) and the Bun versions (1.1 to 1.4) tested by the CI, and with the browsers (through the UMD build).
- The style should respect the `prettier` and `eslint` formatting rules defined in the project configuration.
- The implementation should be done in a way that is compatible with the existing codebase.
- Dependencies should be managed through `package.json`.
- Every method of the `API` (`js/base.js`) is declared in `types/base.d.ts` (with its options in `APIOptions`) and documented in the Usage section of `README.md`, keep them in sync with the code and with the routes and parameters of [Headless](https://github.com/hivesolutions/headless#usage), as clients and agents use the client from them.

## Commit Messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) with the following structure:

```text
<type>: <description>

<body>
```

### Commit Types

| Type       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature or functionality                          |
| `fix`      | A bug fix                                               |
| `docs`     | Documentation only changes                              |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `chore`    | Maintenance tasks, dependency updates, build changes    |
| `test`     | Adding or updating tests                                |
| `version`  | Version bump commits (reserved for releases)            |

### Guidelines

- Use lowercase for the type prefix.
- Use imperative mood in the description (e.g., "Add feature" not "Added feature").
- Keep the first line under 50 characters.
- Reference issue/PR numbers when applicable using `(#123)` at the end.
- For version releases, use the format `version: X.Y.Z`.
- Add an extra newline between subject and body.
- Make the body a series of bullet points about the commit.
- Be descriptive always making use of the body of the message.

### Examples

```text
feat: Add user authentication with OAuth 2.0 support (#138)
fix: Resolve race condition in database connection pool
docs: Add API endpoint documentation for v2 routes
refactor: Extract validation logic into reusable utility module
chore: Update dependencies to latest stable versions
test: Add integration tests for payment processing flow
version: 1.8.0
```

## Pre-Commit Checklist

Before committing, ensure that the following operations items check:

- [ ] Code is formatted with `npm run pretty`
- [ ] Tests pass: `npm run build && npm test`
- [ ] CHANGELOG.md is updated in [Unreleased] section
- [ ] types/base.d.ts and README.md cover any new or changed method and option
- [ ] No debugging print statements or commented-out code
- [ ] CRLF line endings are preserved

## New Release

To create a new release follow the following steps:

- Make sure that both the tests pass and the code formatting are valid.
- Increment (look at `CHANGELOG.md` for semver changes) the `version` value in `package.json`.
- Move all the `CHANGELOG.md` Unreleased items that have at least one non empty item into a new section with the new version number and date, and then create new empty sub-sections (Added, Changed and Fixed) for the Unreleased section with a single empty item.
- Create a commit with the following message `version: $VERSION_NUMBER`.
- Push the commit.
- Create a new tag with the value of the new version number `$VERSION_NUMBER`.
- Pushing the tag builds the package and publishes it to npm as `headless-api-js` (Deploy Workflow).
- Create a new release on the GitHub repo using the Markdown from the corresponding version entry in `CHANGELOG.md` as the description of the release and the version number as the title. Do not include the title of the release (version and date) in the description.

## License

Headless API is licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/).
