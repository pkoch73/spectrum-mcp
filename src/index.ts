import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { Env } from './types';
import { DataSourceManager } from './data-sources/data-source-manager';

const server = new Server(
  {
    name: 'spectrum2-mcp-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
const tools: Tool[] = [
  {
    name: 'list_components',
    description: 'List all available Spectrum 2 components from live GitHub data',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Optional category to filter components (e.g., "Actions", "Forms")',
        },
        source: {
          type: 'string',
          description: 'Optional data source name to filter components from specific source',
        },
      },
    },
  },
  {
    name: 'get_component',
    description: 'Get detailed information about a specific Spectrum 2 component from live GitHub data',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the component (e.g., "Button", "TextField")',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'search_components',
    description: 'Search for Spectrum 2 components by name, description, category, or props',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query to find relevant components',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_component_examples',
    description: 'Get code examples for a specific Spectrum 2 component from documentation',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the component',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_design_tokens',
    description: 'Get design tokens for Spectrum 2 components',
    inputSchema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'Optional component name to filter tokens',
        },
      },
    },
  },
  {
    name: 'list_data_sources',
    description: 'List all configured data sources for Spectrum components',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'refresh_cache',
    description: 'Refresh the component data cache from all or specific data sources',
    inputSchema: {
      type: 'object',
      properties: {
        source: {
          type: 'string',
          description: 'Optional specific data source name to refresh',
        },
      },
    },
  },
];

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Tool handling function
async function handleToolCall(name: string, args: any, dataManager: DataSourceManager) {
  try {
    switch (name) {
      case 'list_components': {
        const category = args?.category as string | undefined;
        const components = category 
          ? await dataManager.getComponentsByCategory(category)
          : await dataManager.getAllComponents();
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                components: components.map(comp => ({
                  name: comp.name,
                  category: comp.category,
                  description: comp.description,
                  propsCount: comp.props.length,
                  examplesCount: comp.examples.length,
                })),
                total: components.length,
                lastUpdated: new Date().toISOString(),
              }, null, 2),
            },
          ],
        };
      }

      case 'get_component': {
        const componentName = args?.name as string;
        if (!componentName) {
          throw new Error('Component name is required');
        }

        const component = await dataManager.getComponentByName(componentName);
        if (!component) {
          throw new Error(`Component "${componentName}" not found`);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(component, null, 2),
            },
          ],
        };
      }

      case 'search_components': {
        const query = args?.query as string;
        if (!query) {
          throw new Error('Search query is required');
        }

        const results = await dataManager.searchComponents(query);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                query,
                results: results.map(comp => ({
                  name: comp.name,
                  category: comp.category,
                  description: comp.description,
                  relevantProps: comp.props.filter(prop => 
                    prop.name.toLowerCase().includes(query.toLowerCase()) ||
                    prop.description.toLowerCase().includes(query.toLowerCase())
                  ).map(prop => prop.name),
                })),
                total: results.length,
              }, null, 2),
            },
          ],
        };
      }

      case 'get_component_examples': {
        const componentName = args?.name as string;
        if (!componentName) {
          throw new Error('Component name is required');
        }

        const component = await dataManager.getComponentByName(componentName);
        if (!component) {
          throw new Error(`Component "${componentName}" not found`);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                component: component.name,
                examples: component.examples,
                totalExamples: component.examples.length,
              }, null, 2),
            },
          ],
        };
      }

      case 'get_design_tokens': {
        const componentName = args?.component as string;
        let tokens: any[] = [];

        if (componentName) {
          const component = await dataManager.getComponentByName(componentName);
          if (!component) {
            throw new Error(`Component "${componentName}" not found`);
          }
          tokens = component.designTokens;
        } else {
          // Get all design tokens from all components
          const allComponents = await dataManager.getAllComponents();
          tokens = allComponents.flatMap(comp => comp.designTokens);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                component: componentName || 'all',
                tokens,
                total: tokens.length,
              }, null, 2),
            },
          ],
        };
      }

      case 'list_data_sources': {
        const sources = dataManager.getDataSources();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                dataSources: sources,
                total: sources.length,
              }, null, 2),
            },
          ],
        };
      }

      case 'refresh_cache': {
        const sourceName = args?.source as string | undefined;
        await dataManager.refreshCache(sourceName);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                message: sourceName 
                  ? `Cache refreshed for source: ${sourceName}`
                  : 'Cache refreshed for all sources',
                timestamp: new Date().toISOString(),
              }, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
}

// Handle tool calls for MCP transport
server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  const { name, arguments: args } = request.params;

  // This will be set by the fetch handler
  const env = (globalThis as any).__spectrum_env as Env;
  if (!env) {
    return {
      content: [{ type: 'text', text: 'Error: Environment not initialized' }],
      isError: true,
    };
  }

  const dataManager = new DataSourceManager(env);
  return await handleToolCall(name, args, dataManager);
});

// Cloudflare Workers fetch handler
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Set environment globally for MCP handlers
    (globalThis as any).__spectrum_env = env;
    
    const dataManager = new DataSourceManager(env);
    
    // Handle MCP over HTTP - Direct implementation
    if (request.method === 'POST') {
      try {
        const body = await request.json() as any;
        
        // Direct HTTP-to-MCP bridge (bypass transport layer)
        if (body.method === 'tools/list') {
          return new Response(JSON.stringify({ tools }), {
            headers: { 'Content-Type': 'application/json' },
          });
        }
        
        if (body.method === 'tools/call') {
          const { name, arguments: args } = body.params;
          
          // Call the tool handler directly
          try {
            const result = await handleToolCall(name, args, dataManager);
            return new Response(JSON.stringify(result), {
              headers: { 'Content-Type': 'application/json' },
            });
          } catch (error) {
            return new Response(JSON.stringify({
              content: [
                {
                  type: 'text',
                  text: `Error: ${error instanceof Error ? error.message : String(error)}`,
                },
              ],
              isError: true,
            }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }
        
        return new Response('Invalid method', { status: 400 });
      } catch (error) {
        return new Response(`Error: ${error}`, { status: 500 });
      }
    }
    
    // Health check endpoint
    if (request.method === 'GET') {
      try {
        const components = await dataManager.getAllComponents();
        const sources = dataManager.getDataSources();
        
        return new Response(JSON.stringify({
          name: 'spectrum2-mcp-server',
          version: '0.1.0',
          status: 'healthy',
          components: components.length,
          dataSources: sources.length,
          lastUpdated: new Date().toISOString(),
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        return new Response(JSON.stringify({
          name: 'spectrum2-mcp-server',
          version: '0.1.0',
          status: 'error',
          error: error instanceof Error ? error.message : String(error),
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
    
    return new Response('Method not allowed', { status: 405 });
  },
};

// For local development with stdio transport
export async function main() {
  // Set up mock environment for local development
  const mockEnv: Env = {
    SPECTRUM_CACHE: null as any, // KV not available in local dev
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  };
  
  (globalThis as any).__spectrum_env = mockEnv;
  
  const transport = new StdioServerTransport();
  await server.connect(transport);
}