# Spectrum 2 MCP Server

A Model Context Protocol (MCP) server for Adobe Spectrum 2 UI components, designed to run on Cloudflare Workers.

## Features

- **Component Information**: Get detailed information about Spectrum 2 components
- **Search & Discovery**: Search components by name, category, or description
- **Code Examples**: Access ready-to-use code examples for each component
- **Design Tokens**: Retrieve design tokens and styling information
- **Accessibility Info**: Get accessibility guidelines and ARIA requirements

## Available Tools

### `list_components`
List all available Spectrum 2 components from live GitHub data, optionally filtered by category.

**Parameters:**
- `category` (optional): Filter by category (e.g., "Actions", "Forms")
- `source` (optional): Filter by data source name

### `get_component`
Get detailed information about a specific component including props, examples, and accessibility info parsed from GitHub.

**Parameters:**
- `name` (required): Component name (e.g., "Button", "TextField")

### `search_components`
Search for components by name, description, category, or props across all data sources.

**Parameters:**
- `query` (required): Search query string

### `get_component_examples`
Get code examples for a specific component extracted from documentation.

**Parameters:**
- `name` (required): Component name

### `get_design_tokens`
Get design tokens, optionally filtered by component.

**Parameters:**
- `component` (optional): Component name to filter tokens

### `list_data_sources`
List all configured data sources for Spectrum components.

### `refresh_cache`
Refresh the component data cache from GitHub and other sources.

**Parameters:**
- `source` (optional): Specific data source name to refresh

## Deployment

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Install Wrangler CLI:
```bash
npm install -g wrangler
```

3. Login to Cloudflare:
```bash
wrangler login
```

### Deploy to Cloudflare Workers

1. Update `wrangler.toml` with your account details
2. Create a KV namespace:
```bash
wrangler kv:namespace create "SPECTRUM_CACHE"
```
3. Update the KV namespace ID in `wrangler.toml`
4. Deploy:
```bash
npm run deploy
```

### Local Development

Run locally with Wrangler:
```bash
npm run dev
```

## Usage

Once deployed, your MCP server will be available at your Cloudflare Workers URL. You can:

1. **Health Check**: GET request to the root URL
2. **MCP Tools**: POST requests with MCP protocol messages

### Example MCP Configuration

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "spectrum2": {
      "command": "node",
      "args": ["path/to/spectrum2-mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

## Component Categories

- **Actions**: Button, ActionButton, ToggleButton
- **Forms**: TextField, TextArea, Checkbox, Radio
- **Navigation**: Link, Breadcrumbs, Tabs
- **Layout**: Flex, Grid, Divider
- **Overlays**: Dialog, Popover, Tooltip

## Contributing

1. Add new components to `src/spectrum-data.ts`
2. Update types in `src/types.ts` if needed
3. Test locally with `npm run dev`
4. Deploy with `npm run deploy`

## License

MIT
## 
Data Sources

The server supports multiple data sources that can be configured and extended:

### GitHub Integration
- **Primary Source**: Adobe React Spectrum 2 repository
- **Real-time Data**: Fetches component information directly from GitHub
- **Automatic Parsing**: Extracts props from TypeScript interfaces, examples from README files
- **Caching**: Intelligent caching with KV storage and memory cache

### Extensible Architecture
You can easily add new data sources by:

1. Implementing a parser in `src/data-sources/`
2. Adding the source to `DataSourceManager`
3. Configuring authentication if needed

### Environment Variables
- `GITHUB_TOKEN`: Optional GitHub personal access token for higher rate limits
- `SPECTRUM_CACHE`: KV namespace for caching (configured in wrangler.toml)

## Real-time Features

- **Live GitHub Data**: Always fetches the latest component information
- **Smart Caching**: 30-minute cache with automatic refresh
- **Multiple Sources**: Supports GitHub, NPM, APIs, and local data
- **Fallback Handling**: Graceful degradation when sources are unavailable