// Single worker with all Spectrum 2 components to avoid subrequest limits
import { Env } from './types';
import { SPECTRUM_COMPONENTS, getComponentsInRange, getComponentByName } from './static-components';

const tools = [
  {
    name: 'list_all_components',
    description: 'List all available Spectrum 2 components',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Optional category to filter components',
        },
      },
    },
  },
  {
    name: 'get_component',
    description: 'Get detailed information about a specific Spectrum 2 component',
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
    name: 'search_components',
    description: 'Search components by name or description',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query',
        },
      },
      required: ['query'],
    },
  },
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'POST') {
      try {
        const body = await request.json() as any;
        
        if (body.method === 'tools/list') {
          return new Response(JSON.stringify({ tools }), {
            headers: { 'Content-Type': 'application/json' },
          });
        }
        
        if (body.method === 'tools/call') {
          const { name, arguments: args } = body.params;
          
          if (name === 'list_all_components') {
            const category = args?.category as string;
            let components = SPECTRUM_COMPONENTS;
            
            // Filter by category if specified
            if (category) {
              components = components.filter(comp => 
                comp.category.toLowerCase().includes(category.toLowerCase())
              );
            }
            
            return new Response(JSON.stringify({
              content: [{
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
                  categories: [...new Set(SPECTRUM_COMPONENTS.map(c => c.category))].sort(),
                  lastUpdated: new Date().toISOString(),
                }),
              }],
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
          
          if (name === 'get_component') {
            const componentName = args?.name as string;
            if (!componentName) {
              return new Response(JSON.stringify({
                content: [{ type: 'text', text: 'Component name is required' }],
                isError: true,
              }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }
            
            const component = getComponentByName(componentName);
            if (!component) {
              return new Response(JSON.stringify({
                content: [{ type: 'text', text: `Component "${componentName}" not found` }],
                isError: true,
              }), { status: 404, headers: { 'Content-Type': 'application/json' } });
            }
            
            return new Response(JSON.stringify({
              content: [{ type: 'text', text: JSON.stringify(component, null, 2) }],
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
          
          if (name === 'search_components') {
            const query = args?.query as string;
            if (!query) {
              return new Response(JSON.stringify({
                content: [{ type: 'text', text: 'Search query is required' }],
                isError: true,
              }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }
            
            const lowerQuery = query.toLowerCase();
            const matchingComponents = SPECTRUM_COMPONENTS.filter(comp =>
              comp.name.toLowerCase().includes(lowerQuery) ||
              comp.description.toLowerCase().includes(lowerQuery) ||
              comp.category.toLowerCase().includes(lowerQuery)
            );
            
            return new Response(JSON.stringify({
              content: [{
                type: 'text',
                text: JSON.stringify({
                  query,
                  components: matchingComponents.map(comp => ({
                    name: comp.name,
                    category: comp.category,
                    description: comp.description,
                    propsCount: comp.props.length,
                    examplesCount: comp.examples.length,
                  })),
                  total: matchingComponents.length,
                }),
              }],
            }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }
        
        return new Response('Invalid method', { status: 400 });
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
    
    // Health check
    return new Response(JSON.stringify({
      name: 'spectrum2-mcp-server',
      version: '1.0.0',
      status: 'healthy',
      totalComponents: SPECTRUM_COMPONENTS.length,
      categories: [...new Set(SPECTRUM_COMPONENTS.map(c => c.category))].sort(),
      lastUpdated: new Date().toISOString(),
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};