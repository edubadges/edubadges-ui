# Technology Stack

## Frontend Framework
- **Svelte 3.x**: Component-based UI framework with reactive state management
- **Svelte Routing**: Client-side routing for SPA navigation
- **Svelte Preprocess**: SCSS and other preprocessing support

## Build System
- **Webpack 4.x**: Module bundler and build tool
- **Babel**: JavaScript transpilation with ES6+ support and optional chaining
- **SCSS/Sass**: CSS preprocessing with variables and mixins
- **PostCSS**: CSS post-processing

## Key Dependencies
- **i18n-js**: Internationalization (English/Dutch)
- **js-cookie**: Cookie management
- **moment**: Date/time handling
- **jwt-decode**: JWT token handling
- **marked**: Markdown processing
- **dompurify**: HTML sanitization
- **highcharts**: Data visualization
- **qrcode**: QR code generation

## Development Tools
- **Jest**: Testing framework with Babel integration
- **Prettier**: Code formatting
- **JSHint**: JavaScript linting
- **Webpack Dev Server**: Hot reload development server
- **Docker**: Containerized development environment

## Common Commands

### Development
```bash
# Start development server (local)
yarn dev

# Start with Docker
docker compose build
docker compose up
```

### Building
```bash
# Development build
yarn build

# Production build
yarn build:prod
```

### Testing
```bash
# Run tests
yarn test

# Watch mode
yarn test:watch
```

### Analysis
```bash
# Bundle analysis
yarn stats
```

## Configuration
- **Webpack**: `webpack.config.js` - build configuration
- **Babel**: `babel.config.js` - transpilation settings
- **Docker**: `docker-compose.yml` - containerized development
- **Config**: `src/util/config.js` - application configuration
