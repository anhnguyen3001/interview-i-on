import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { builderActions } from "../builderSlice";
import { useEditor } from "../hooks";
import React from "react";

interface InternalNodeProviderProps {
  children?: React.ReactNode;
  id?: string;
  related?: object;
}

interface IInternalNodeState {
  id?: string;
  connect?: (el: HTMLElement) => void;
}

const NodeContext = createContext<IInternalNodeState>({});

export const InternalNodeProvider = ({
  children,
  id,
  related,
}: InternalNodeProviderProps) => {
  const dispatch = useDispatch();

  const { connectNode: editorConnect } = useEditor();

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

    dispatch(
      builderActions.setRelatedMapping({
        id,
        related: newRelated,
      })
    );
    // eslint-disable-next-line
  }, []);

  const connect = (el: HTMLElement) => {
    editorConnect(el, id);
  };

  return (
    <NodeContext.Provider value={{ id, connect }}>
      {children}
    </NodeContext.Provider>
  );
};

export const useInternalNode = () => {
  const context = useContext(NodeContext);

  return context;
};
