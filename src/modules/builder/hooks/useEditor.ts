import { useRef } from "react";
import { IUserElement } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { builderActions, selectContent } from "../builderSlice";
import { generateRandomId } from "../utils";

export const useEditor = () => {
  const dispatch = useDispatch();

  const content = useSelector(selectContent);

  const dragItemRef = useRef<object>();

  const createNode = (el: HTMLElement, userElement: IUserElement) => {
    if (!el) return;

    el.setAttribute("draggable", "true");

    const handleDragStart = () => {
      const { props, tag } = userElement.craft;
      dragItemRef.current = { props, tag };
    };

    const handleDragEnd = (e: DragEvent) => {
      const item = dragItemRef.current;

      if (!item) return;

      dispatch(
        builderActions.addNode({
          id: generateRandomId(),
          ...item,
        })
      );
      dragItemRef.current = undefined;
    };

    el.addEventListener("dragstart", handleDragStart);
    el.addEventListener("dragend", handleDragEnd);
  };

  const connectNode = (el: HTMLElement, id: string) => {
    if (!el) return;

    const isCanvasNode = content[id].isCanvas;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    if (isCanvasNode) {
      el.addEventListener("dragover", handleDragOver);
    }

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(builderActions.selectNode(id));
    };

    el.addEventListener("click", handleClick);

    return () => {
      el.removeEventListener("click", handleClick);
      el.removeEventListener("dragover", handleDragOver);
    };
  };

  return {
    createNode,
    connectNode,
  };
};
