# MacOS Playground

A React + Vite web application that recreates the macOS desktop experience in the browser. This project features a beautiful, interactive interface with desktop components, applications, and system UI elements.

## Features

- **Desktop Interface** - Full macOS-like desktop experience
- **Spotlight Search** - Quick search/command palette
- **Launchpad** - App grid launcher
- **Dock** - Application dock with icons
- **Window Management** - Draggable windows and app system
- **Markdown Editor** - Built-in markdown editor with Milkdown
- **Boot Screen** - Animated boot/startup sequence
- **Login Page** - Custom authentication interface
- **Animations** - Smooth animations with Framer Motion

## Tech Stack

- **React** 18.3.1 - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe development
- **Milkdown** - Markdown editor (v7.3.6)
- **Framer Motion** 11.1.7 - Animation library
- **UnoCSS** - Atomic CSS framework
- **KaTeX** 0.16.10 - Math equation rendering
- **Date-fns** 3.6.0 - Date utilities

## Project Structure

```
src/
├── pages/              # Main pages (Boot, Desktop, Login)
├── components/         # UI components
│   ├── apps/          # Application components
│   ├── dock/          # Dock navigation
│   ├── menus/         # System menus
│   └── ...            # Other components
├── configs/           # Configuration files
├── hooks/             # Custom React hooks
├── stores/            # State management
├── styles/            # Global styles
├── types/             # TypeScript types
├── utils/             # Utility functions
└── Context.tsx        # React Context setup
```

## Getting Started

### Prerequisites

- Node.js 16+ or pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm serve

# Run linting
pnpm lint
```

The development server runs on `http://localhost:5173` by default.

## Development

### Available Scripts

- `pnpm dev` - Start dev server with hot module replacement
- `pnpm build` - Build for production
- `pnpm serve` - Preview production build locally
- `pnpm lint` - Run ESLint with auto-fix
- `pnpm prepare` - Setup Husky for git hooks

### Code Quality

- **ESLint** - Linting configuration in `eslint.config.js`
- **Prettier** - Code formatting with Renovamen's config
- **Husky** - Git hooks for lint-staged
- **Lint-staged** - Run linters on staged files

### Auto-imports

The project uses `unplugin-auto-import` for automatic imports:
- React hooks and components auto-imported
- Custom hooks from `src/hooks` auto-imported
- Stores and components auto-imported

## Configuration Files

- `vite.config.ts` - Vite configuration with plugins
- `tsconfig.json` - TypeScript configuration
- `unocss.config.ts` - UnoCSS atomic CSS configuration
- `eslint.config.js` - ESLint rules
- `pnpm-lock.yaml` - Dependency lock file

## Assets

- `public/img/` - Images and icons
- `public/logo/` - Logo files
- `public/markdown/` - Markdown documentation
- `public/manifest.json` - PWA manifest

## Browser Support

Works on all modern browsers that support ES2020+.

## License

Check LICENSE file for details.

---

**Note:** This is a playground/showcase project demonstrating advanced React patterns and interactive UI design.
