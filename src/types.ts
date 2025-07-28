export interface SpectrumComponent {
  name: string;
  category: string;
  description: string;
  props: ComponentProp[];
  examples: ComponentExample[];
  accessibility: AccessibilityInfo;
  designTokens: DesignToken[];
}

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
  options?: string[];
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
  preview?: string;
}

export interface AccessibilityInfo {
  ariaLabels: string[];
  keyboardSupport: string[];
  screenReaderSupport: string;
}

export interface DesignToken {
  name: string;
  value: string;
  category: string;
  description: string;
}

export interface DataSource {
  name: string;
  type: 'github' | 'npm' | 'api' | 'local';
  config: Record<string, any>;
  parser: (data: any) => Promise<SpectrumComponent[]>;
}

export interface GitHubConfig {
  owner: string;
  repo: string;
  path: string;
  branch?: string;
  token?: string;
}

export interface Env {
  SPECTRUM_CACHE: KVNamespace;
  GITHUB_TOKEN?: string;
}