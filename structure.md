# Project Structure

## Root Level
- **src/**: Main application source code
- **public/**: Static assets and build output
- **docker/**: Docker configuration files
- **maintenance/**: Maintenance page assets

## Source Organization (`src/`)

### Core Application
- **main.js**: Application entry point with i18n setup
- **App.svelte**: Root component with routing and authentication
- **index.html.ejs**: HTML template

### Components (`src/components/`)
- **Root level**: Shared UI components (Button, Modal, Spinner, etc.)
- **forms/**: Form-related components and utilities
- **shared/**: Components used across user roles
- **students/**: Student-specific components
- **teachers/**: Teacher-specific components
- **guests/**: Guest/public components
- **catalog/**: Catalog browsing components
- **extensions/**: Badge extension components
- **tabs/**: Tab navigation components

### Routes (`src/routes/`)
- Role-based route organization
- Public routes for badge verification
- Authentication routes

### Utilities (`src/util/`)
- **config.js**: Application configuration
- **role.js**: User role definitions
- **utils.js**: Common utility functions
- Domain-specific utilities (badges, users, permissions, etc.)

### API Layer (`src/api/`)
- **index.js**: Main API client
- **graphql.js**: GraphQL queries and mutations
- **queries.js**: Query definitions
- **markdown.js**: Markdown processing

### State Management (`src/stores/`)
- Svelte stores for global state
- User authentication state
- Filter states for different views
- Flash messages and notifications

### Styling (`src/stylesheets/`)
- **main.scss**: Main stylesheet entry point
- **variables.scss**: CSS custom properties and design tokens
- **typography.scss**: Font and text styling
- **shared/**: Reusable style modules

### Assets
- **icons/**: SVG icons organized by category
- **img/**: Images and logos
- **locale/**: Internationalization files (en.js, nl.js)

### Testing (`src/__tests__/`)
- **components/**: Component tests
- **util/**: Utility function tests
- **locale/**: Localization tests

## Naming Conventions
- **Components**: PascalCase (e.g., `BadgeCard.svelte`)
- **Utilities**: camelCase (e.g., `searchData.js`)
- **Stores**: camelCase (e.g., `filterBadges.js`)
- **Routes**: PascalCase for components, kebab-case for paths

## File Organization Patterns
- Group related functionality in folders
- Separate concerns (components, utilities, API, styling)
- Role-based component organization (students/, teachers/, shared/)
- Feature-based organization within roles
