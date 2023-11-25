import { useRef } from "react";
import { UserElement } from "../types";
import { useDispatch } from "react-redux";
import { builderActions } from "../builderSlice";
import { generateRandomId } from "../utils";

export const useEditor = () => {
  const dispatch = useDispatch();

  const dragItemRef = useRef<object>();

  const createNode = (el: HTMLElement, userElement: UserElement) => {
    if (!el) return;

    el.setAttribute("draggable", "true");

    const handleDragStart = () => {
      dragItemRef.current = userElement.craft;
    };

    const handleDragEnd = () => {
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

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
      dispatch(builderActions.selectNode(id));
    };

    el.addEventListener("click", handleClick);

    return () => {
      el.removeEventListener("click", handleClick);
    };
  };

  return {
    createNode,
    connectNode,
  };
};
