# Contributing to DE5.org

Thanks for your interest in contributing to DE5.org! This guide will help you get started.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/de5-dot-org.git
   cd de5-dot-org
   ```
3. **Set up** your development environment -- see [README.md](README.md#getting-started) for prerequisites and setup instructions
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Branch Naming

Use descriptive branch names with a prefix:

- `feature/` -- New features or content (e.g., `feature/add-turbo-faq`)
- `fix/` -- Bug fixes (e.g., `fix/broken-search-link`)
- `docs/` -- Documentation changes (e.g., `docs/update-install-steps`)

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/). All commit messages must follow this format:

```
type(scope): description
```

### Types

| Type       | When to Use                        |
| ---------- | ---------------------------------- |
| `feat`     | New feature or content             |
| `fix`      | Bug fix                            |
| `docs`     | Documentation only                 |
| `style`    | Formatting, no code change         |
| `refactor` | Code change, no new feature or fix |
| `perf`     | Performance improvement            |
| `test`     | Adding or updating tests           |
| `chore`    | Build, config, or tooling changes  |

### Examples

```
feat(content): add turbo kit comparison FAQ
fix(search): correct ranking for exact matches
docs(readme): update setup instructions
chore(deps): update nuxt to 4.4.0
```

Commit messages are enforced by [commitlint](https://commitlint.js.org/) via a Git hook.

## Pull Request Process

1. Make sure your branch is up to date with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. Run checks before pushing:
   ```bash
   yarn check
   ```
3. Push your branch and create a pull request against `main`
4. Fill out the PR template -- describe your changes and link related issues
5. CI must pass (lint, format check, typecheck)
6. Wait for review

## Template Language

This project uses [Pug](https://pugjs.org/) for Vue templates instead of HTML. If you are unfamiliar with Pug, check out the [Pug language reference](https://pugjs.org/api/getting-started.html). The syntax is whitespace-based and more concise than HTML.

Example:

```pug
template(lang="pug")
  div.container
    h1 Page Title
    p Some content here
```

## Code Style

Code style is handled automatically:

- **ESLint** checks for code quality issues
- **Prettier** handles formatting
- **lint-staged** runs both on staged files before each commit

To manually fix issues:

```bash
# Fix lint issues
yarn lint:fix

# Format code
yarn format
```

## Reporting Issues

Use the GitHub issue templates:

- **Bug Report** -- for broken functionality or unexpected behavior
- **Feature Request** -- for new ideas or improvements

## License

By contributing to DE5.org, you agree that your contributions will be licensed under the [GPL-3.0 License](LICENSE).
