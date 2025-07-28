# Deployment Guide

## Quick Deploy to Cloudflare Workers

### Step 1: Prerequisites
```bash
# Install dependencies
npm install

# Install Wrangler CLI globally (if not already installed)
npm install -g wrangler
```

### Step 2: Authenticate with Cloudflare
```bash
# Login to your Cloudflare account
wrangler login
```
This will open a browser window for you to authenticate.

### Step 3: Create KV Namespace
```bash
# Create the KV namespace for caching
wrangler kv:namespace create "SPECTRUM_CACHE"
```

Copy the namespace ID from the output and update `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "SPECTRUM_CACHE"
id = "your-namespace-id-here"  # Replace with actual ID
preview_id = "your-preview-namespace-id-here"  # Replace with actual preview ID
```

### Step 4: Deploy
```bash
# Deploy to Cloudflare Workers
npm run deploy
```

### Step 5: Test Your Deployment
Visit your Workers URL (shown in deployment output) to see the health check.

## Environment Variables (Optional)

For higher GitHub API rate limits, add a GitHub token:

```bash
# Set GitHub token as a secret
wrangler secret put GITHUB_TOKEN
```

Then paste your GitHub personal access token when prompted.

## Local Development

```bash
# Run locally
npm run dev
```

## Troubleshooting

### Common Issues:

1. **KV Namespace Error**: Make sure you've created the KV namespace and updated the IDs in `wrangler.toml`

2. **GitHub Rate Limits**: Add a GitHub token as described above

3. **Build Errors**: Run `npm run build` to check for TypeScript errors

4. **Authentication**: Make sure you're logged in with `wrangler whoami`

### Getting Help:
- Check Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Wrangler CLI docs: https://developers.cloudflare.com/workers/wrangler/