export interface UserElement {
  craft: Partial<NodeElement>;
}

export interface NodeElement {
  id: string;
  tag: string;
  props?: object;
  related?: object;
}
