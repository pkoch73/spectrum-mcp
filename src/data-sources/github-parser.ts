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
      // Get the src directory where actual components are located
      const componentsPath = `${this.config.path}/src`;
      const response = await this.fetchGitHubAPI(`/contents/${componentsPath}`);
      
      if (!Array.isArray(response)) {
        throw new Error('Expected directory listing');
      }

      const components: SpectrumComponent[] = [];
      
      // Process each component file
      for (const item of response) {
        if (item.type === 'file' && (item.name.endsWith('.tsx') || item.name.endsWith('.ts'))) {
          try {
            const componentName = item.name.replace(/\.(tsx?|jsx?)$/, '');
            const component = await this.parseComponentFile(componentName, item.download_url);
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

  private async parseComponentFile(componentName: string, downloadUrl: string): Promise<SpectrumComponent | null> {
    try {
      // Fetch the component file content
      const content = await this.fetchFileContent(downloadUrl);
      
      // Extract props from TypeScript interfaces
      const props = this.extractPropsFromTypeScript(content);
      
      // Extract examples from JSDoc comments or inline examples
      const examples = this.extractExamplesFromCode(content, componentName);
      
      // Extract description from JSDoc or comments
      const description = this.extractDescriptionFromCode(content, componentName);

      return {
        name: componentName,
        category: this.inferCategory(componentName),
        description,
        props: this.deduplicateProps(props),
        examples,
        accessibility: {
          ariaLabels: this.extractAriaLabels(props),
          keyboardSupport: this.extractKeyboardSupport(content),
          screenReaderSupport: "Standard screen reader support"
        },
        designTokens: this.extractDesignTokens(content)
      };
    } catch (error) {
      console.error(`Error parsing component file ${componentName}:`, error);
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
    
    // Look for interface definitions (Props interfaces)
    const interfaceRegex = /interface\s+(\w*Props?)\s*(?:extends\s+[\w<>,\s]+)?\s*{([^}]+)}/gs;
    let match;
    
    while ((match = interfaceRegex.exec(content)) !== null) {
      const interfaceName = match[1];
      const interfaceBody = match[2];
      
      // Skip if this doesn't look like a props interface
      if (!interfaceName.toLowerCase().includes('prop')) continue;
      
      this.extractPropsFromInterfaceBody(interfaceBody, props);
    }

    // Also look for type definitions
    const typeRegex = /type\s+(\w*Props?)\s*=\s*{([^}]+)}/gs;
    while ((match = typeRegex.exec(content)) !== null) {
      const typeName = match[1];
      const typeBody = match[2];
      
      if (!typeName.toLowerCase().includes('prop')) continue;
      
      this.extractPropsFromInterfaceBody(typeBody, props);
    }

    // Look for function component props in function signatures
    const functionRegex = /function\s+\w+\s*\(\s*(?:props\s*:\s*)?{([^}]+)}\s*\)/gs;
    while ((match = functionRegex.exec(content)) !== null) {
      this.extractPropsFromInterfaceBody(match[1], props);
    }

    return props;
  }

  private extractPropsFromInterfaceBody(interfaceBody: string, props: ComponentProp[]): void {
    // Handle multi-line prop definitions with JSDoc comments
    const lines = interfaceBody.split('\n').map(line => line.trim());
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip empty lines and comments
      if (!line || line.startsWith('//') || line.startsWith('*')) continue;
      
      // Match prop definition: propName?: type;
      const propMatch = line.match(/^(\w+)(\?)?:\s*([^;,]+)[;,]?$/);
      if (!propMatch) continue;
      
      const [, name, optional, type] = propMatch;
      
      // Look for JSDoc comment above this prop
      let description = `${name} property`;
      for (let j = i - 1; j >= 0; j--) {
        const prevLine = lines[j];
        if (!prevLine) break;
        
        if (prevLine.startsWith('*') && !prevLine.startsWith('*/')) {
          description = prevLine.replace(/^\*\s*/, '').trim();
          break;
        } else if (prevLine.startsWith('//')) {
          description = prevLine.replace(/^\/\/\s*/, '').trim();
          break;
        } else if (prevLine.includes('*/')) {
          break;
        }
      }

      const cleanType = type.trim();
      props.push({
        name,
        type: cleanType,
        required: !optional,
        description,
        options: this.extractTypeOptions(cleanType),
        defaultValue: this.extractDefaultValue(cleanType)
      });
    }
  }

  private extractDefaultValue(type: string): string | undefined {
    // Look for default values in union types or comments
    if (type.includes('=')) {
      const defaultMatch = type.match(/=\s*([^|,\s]+)/);
      if (defaultMatch) {
        return defaultMatch[1].replace(/['"]/g, '');
      }
    }
    return undefined;
  }

  private extractTypeOptions(type: string): string[] | undefined {
    // Extract union type options like "primary" | "secondary" | "accent"
    const unionMatch = type.match(/^"([^"]+)"\s*\|\s*"([^"]+)"(?:\s*\|\s*"([^"]+)")*$/);
    if (unionMatch) {
      return type.split('|').map(t => t.trim().replace(/"/g, ''));
    }
    return undefined;
  }

  private extractExamplesFromCode(content: string, componentName: string): ComponentExample[] {
    const examples: ComponentExample[] = [];
    
    // Look for JSDoc examples
    const jsdocExampleRegex = /@example\s*\n\s*\*\s*([\s\S]*?)(?=\*\/|\*\s*@)/g;
    let match;
    let exampleIndex = 1;
    
    while ((match = jsdocExampleRegex.exec(content)) !== null) {
      const code = match[1]
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, ''))
        .join('\n')
        .trim();
      
      if (code.includes('<') && code.includes(componentName)) {
        examples.push({
          title: `Example ${exampleIndex}`,
          description: `Usage example from JSDoc`,
          code
        });
        exampleIndex++;
      }
    }

    // Look for inline examples in comments
    const inlineExampleRegex = /\/\*\*[\s\S]*?Example:?\s*\n([\s\S]*?)\*\//g;
    while ((match = inlineExampleRegex.exec(content)) !== null) {
      const code = match[1]
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, ''))
        .join('\n')
        .trim();
      
      if (code.includes('<') && code.includes(componentName)) {
        examples.push({
          title: `Inline Example ${exampleIndex}`,
          description: `Usage example from inline documentation`,
          code
        });
        exampleIndex++;
      }
    }

    // Generate basic example if none found
    if (examples.length === 0) {
      examples.push({
        title: 'Basic Usage',
        description: `Basic ${componentName} usage`,
        code: `<${componentName}>${componentName === 'Button' ? 'Click me' : 'Content'}</${componentName}>`
      });
    }

    return examples;
  }

  private extractDescriptionFromCode(content: string, componentName: string): string {
    // Look for JSDoc description at the top of the file or before the main export
    const jsdocRegex = /\/\*\*\s*\n\s*\*\s*(.*?)(?:\n\s*\*\s*@|\n\s*\*\/)/;
    const match = jsdocRegex.exec(content);
    
    if (match && match[1]) {
      return match[1].trim();
    }

    // Look for component description in comments
    const componentRegex = new RegExp(`\/\*\*[\\s\\S]*?${componentName}[\\s\\S]*?\*\/`);
    const componentMatch = componentRegex.exec(content);
    
    if (componentMatch) {
      const description = componentMatch[0]
        .replace(/\/\*\*|\*\//g, '')
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, ''))
        .join(' ')
        .trim();
      
      if (description.length > 10) {
        return description;
      }
    }

    return `${componentName} component from Adobe Spectrum 2`;
  }

  private extractKeyboardSupport(content: string): string[] {
    const keyboardSupport: string[] = [];
    
    // Look for keyboard event handlers
    if (content.includes('onKeyDown') || content.includes('onKeyUp')) {
      keyboardSupport.push('Enter', 'Space');
    }
    
    if (content.includes('ArrowUp') || content.includes('ArrowDown')) {
      keyboardSupport.push('Arrow keys');
    }
    
    if (content.includes('Escape')) {
      keyboardSupport.push('Escape');
    }
    
    if (content.includes('Tab')) {
      keyboardSupport.push('Tab');
    }

    return keyboardSupport.length > 0 ? keyboardSupport : ['Tab', 'Enter'];
  }

  private extractDesignTokens(content: string): any[] {
    const tokens: any[] = [];
    
    // Look for CSS custom properties or design token references
    const tokenRegex = /--spectrum-[\w-]+/g;
    const matches = content.match(tokenRegex);
    
    if (matches) {
      const uniqueTokens = [...new Set(matches)];
      tokens.push(...uniqueTokens.map(token => ({
        name: token,
        value: `var(${token})`,
        category: 'color',
        description: `Design token for ${token.replace('--spectrum-', '').replace(/-/g, ' ')}`
      })));
    }

    return tokens;
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
    
    // Actions
    if (name.includes('button') || name.includes('action')) return 'Actions';
    
    // Forms
    if (name.includes('textfield') || name.includes('textarea') || name.includes('input') || 
        name.includes('checkbox') || name.includes('radio') || name.includes('select') ||
        name.includes('slider') || name.includes('switch') || name.includes('form')) return 'Forms';
    
    // Navigation
    if (name.includes('nav') || name.includes('link') || name.includes('breadcrumb') ||
        name.includes('tabs') || name.includes('menu')) return 'Navigation';
    
    // Overlays
    if (name.includes('dialog') || name.includes('modal') || name.includes('popover') ||
        name.includes('tooltip') || name.includes('alert')) return 'Overlays';
    
    // Layout
    if (name.includes('flex') || name.includes('grid') || name.includes('layout') ||
        name.includes('divider') || name.includes('header') || name.includes('footer')) return 'Layout';
    
    // Content
    if (name.includes('text') || name.includes('heading') || name.includes('image') ||
        name.includes('avatar') || name.includes('badge') || name.includes('tag')) return 'Content';
    
    // Collections
    if (name.includes('list') || name.includes('table') || name.includes('tree') ||
        name.includes('accordion') || name.includes('card')) return 'Collections';
    
    // Status
    if (name.includes('progress') || name.includes('meter') || name.includes('status') ||
        name.includes('indicator')) return 'Status';
    
    return 'Components';
  }
}