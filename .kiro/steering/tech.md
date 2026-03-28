---
inclusion: auto
---

# Technology Stack

## Core Technologies

- **Framework**: Next.js 16+ with App Router (React 19)
- **Runtime**: Bun v1.3.0
- **Language**: TypeScript 6.0
- **Styling**: Tailwind CSS v4 with mystical premium color palette
- **Component Library**: shadcn/ui (radix-maia style) built on Radix UI primitives
- **Animation**: Motion.js (motion/react) for scroll-based animations and parallax
- **Database**: Supabase (PostgreSQL)
- **Booking System**: Calendly Premium with inline embed (react-calendly)
- **Payment**: Handled by Calendly (Stripe integration)
- **Deployment**: Vercel
- **Icons**: Tabler Icons (@tabler/icons-react)

## Package Manager

**CRITICAL**: Always use `bun` for all commands. Never use `npm` or `yarn`.

```bash
bun install          # Install dependencies
bun add <package>    # Add dependency
bun add -D <package> # Add dev dependency
bunx <command>       # Execute package binary
```

## Common Commands

```bash
# Development
bun run dev          # Start dev server (manual - don't run in automation)

# Build
bun run build        # Build for production

# Production
bun run start        # Start production server

# Linting
bun run lint         # Run ESLint on app directory

# shadcn/ui
bunx shadcn@latest add <component>  # Add shadcn/ui component
```

## Component Architecture

### shadcn/ui Configuration

- Style: radix-maia
- Base color: olive
- CSS variables: enabled
- Icon library: Tabler
- RSC: enabled
- Aliases: `@/components`, `@/lib/utils`, `@/components/ui`

### Component Guidelines

1. **Always use shadcn/ui components** for UI elements (Button, Card, Form, Input, etc.)
2. **Wrap with Motion.js** for animations:

   ```typescript
   import { motion } from "motion/react";
   import { Button } from "@/components/ui/button";

   const MotionButton = motion(Button);
   ```

3. **Maintain accessibility** - shadcn/ui components are built with a11y in mind
4. **Look up docs** using Ref MCP before implementing components

## MCP Tools Usage

### Ref MCP - Documentation Lookup

Use before implementing features with external libraries:

```typescript
// Search for docs
mcp_Ref_ref_search_documentation({ query: "nextjs app router" });

// Read specific URL
mcp_Ref_ref_read_url({ url: "https://..." });
```

**Required lookups**:

- shadcn/ui component docs before adding components
- Motion.js animation docs before implementing animations
- Calendly API docs before webhook implementation
- Supabase client docs before database operations

### Supabase MCP - Database Operations

Use for ALL database operations:

```typescript
// Apply migrations
mcp_supabase_apply_migration({ name: "create_bookings", query: "..." });

// Execute queries
mcp_supabase_execute_sql({ query: "SELECT * FROM bookings" });

// List tables
mcp_supabase_list_tables({ schemas: ["public"], verbose: true });

// Generate types
mcp_supabase_generate_typescript_types();

// Check security
mcp_supabase_get_advisors({ type: "security" });
```

## Environment Variables

Located in `.env.local` (already exists):

```bash
# Calendly
NEXT_PUBLIC_CALENDLY_URL=
CALENDLY_WEBHOOK_SIGNING_KEY=


# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Application
NEXT_PUBLIC_BASE_URL=
TOKEN_EXPIRATION_DAYS=7

# Videos
NEXT_PUBLIC_HERO_VIDEO_URL=
NEXT_PUBLIC_WELCOME_VIDEO_URL=
```

## Testing

- **Property-Based Testing**: fast-check library
- Install: `bun add -D fast-check`
- Focus on correctness properties defined in design.md

## Deployment

- **Platform**: Vercel
- **Git**: https://github.com/jamiul-islam/fortune-teller.git
- **Setup**: Next.js installed directly in project root (not subdirectory)
