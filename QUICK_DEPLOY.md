# Quick Deployment Guide

## 🚀 Deploy in 3 Steps

### Step 1: Login to Cloudflare
```bash
npx wrangler login
```

### Step 2: Create KV Namespace and Update Config
```bash
# Create KV namespace
npx wrangler kv:namespace create "SPECTRUM_CACHE"

# List your namespaces to get the IDs
npx wrangler kv:namespace list
```

Update `wrangler.toml` with the actual namespace IDs:
```toml
[[kv_namespaces]]
binding = "SPECTRUM_CACHE"
id = "your-actual-namespace-id"        # Replace with real ID
preview_id = "your-actual-preview-id"  # Replace with real preview ID
```

### Step 3: Deploy
```bash
npx wrangler deploy
```

## ✅ That's it!

Your MCP server will be deployed and you'll get a URL like:
`https://spectrum2-mcp-server.your-subdomain.workers.dev`

## 🧪 Test Your Deployment

Visit your Workers URL in a browser to see the health check:
```json
{
  "name": "spectrum2-mcp-server",
  "version": "0.1.0",
  "status": "healthy",
  "components": 42,
  "dataSources": 1,
  "lastUpdated": "2024-12-28T..."
}
```

## 🔧 Optional: Add GitHub Token

For higher GitHub API rate limits:
```bash
npx wrangler secret put GITHUB_TOKEN
```
Then paste your GitHub personal access token.

## 📝 Use in MCP Client

Add to your MCP configuration:
```json
{
  "mcpServers": {
    "spectrum2": {
      "command": "curl",
      "args": ["-X", "POST", "https://your-worker-url.workers.dev", "-H", "Content-Type: application/json", "-d"]
    }
  }
}
```