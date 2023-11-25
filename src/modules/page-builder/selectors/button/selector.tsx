import { withSelector } from "modules/builder/hoc";
import { DEFAULT_BUTTON } from "./constants";
import { Button } from "./ui";
import { COMP_TAG } from "modules/core";
import { Setting } from "./setting";

export const ButtonEditor = withSelector(Button, {
  tag: COMP_TAG.BUTTON,
  props: DEFAULT_BUTTON,
  related: {
    customAttributes: Setting,
  },
});
