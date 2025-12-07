# Agent Guidelines for coffee-store

## Build/Lint/Test Commands
- **Dev**: `npm run dev` (starts Next.js dev server)
- **Build**: `npm run build` (production build)
- **Lint**: `npm run lint` (ESLint with Next.js config)
- **No test suite configured yet**

## Code Style

### Imports
- Use `@/` path alias for imports (e.g., `import { foo } from "@/app/utils"`)
- Type imports use `import type { ... }` syntax (see app/layout.tsx:1)

### TypeScript
- **Strict mode enabled** - all TypeScript strict checks are on
- Always type component props with `Readonly<{...}>` for React components (see app/layout.tsx:22)
- Use proper Next.js types: `Metadata`, `NextConfig`, etc.

### Formatting & Naming
- Use double quotes for strings
- 2-space indentation
- Function components use `export default function ComponentName()`
- React Server Components by default (no "use client" unless needed)

### Error Handling
- No specific error handling patterns established yet - follow Next.js best practices
