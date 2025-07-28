#!/bin/bash

echo "🚀 Deploying Spectrum 2 MCP Server to Cloudflare Workers"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check if user is logged in
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "❌ Not logged in to Cloudflare. Please run:"
    echo "   wrangler login"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create KV namespace if it doesn't exist
echo "🗄️  Setting up KV namespace..."
KV_OUTPUT=$(wrangler kv:namespace create "SPECTRUM_CACHE" 2>/dev/null || echo "exists")

if [[ $KV_OUTPUT != "exists" ]]; then
    echo "✅ KV namespace created. Please update wrangler.toml with the namespace ID:"
    echo "$KV_OUTPUT"
    echo ""
    echo "Update the 'id' field in wrangler.toml under [[kv_namespaces]]"
    echo "Then run this script again."
    exit 1
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Cloudflare Workers
echo "🚀 Deploying to Cloudflare Workers..."
wrangler deploy

echo "✅ Deployment complete!"
echo ""
echo "Your MCP server is now available at your Cloudflare Workers URL"
echo "You can test it by visiting the URL in your browser for a health check"