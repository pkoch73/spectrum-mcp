#!/usr/bin/env node

// Simple test script for MCP server (HTTP version)
console.log('🧪 Testing MCP Server via HTTP...\n');

async function testMCPServer() {
    const baseUrl = 'https://spectrum2-mcp-server.philipp-koch.workers.dev';

    // Test 1: Health check
    console.log('1. Testing health check...');
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        console.log('✅ Health check passed:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('❌ Health check failed:', error.message);
    }

    // Test 2: List tools
    console.log('\n2. Testing tools/list...');
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ method: 'tools/list' })
        });
        const data = await response.json();
        console.log('✅ Tools list:', data.tools.map(t => t.name).join(', '));
    } catch (error) {
        console.error('❌ Tools list failed:', error.message);
    }

    // Test 3: List components
    console.log('\n3. Testing list_components tool...');
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: 'tools/call',
                params: { name: 'list_components', arguments: {} }
            })
        });
        const data = await response.json();
        const result = JSON.parse(data.content[0].text);
        console.log(`✅ Found ${result.total} components:`, result.components.map(c => c.name).join(', '));
    } catch (error) {
        console.error('❌ List components failed:', error.message);
    }

    // Test 4: Search components
    console.log('\n4. Testing search_components tool...');
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: 'tools/call',
                params: { name: 'search_components', arguments: { query: 'icon' } }
            })
        });
        const data = await response.json();
        const result = JSON.parse(data.content[0].text);
        console.log(`✅ Search for 'icon' found ${result.total} results:`, result.results.map(c => c.name).join(', '));
    } catch (error) {
        console.error('❌ Search components failed:', error.message);
    }

    // Test 5: List data sources
    console.log('\n5. Testing list_data_sources tool...');
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: 'tools/call',
                params: { name: 'list_data_sources', arguments: {} }
            })
        });
        const data = await response.json();
        const result = JSON.parse(data.content[0].text);
        console.log(`✅ Found ${result.total} data sources:`, result.dataSources.map(ds => ds.name).join(', '));
    } catch (error) {
        console.error('❌ List data sources failed:', error.message);
    }

    console.log('\n🎉 MCP Server testing complete!');
}

testMCPServer().catch(console.error);