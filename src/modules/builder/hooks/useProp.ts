import { useInternalNode } from "../contexts";

export const useProp = (propKey: string) => {
  const { getProp, setProp: coreSetProp } = useInternalNode();

  const value = getProp(propKey);

  const setProp = (value: any) => {
    coreSetProp(propKey, value);
  };

  return [value, setProp];
};
