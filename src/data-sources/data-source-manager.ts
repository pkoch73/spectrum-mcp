import { DataSource, SpectrumComponent, Env } from '../types';
import { GitHubSpectrumParser } from './github-parser';

export class DataSourceManager {
  private dataSources: DataSource[] = [];
  private env: Env;
  private cache: Map<string, { data: SpectrumComponent[]; timestamp: number }> = new Map();
  private readonly CACHE_TTL = 1000 * 60 * 30; // 30 minutes

  constructor(env: Env) {
    this.env = env;
    this.initializeDataSources();
  }

  private initializeDataSources() {
    // Adobe Spectrum 2 GitHub source
    this.dataSources.push({
      name: 'adobe-spectrum-2',
      type: 'github',
      config: {
        owner: 'adobe',
        repo: 'react-spectrum',
        path: 'packages/@react-spectrum/s2',
        branch: 'main',
        token: this.env.GITHUB_TOKEN
      },
      parser: async (config) => {
        const parser = new GitHubSpectrumParser(config);
        return await parser.fetchComponents();
      }
    });

    // You can add more data sources here
    // this.dataSources.push({
    //   name: 'spectrum-css',
    //   type: 'github',
    //   config: {
    //     owner: 'adobe',
    //     repo: 'spectrum-css',
    //     path: 'components',
    //     token: this.env.GITHUB_TOKEN
    //   },
    //   parser: async (config) => {
    //     // Custom parser for Spectrum CSS
    //     return [];
    //   }
    // });
  }

  async getAllComponents(): Promise<SpectrumComponent[]> {
    const allComponents: SpectrumComponent[] = [];
    
    for (const source of this.dataSources) {
      try {
        const components = await this.getComponentsFromSource(source);
        allComponents.push(...components);
      } catch (error) {
        console.error(`Failed to fetch from source ${source.name}:`, error);
      }
    }

    return this.deduplicateComponents(allComponents);
  }

  async getComponentsFromSource(source: DataSource): Promise<SpectrumComponent[]> {
    const cacheKey = `${source.name}-components`;
    const cached = this.cache.get(cacheKey);
    
    // Check cache first
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    // Try KV storage
    if (this.env.SPECTRUM_CACHE) {
      try {
        const kvData = await this.env.SPECTRUM_CACHE.get(cacheKey);
        if (kvData) {
          const parsed = JSON.parse(kvData);
          if (Date.now() - parsed.timestamp < this.CACHE_TTL) {
            this.cache.set(cacheKey, parsed);
            return parsed.data;
          }
        }
      } catch (error) {
        console.warn('Failed to read from KV cache:', error);
      }
    }

    // Fetch fresh data
    console.log(`Fetching fresh data from ${source.name}`);
    const components = await source.parser(source.config);
    
    // Update caches
    const cacheData = { data: components, timestamp: Date.now() };
    this.cache.set(cacheKey, cacheData);
    
    if (this.env.SPECTRUM_CACHE) {
      try {
        await this.env.SPECTRUM_CACHE.put(cacheKey, JSON.stringify(cacheData));
      } catch (error) {
        console.warn('Failed to write to KV cache:', error);
      }
    }

    return components;
  }

  async refreshCache(sourceName?: string): Promise<void> {
    const sourcesToRefresh = sourceName 
      ? this.dataSources.filter(s => s.name === sourceName)
      : this.dataSources;

    for (const source of sourcesToRefresh) {
      const cacheKey = `${source.name}-components`;
      
      // Clear memory cache
      this.cache.delete(cacheKey);
      
      // Clear KV cache
      if (this.env.SPECTRUM_CACHE) {
        try {
          await this.env.SPECTRUM_CACHE.delete(cacheKey);
        } catch (error) {
          console.warn('Failed to clear KV cache:', error);
        }
      }
    }
  }

  getDataSources(): DataSource[] {
    return this.dataSources.map(source => ({
      ...source,
      config: { ...source.config, token: source.config.token ? '[REDACTED]' : undefined }
    }));
  }

  addDataSource(source: DataSource): void {
    this.dataSources.push(source);
  }

  private deduplicateComponents(components: SpectrumComponent[]): SpectrumComponent[] {
    const seen = new Map<string, SpectrumComponent>();
    
    for (const component of components) {
      const key = component.name.toLowerCase();
      if (!seen.has(key) || seen.get(key)!.props.length < component.props.length) {
        // Keep the component with more detailed information
        seen.set(key, component);
      }
    }
    
    return Array.from(seen.values());
  }

  async searchComponents(query: string): Promise<SpectrumComponent[]> {
    const allComponents = await this.getAllComponents();
    const lowercaseQuery = query.toLowerCase();
    
    return allComponents.filter(comp =>
      comp.name.toLowerCase().includes(lowercaseQuery) ||
      comp.description.toLowerCase().includes(lowercaseQuery) ||
      comp.category.toLowerCase().includes(lowercaseQuery) ||
      comp.props.some(prop => 
        prop.name.toLowerCase().includes(lowercaseQuery) ||
        prop.description.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  async getComponentByName(name: string): Promise<SpectrumComponent | undefined> {
    const allComponents = await this.getAllComponents();
    return allComponents.find(comp => 
      comp.name.toLowerCase() === name.toLowerCase()
    );
  }

  async getComponentsByCategory(category: string): Promise<SpectrumComponent[]> {
    const allComponents = await this.getAllComponents();
    return allComponents.filter(comp => 
      comp.category.toLowerCase() === category.toLowerCase()
    );
  }
}