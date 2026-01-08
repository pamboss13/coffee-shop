# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 coffee shop application with Prisma ORM using SQLite. Features an admin panel for product management and a customer-facing storefront.

## Development Commands

```bash
# Development
npm run dev                 # Start Next.js dev server (http://localhost:3000)
npm run build              # Production build
npm start                  # Start production server
npm run lint               # Run ESLint

# Database (Prisma + SQLite)
npm run db:migrate         # Run migrations (creates dev.db in project root)
npm run db:push            # Push schema changes without migrations
npm run db:seed            # Seed database with initial data
npm run db:studio          # Open Prisma Studio for database management
npm run db:generate        # Generate Prisma Client
npm run db:reset           # Reset database and run migrations
```

## Architecture

### Database Layer

**Custom Prisma Setup**: This project uses a non-standard Prisma configuration.

- **Client Generation**: Prisma client generates to `app/generated/prisma` (not the default `node_modules/.prisma/client`)
- **Import Path**: Always import from `@/app/generated/prisma/client`, NOT from `@prisma/client`
- **Adapter**: Uses `@prisma/adapter-better-sqlite3` for SQLite with Better-SQLite3
- **Database Location**: `dev.db` file in project root (created by migrations)
- **Singleton Pattern**: `app/lib/prisma.ts` exports a singleton Prisma client instance

Schema structure (prisma/schema.prisma):
- User: Authentication and user management (customer/admin roles)
- Category: Product categorization
- Product: Coffee shop products (price, availability, images)
- Order: Order tracking with status workflow
- OrderItem: Individual line items linking products to orders

### API Routes

RESTful API routes in `app/api/`:
- `GET /api/products` - List all products with categories
- `POST /api/products` - Create product (validates name, price)
- `GET /api/categories` - List categories
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

All routes use the Prisma singleton from `app/lib/prisma.ts`.

### Frontend Architecture

**Component Split**:
- Server Components by default (no "use client")
- Client Components only when needed (state, effects, event handlers)

**Pages**:
- `/` (app/page.tsx): Customer storefront - currently shows placeholder Card components
- `/admin` (app/admin/page.tsx): Admin dashboard - client component with tabs for products, categories, orders

**Admin Page Pattern**:
- Client component managing state (products, editing, deleting)
- Fetches from API routes on mount
- ProductForm handles create/update with optimistic UI
- ProductsTable displays products with edit/delete actions
- Categories and Orders tabs are placeholders (disabled)

**Shared Components**:
- `Card`: Product display card (orange/black theme)
- `Navigation`: Site navigation header

### Styling

Tailwind CSS 4 with custom theme:
- Orange (#FFA500 variants) and black color scheme
- Dark mode support (dark: prefix)
- Responsive grid layouts (md:grid-cols-2 lg:grid-cols-3)

## Code Conventions

### TypeScript

- Strict mode enabled
- Component props use `Readonly<{...}>` pattern
- API route handlers typed with Next.js types (NextRequest, NextResponse)
- Database types inferred from Prisma schema

### Imports

- Path alias: `@/` maps to project root
- Type imports: `import type { ... }` syntax
- Prisma client: ALWAYS `@/app/generated/prisma/client` (never `@prisma/client`)

### Formatting

- Double quotes for strings
- 2-space indentation
- Named exports for components: `export default function ComponentName()`

## Database Workflow

When modifying the schema:
1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate` to create migration and apply changes
3. Run `npm run db:generate` to regenerate Prisma client (in app/generated/prisma)
4. Import from `@/app/generated/prisma/client` in your code

## Current Limitations

- No authentication implementation yet (User model exists but not wired up)
- Categories management UI not implemented (placeholder tab in admin)
- Orders management UI not implemented (placeholder tab in admin)
- Storefront shows static placeholder cards, not actual products from database
- No test suite configured
