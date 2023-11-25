export interface IUserElement {
  craft: Partial<IUserElementConfig>;
}

export interface IUserElementConfig {
  id: string;
  tag: string;
  isCanvas?: boolean;
  props?: object;
  related?: object;
}
