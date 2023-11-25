import {
  COMP_TAG,
  ComponentDictInterface,
  PBContentInterface,
  ROOT_ID,
} from "modules/core";
import {
  Button,
  ButtonEditor,
  Paragraph,
  ParagraphEditor,
  Root,
  RootEditor,
} from "./selectors";
import { IDraggableElement } from "./components";

export const DEFAULT_CONTENT: PBContentInterface = {
  [ROOT_ID]: {
    id: ROOT_ID,
    tag: COMP_TAG.ROOT,
    children: [],
  },
};

export const componentDict: ComponentDictInterface = {
  [COMP_TAG.ROOT]: Root,
  [COMP_TAG.BUTTON]: Button,
  [COMP_TAG.PARAGRAPH]: Paragraph,
};

export const resolvers: ComponentDictInterface = {
  [COMP_TAG.ROOT]: RootEditor,
  [COMP_TAG.BUTTON]: ButtonEditor,
  [COMP_TAG.PARAGRAPH]: ParagraphEditor,
};

export const draggableElements: IDraggableElement[] = [
  {
    name: "Button",
    selector: ButtonEditor,
  },
  {
    name: "Paragraph",
    selector: ParagraphEditor,
  },
];
