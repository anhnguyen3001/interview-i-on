import { Root } from "./ui";
import { withSelector } from "modules/builder/hoc";
import { COMP_TAG } from "modules/core";

export const RootEditor = withSelector(Root, {
  tag: COMP_TAG.ROOT,
  isCanvas: true,
});
