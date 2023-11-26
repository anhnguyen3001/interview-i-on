import {
  ComponentDictInterface,
  PBComponent,
  PBContentInterface,
} from "modules/core";
import { createContext, useContext, useState } from "react";

import get from "lodash.get";
import set from "lodash.set";
import clonedeep from "lodash.clonedeep";
import { generateRandomId } from "../utils";
import { IUserElement } from "../types";

interface EditorContextProps {
  children: React.ReactNode;
  resolvers: ComponentDictInterface;
}

interface IEditorState extends Partial<Pick<EditorContextProps, "resolvers">> {
  content?: PBContentInterface;
  setContent?: React.Dispatch<PBContentInterface>;

  addNode?: (parentId: string, node: PBComponent) => void;
  createNode?: (el: HTMLElement, userElement: IUserElement) => void;
  connectNode?: (el: HTMLElement, id: string) => void;

  getNode?: (id: string, key?: string | string[]) => any;
  setNode?: (id: string, key: string | string[], value: any) => void;

  selectedNode?: string;
  selectNode?: React.Dispatch<string>;

  relatedMapping?: object;
  setRelated?: (id: string, related: object) => void;
}

const EditorContext = createContext<IEditorState>({});

export const EditorProvider: React.FC<EditorContextProps> = ({
  children,
  resolvers,
}) => {
  const [pbContent, setPbContent] = useState<PBContentInterface>();

  const [selectedNode, setSelectedNode] = useState<string>();

  const [relatedMapping, setRelatedMapping] = useState<object>();

  const addNode = (parentId: string, node: Partial<PBComponent>) => {
    if (!pbContent?.[parentId]) return;

    const newPbContent = clonedeep(pbContent);

    const id = node.id || generateRandomId();

    set(newPbContent, id, {
      id,
      children: [],
      ...node,
    });

    // Add node to last children of parent
    const parentChildren = newPbContent[parentId].children || [];
    newPbContent[parentId].children = [...parentChildren, id];

    setPbContent(newPbContent);
  };

  // Add event handler to create node when DnD
  const createNode = (el: HTMLElement, userElement: IUserElement) => {
    if (!el) return;

    el.setAttribute("draggable", "true");

    el.ondragstart = (e: DragEvent) => {
      const { props, tag } = userElement.craft;

      e.dataTransfer.setData("dragItem", JSON.stringify({ props, tag }));
    };
  };

  const connectNode = (el: HTMLElement, id: string) => {
    if (!el) return;

    if (pbContent[id].isCanvas) {
      el.ondragover = (e: DragEvent) => {
        e.preventDefault();
      };

      // Add new node to tree when dropping new component
      el.ondrop = (e: DragEvent) => {
        try {
          const dragItem = JSON.parse(e.dataTransfer.getData("dragItem"));

          if (!dragItem) return;

          addNode(id, dragItem);
        } catch {
          console.warn("No element to drop");
        }
      };
    }

    // Handle select node
    el.onclick = (e: MouseEvent) => {
      e.stopPropagation();
      setSelectedNode(id);
    };
  };

  const setRelated = (id: string, related: object) => {
    if (!Object.keys(related || {})) return;

    setRelatedMapping({
      ...(relatedMapping || {}),
      [id]: related,
    });
  };

  const getNode = (id: string, key?: string | string[]) => {
    if (!key) return pbContent[id];

    return get(pbContent[id], key);
  };

  const setNode = (id: string, key: string | string[], value: any) => {
    if (!pbContent[id]) return;
    const newPbContent = clonedeep(pbContent);

    set(newPbContent[id], key, value);

    setPbContent(newPbContent);
  };

  return (
    <EditorContext.Provider
      value={{
        content: pbContent,
        setContent: setPbContent,
        resolvers,
        addNode,
        createNode,
        connectNode,
        selectedNode,
        relatedMapping,
        getNode,
        setNode,
        setRelated,
        selectNode: setSelectedNode,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);

  return context;
};
