# DE5.org

**Community knowledge hub for Acura Integra Type S (DE5) owners.**

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node: 22+](https://img.shields.io/badge/Node-22%2B-green.svg)](https://nodejs.org/)

## About

DE5.org is a community-driven resource for Acura Integra Type S (DE5) owners. The goal is to collect and organize the scattered knowledge from forums, Facebook groups, and enthusiast communities into a single, searchable, well-structured site.

This is a static site built with Nuxt and powered by Markdown content -- easy to contribute to, fast to load, and free to host.

## Tech Stack

| Technology                                                       | Purpose                              |
| ---------------------------------------------------------------- | ------------------------------------ |
| [Nuxt 4](https://nuxt.com/)                                      | Vue-based framework with SSG support |
| [Nuxt Content v3](https://content.nuxt.com/)                     | Markdown/YAML content management     |
| [@nuxtjs/seo](https://nuxtseo.com/)                              | SEO, sitemap, robots.txt, OG images  |
| [TypeScript](https://www.typescriptlang.org/)                    | Type safety                          |
| [Pug](https://pugjs.org/)                                        | Template language                    |
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | Code quality and formatting          |

## Getting Started

### Prerequisites

- [Node.js 22+](https://nodejs.org/) (see `.nvmrc`)
- [Yarn](https://yarnpkg.com/) package manager

### Setup

```bash
# Clone the repository
git clone https://github.com/richgurney/de5-dot-org.git
cd de5-dot-org

# Use correct Node version
nvm use

# Install dependencies
yarn install

# Copy environment file
cp .env.example .env

# Start development server
yarn dev
```

The dev server runs at `http://localhost:3000`.

### Build

```bash
# Build for production (SSR)
yarn build

# Generate static site
yarn generate

# Preview production build
yarn preview
```

## Configuration

Copy `.env.example` to `.env` and update values:

```bash
# Site URL used for SEO, sitemap, and canonical URLs
NUXT_PUBLIC_SITE_URL=https://de5.org
```

## Scripts

| Script              | Description                         |
| ------------------- | ----------------------------------- |
| `yarn dev`          | Start development server            |
| `yarn build`        | Build for production                |
| `yarn generate`     | Generate static site                |
| `yarn preview`      | Preview production build            |
| `yarn lint`         | Run ESLint                          |
| `yarn lint:fix`     | Run ESLint with auto-fix            |
| `yarn format`       | Format code with Prettier           |
| `yarn format:check` | Check formatting without changes    |
| `yarn typecheck`    | Run TypeScript type checking        |
| `yarn check`        | Run lint + format check + typecheck |
| `yarn clean`        | Remove build artifacts              |
| `yarn changelog`    | Generate changelog from commits     |

## Roadmap

Project planning and roadmap are tracked in the [`.planning/`](.planning/) directory.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get started.

## Built with Claude Code

This project is built with [Claude Code](https://github.com/anthropics/claude-code), using the [GSD (Get Shit Done)](https://github.com/glittercowboy/get-shit-done) planning and execution workflow. Planning documents, phase execution, and code generation are assisted by Claude.

## License

This project is licensed under the **GNU General Public License v3.0** (GPL-3.0).

This means you are free to use, modify, and distribute this project, but any derivative work must also be released under the GPL-3.0 license. See the [LICENSE](LICENSE) file for the full license text.
