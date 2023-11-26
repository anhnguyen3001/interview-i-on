import React, { createContext, useContext, useEffect } from "react";
import { useEditor } from "./EditorContext";

interface InternalNodeProviderProps {
  children?: React.ReactNode;
  id?: string;
  related?: object;
}

interface IInternalNodeState {
  id?: string;
  connect?: (el: HTMLElement) => void;

  getProp?: (propKey: string) => any;
  setProp?: (propKey: string, value: any) => void;
}

const NodeContext = createContext<IInternalNodeState>({});

export const InternalNodeProvider = ({
  children,
  id,
  related,
}: InternalNodeProviderProps) => {
  const { setRelated, connectNode, getNode, setNode } = useEditor();

  useEffect(() => {
    if (!related) return;

    const newRelated = {};

    Object.entries(related).forEach(([key, comp]) => {
      newRelated[key] = () =>
        React.createElement(
          InternalNodeProvider,
          {
            id,
          },
          React.createElement(comp)
        );
    });

    setRelated(id, newRelated);
    // eslint-disable-next-line
  }, []);

  const connect = (el: HTMLElement) => {
    connectNode(el, id);
  };

  const getProp = (propKey: string) => {
    return getNode(id, ["props", propKey]);
  };

  const setProp = (propKey: string, value: any) => {
    setNode(id, ["props", propKey], value);
  };

  return (
    <NodeContext.Provider value={{ id, connect, getProp, setProp }}>
      {children}
    </NodeContext.Provider>
  );
};

export const useInternalNode = () => {
  const context = useContext(NodeContext);

  return context;
};
