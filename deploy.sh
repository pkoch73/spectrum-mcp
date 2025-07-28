#!/bin/bash

echo "🚀 Deploying Spectrum 2 MCP Server to Cloudflare Workers"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if user is logged in
echo "🔐 Checking Cloudflare authentication..."
if ! npx wrangler whoami &> /dev/null; then
    echo "❌ Not logged in to Cloudflare. Please run:"
    echo "   npx wrangler login"
    exit 1
fi

# Create KV namespace if needed
echo "🗄️  Setting up KV namespace..."
echo "Creating KV namespace (ignore error if it already exists)..."
npx wrangler kv:namespace create "SPECTRUM_CACHE" || true

echo ""
echo "⚠️  IMPORTANT: Update wrangler.toml with your KV namespace IDs"
echo "   Run: npx wrangler kv:namespace list"
echo "   Then update the 'id' and 'preview_id' fields in wrangler.toml"
echo ""
read -p "Press Enter after updating wrangler.toml with your KV namespace IDs..."

# Deploy to Cloudflare Workers
echo "🚀 Deploying to Cloudflare Workers..."
npx wrangler deploy

echo "✅ Deployment complete!"
echo ""
echo "Your MCP server is now available at your Cloudflare Workers URL"
echo "You can test it by visiting the URL in your browser for a health check"