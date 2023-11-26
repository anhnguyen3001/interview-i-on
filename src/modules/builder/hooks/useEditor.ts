import { IUserElement } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { builderActions, selectContent } from "../builderSlice";
import { generateRandomId } from "../utils";

export const useEditor = () => {
  const dispatch = useDispatch();

  const content = useSelector(selectContent);

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

    if (content[id].isCanvas) {
      el.ondragover = (e: DragEvent) => {
        e.preventDefault();
      };

      // Add new node to tree when dropping new component
      el.ondrop = (e: DragEvent) => {
        try {
          const dragItem = JSON.parse(e.dataTransfer.getData("dragItem"));

          if (!dragItem) return;

          dispatch(
            builderActions.addNode({
              parentId: id,
              node: { id: generateRandomId(), ...dragItem },
            })
          );
        } catch {}
      };
    }

    // Handle select node
    el.onclick = (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(builderActions.selectNode(id));
    };
  };

  return {
    createNode,
    connectNode,
  };
};
