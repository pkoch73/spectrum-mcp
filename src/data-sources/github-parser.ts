import { SpectrumComponent, ComponentProp, ComponentExample, GitHubConfig } from '../types';

export class GitHubSpectrumParser {
  private config: GitHubConfig;
  private baseUrl: string;

  constructor(config: GitHubConfig) {
    this.config = config;
    this.baseUrl = `https://api.github.com/repos/${config.owner}/${config.repo}`;
  }

  async fetchComponents(): Promise<SpectrumComponent[]> {
    try {
      // Get the directory structure of the Spectrum 2 components
      const componentsPath = `${this.config.path}`;
      const response = await this.fetchGitHubAPI(`/contents/${componentsPath}`);
      
      if (!Array.isArray(response)) {
        throw new Error('Expected directory listing');
      }

      const components: SpectrumComponent[] = [];
      
      // Process each component directory
      for (const item of response) {
        if (item.type === 'dir') {
          try {
            const component = await this.parseComponent(item.name, item.path);
            if (component) {
              components.push(component);
            }
          } catch (error) {
            console.warn(`Failed to parse component ${item.name}:`, error);
          }
        }
      }

      return components;
    } catch (error) {
      console.error('Failed to fetch components from GitHub:', error);
      return [];
    }
  }

  private async parseComponent(componentName: string, componentPath: string): Promise<SpectrumComponent | null> {
    try {
      // Fetch component files
      const files = await this.fetchGitHubAPI(`/contents/${componentPath}`);
      if (!Array.isArray(files)) return null;

      // Look for key files
      const srcFile = files.find(f => f.name === 'src' && f.type === 'dir');
      const packageFile = files.find(f => f.name === 'package.json');
      const readmeFile = files.find(f => f.name.toLowerCase().includes('readme'));

      let description = `${componentName} component from Adobe Spectrum 2`;
      let props: ComponentProp[] = [];
      let examples: ComponentExample[] = [];

      // Parse package.json for description
      if (packageFile) {
        try {
          const packageData = await this.fetchFileContent(packageFile.download_url);
          const pkg = JSON.parse(packageData);
          if (pkg.description) {
            description = pkg.description;
          }
        } catch (e) {
          console.warn(`Failed to parse package.json for ${componentName}`);
        }
      }

      // Parse README for examples and documentation
      if (readmeFile) {
        try {
          const readmeContent = await this.fetchFileContent(readmeFile.download_url);
          examples = this.extractExamplesFromReadme(readmeContent);
        } catch (e) {
          console.warn(`Failed to parse README for ${componentName}`);
        }
      }

      // Parse TypeScript files for props
      if (srcFile) {
        try {
          const srcFiles = await this.fetchGitHubAPI(`/contents/${srcFile.path}`);
          if (Array.isArray(srcFiles)) {
            for (const file of srcFiles) {
              if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
                try {
                  const content = await this.fetchFileContent(file.download_url);
                  const extractedProps = this.extractPropsFromTypeScript(content);
                  props.push(...extractedProps);
                } catch (e) {
                  console.warn(`Failed to parse ${file.name} for ${componentName}`);
                }
              }
            }
          }
        } catch (e) {
          console.warn(`Failed to parse src directory for ${componentName}`);
        }
      }

      return {
        name: componentName,
        category: this.inferCategory(componentName),
        description,
        props: this.deduplicateProps(props),
        examples,
        accessibility: {
          ariaLabels: this.extractAriaLabels(props),
          keyboardSupport: [],
          screenReaderSupport: "Standard screen reader support"
        },
        designTokens: []
      };
    } catch (error) {
      console.error(`Error parsing component ${componentName}:`, error);
      return null;
    }
  }

  private async fetchGitHubAPI(path: string): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Spectrum2-MCP-Server'
    };

    if (this.config.token) {
      headers['Authorization'] = `token ${this.config.token}`;
    }

    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private async fetchFileContent(downloadUrl: string): Promise<string> {
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }
    return response.text();
  }

  private extractPropsFromTypeScript(content: string): ComponentProp[] {
    const props: ComponentProp[] = [];
    
    // Look for interface definitions
    const interfaceRegex = /interface\s+(\w+Props)\s*{([^}]+)}/g;
    let match;
    
    while ((match = interfaceRegex.exec(content)) !== null) {
      const interfaceBody = match[2];
      const propRegex = /(\w+)(\?)?:\s*([^;]+);/g;
      let propMatch;
      
      while ((propMatch = propRegex.exec(interfaceBody)) !== null) {
        const [, name, optional, type] = propMatch;
        
        // Extract JSDoc comments if present
        const lines = interfaceBody.split('\n');
        const propLineIndex = lines.findIndex(line => line.includes(`${name}:`));
        let description = `${name} property`;
        
        if (propLineIndex > 0) {
          const prevLine = lines[propLineIndex - 1]?.trim();
          if (prevLine?.startsWith('*') || prevLine?.startsWith('//')) {
            description = prevLine.replace(/^\*\s*/, '').replace(/^\/\/\s*/, '');
          }
        }

        props.push({
          name,
          type: type.trim(),
          required: !optional,
          description,
          options: this.extractTypeOptions(type.trim())
        });
      }
    }

    return props;
  }

  private extractTypeOptions(type: string): string[] | undefined {
    // Extract union type options like "primary" | "secondary" | "accent"
    const unionMatch = type.match(/^"([^"]+)"\s*\|\s*"([^"]+)"(?:\s*\|\s*"([^"]+)")*$/);
    if (unionMatch) {
      return type.split('|').map(t => t.trim().replace(/"/g, ''));
    }
    return undefined;
  }

  private extractExamplesFromReadme(content: string): ComponentExample[] {
    const examples: ComponentExample[] = [];
    
    // Look for code blocks in markdown
    const codeBlockRegex = /```(?:tsx?|jsx?|javascript|typescript)?\n([\s\S]*?)\n```/g;
    let match;
    let exampleIndex = 1;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const code = match[1].trim();
      if (code.includes('<') && code.includes('>')) { // Likely JSX/TSX
        examples.push({
          title: `Example ${exampleIndex}`,
          description: `Usage example from documentation`,
          code
        });
        exampleIndex++;
      }
    }

    return examples;
  }

  private extractAriaLabels(props: ComponentProp[]): string[] {
    return props
      .filter(prop => prop.name.toLowerCase().includes('aria'))
      .map(prop => prop.name);
  }

  private deduplicateProps(props: ComponentProp[]): ComponentProp[] {
    const seen = new Set<string>();
    return props.filter(prop => {
      if (seen.has(prop.name)) {
        return false;
      }
      seen.add(prop.name);
      return true;
    });
  }

  private inferCategory(componentName: string): string {
    const name = componentName.toLowerCase();
    
    if (name.includes('button') || name.includes('action')) return 'Actions';
    if (name.includes('text') || name.includes('input') || name.includes('form')) return 'Forms';
    if (name.includes('nav') || name.includes('link') || name.includes('breadcrumb')) return 'Navigation';
    if (name.includes('dialog') || name.includes('modal') || name.includes('popover')) return 'Overlays';
    if (name.includes('flex') || name.includes('grid') || name.includes('layout')) return 'Layout';
    
    return 'Components';
  }
}