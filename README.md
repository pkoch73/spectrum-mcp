# Spectrum 2 MCP Server

A Model Context Protocol (MCP) server for Adobe Spectrum 2 UI components, designed to run on Cloudflare Workers. This server provides real-time access to Adobe's Spectrum 2 design system components by parsing data directly from the official GitHub repository.

🌐 **Live Demo:** https://spectrum2-mcp-server.philipp-koch.workers.dev

## Features

- **🔄 Real-time GitHub Integration**: Fetches live component data from Adobe's Spectrum 2 repository
- **🔍 Component Discovery**: Search and browse all available Spectrum 2 components
- **📝 Code Examples**: Access ready-to-use code examples extracted from documentation
- **🎨 Design Tokens**: Retrieve design tokens and styling information
- **♿ Accessibility Info**: Get accessibility guidelines and ARIA requirements
- **⚡ Fast & Cached**: Intelligent caching with optional KV storage for performance
- **🌍 HTTP & MCP Support**: Works with both HTTP requests and MCP protocol

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

## 🚀 Quick Start

### 1. Prerequisites
```bash
# Install dependencies
npm install

# Login to Cloudflare (opens browser)
npx wrangler login
```

### 2. Deploy (No KV Setup Required)
```bash
# Deploy directly to Cloudflare Workers
npx wrangler deploy
```

That's it! Your server will be live at `https://spectrum2-mcp-server.your-subdomain.workers.dev`

### 3. Test Your Deployment
```bash
# Health check
curl https://your-worker-url.workers.dev

# List available tools
curl -X POST https://your-worker-url.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"method": "tools/list"}'

# Get components
curl -X POST https://your-worker-url.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"method": "tools/call", "params": {"name": "list_components", "arguments": {}}}'
```

## 🔧 Advanced Setup

### Optional: KV Storage for Caching
For better performance with heavy usage:

```bash
# Create KV namespaces
npx wrangler kv:namespace create "SPECTRUM_CACHE"
npx wrangler kv:namespace create "SPECTRUM_CACHE" --preview

# List to get IDs
npx wrangler kv:namespace list
```

Uncomment and update the KV section in `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "SPECTRUM_CACHE"
id = "your-actual-namespace-id"
preview_id = "your-actual-preview-id"
```

### Optional: GitHub Token for Higher Rate Limits
```bash
# Add GitHub token as secret
npx wrangler secret put GITHUB_TOKEN
# Paste your GitHub personal access token when prompted
```

### Local Development
```bash
# Run locally
npx wrangler dev
```

## 📖 Usage

Your deployed server supports both HTTP requests and MCP protocol:

### HTTP API Usage

**Health Check:**
```bash
GET https://your-worker-url.workers.dev
```

**List Available Tools:**
```bash
POST https://your-worker-url.workers.dev
Content-Type: application/json

{"method": "tools/list"}
```

**Call a Tool:**
```bash
POST https://your-worker-url.workers.dev
Content-Type: application/json

{
  "method": "tools/call",
  "params": {
    "name": "search_components",
    "arguments": {"query": "button"}
  }
}
```

### MCP Client Integration

Add to your MCP client configuration:

**For HTTP-based MCP clients:**
```json
{
  "mcpServers": {
    "spectrum2": {
      "url": "https://your-worker-url.workers.dev",
      "type": "http"
    }
  }
}
```

**For stdio-based MCP clients (local development):**
```json
{
  "mcpServers": {
    "spectrum2": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/spectrum2-mcp-server"
    }
  }
}
```

### Example Responses

**Health Check Response:**
```json
{
  "name": "spectrum2-mcp-server",
  "version": "0.1.0",
  "status": "healthy",
  "components": 9,
  "dataSources": 1,
  "lastUpdated": "2025-07-28T19:01:20.124Z"
}
```

**Component List Response:**
```json
{
  "content": [{
    "type": "text",
    "text": "{\"components\": [{\"name\": \"Button\", \"category\": \"Actions\", \"description\": \"...\"}], \"total\": 9}"
  }]
}
```

## 🏗️ Architecture

### Data Sources
The server uses an extensible data source architecture:

- **GitHub Parser**: Parses Adobe's Spectrum 2 repository in real-time
- **TypeScript Analysis**: Extracts component props from interface definitions
- **Documentation Parsing**: Extracts code examples from README files
- **Intelligent Caching**: 30-minute cache with KV storage support

### Component Discovery
The server automatically discovers components by:
1. Scanning the `packages/@react-spectrum/s2` directory
2. Parsing TypeScript files for component interfaces
3. Extracting documentation and examples
4. Categorizing components based on naming patterns

### Caching Strategy
- **Memory Cache**: Fast in-request caching
- **KV Storage**: Persistent caching across requests (optional)
- **GitHub Rate Limits**: Respects API limits with intelligent backoff
- **Cache Invalidation**: Manual refresh tools available

## 🔍 Troubleshooting

### Common Issues

**"KV namespace not found" error:**
- KV storage is optional - comment out the KV section in `wrangler.toml` to deploy without caching

**GitHub rate limit errors:**
- Add a GitHub personal access token: `npx wrangler secret put GITHUB_TOKEN`
- Without token: 60 requests/hour, with token: 5,000 requests/hour

**Slow first request:**
- First request fetches fresh data from GitHub (10-30 seconds)
- Subsequent requests use cached data (fast)
- Consider adding KV storage for persistent caching

**"Not connected" errors:**
- This was fixed in the latest version - redeploy if you see this error

### Performance Tips

1. **Add GitHub Token**: Increases rate limits significantly
2. **Enable KV Storage**: Provides persistent caching across requests
3. **Use Caching**: The server caches aggressively to minimize GitHub API calls

## 🤝 Contributing

### Adding New Data Sources
1. Create a parser in `src/data-sources/`
2. Implement the `DataSource` interface
3. Add to `DataSourceManager.initializeDataSources()`

### Improving Component Parsing
1. Update `GitHubSpectrumParser` for better component detection
2. Enhance TypeScript interface parsing
3. Add support for more documentation formats

### Development Workflow
```bash
# Local development
npx wrangler dev

# Test changes
curl -X POST http://localhost:8787 -H "Content-Type: application/json" -d '{"method": "tools/list"}'

# Deploy
npx wrangler deploy
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: https://spectrum2-mcp-server.philipp-koch.workers.dev
- **Adobe Spectrum 2**: https://github.com/adobe/react-spectrum/tree/main/packages/%40react-spectrum/s2
- **Model Context Protocol**: https://modelcontextprotocol.io/
- **Cloudflare Workers**: https://workers.cloudflare.com/
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