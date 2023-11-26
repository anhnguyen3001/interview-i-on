import { withSelector } from "modules/builder/hoc";
import { DEFAULT_PARAGRAPH } from "./constants";
import { Paragraph } from "./ui";
import { COMP_TAG } from "modules/core";
import { TipTapEditor } from "modules/builder";

export const ParagraphEditor = withSelector(
  (props) => (
    <TipTapEditor propKey="text">
      <Paragraph {...props} />
    </TipTapEditor>
  ),
  {
    tag: COMP_TAG.PARAGRAPH,
    props: DEFAULT_PARAGRAPH,
  }
);
