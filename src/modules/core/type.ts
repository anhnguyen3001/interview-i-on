export interface PBComponent {
  id: string;
  // Key to map component in builder & consumer
  tag?: string;
  children?: string[];
  props?: object;
  isCanvas?: boolean;
}

export interface PBContentInterface {
  [key: string]: PBComponent;
}

export type ComponentDictInterface = Record<string, React.ComponentType>;
