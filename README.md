# Proto Plugins

A web application for browsing and discovering Proto plugins. Proto is a language-agnostic package manager and plugin system that enables developers to easily install, manage, and use development tools across different projects and environments.

## Tech Stack

- **Frontend**: React 19 with React Router v7
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Linting**: Biome

## Prerequisites

Before setting up the project locally, ensure you have the following installed:

- **Node.js**: Version 24.14.0 or later
- **pnpm**: Version 10.32.1 or later

> **Tip**: This project uses [`proto`](https://moonrepo.dev/proto) to specify exact versions. Run `proto use` to automatically set up the correct versions.

## Local Development

### 1. Clone the Repository

```bash
git clone <repository-url>
cd proto-plugins
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

The application requires an environment variable to specify the base URL for fetching plugin data from a CDN:

#### Using raw.githack.com as CDN

1. Go to <https://raw.githack.com/>
2. Enter the GitHub file URL (`https://github.com/moonrepo/proto/blob/master/registry/data/third-party.json`)
3. Get the generated production URL
4. Truncate the URL to end at the `registry` directory

```bash
# Create a .env file in the root directory
echo "VITE_URL_BASE=https://rawcdn.githack.com/moonrepo/proto/[commit-hash]/registry" > .env
```

### 4. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

### 5. Type Checking and Linting

```bash
# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Run linting with auto-fix
pnpm lint-and-fix
```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run Biome linting
- `pnpm lint-and-fix` - Run Biome linting with auto-fix
- `pnpm updateSchema` - Regenerate TypeScript types from JSON schema

## Project Structure

```text
src/
├── app/
│   ├── routes/          # React Router routes
│   ├── root.tsx         # Root component
│   └── app.css          # Global styles
├── components/
│   ├── plugin/          # Plugin-related components
│   └── ui/              # Reusable UI components
├── types/
│   └── protoRegistry.ts # TypeScript types for plugin registry
└── lib/
    └── utils.ts         # Utility functions
```

## Plugin Data

The application loads plugin data from a JSON registry file. The schema for this data is defined in `src/types/protoRegistry.ts`. To update the schema:

1. Modify the source JSON schema file
2. Run `pnpm updateSchema` to regenerate TypeScript types

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`pnpm typecheck && pnpm lint`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Related Links

- [Proto Documentation](https://moonrepo.dev/docs/proto)
- [Proto Plugin Development](https://moonrepo.dev/docs/guides/wasm-plugins)
- [React Router v7](https://reactrouter.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
