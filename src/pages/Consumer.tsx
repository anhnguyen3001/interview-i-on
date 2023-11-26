import { LS_CONTENT_KEY, BuilderComponent } from "modules/core";
import { componentDict } from "modules/page-builder";

export const Consumer = () => {
  const content = JSON.parse(localStorage.getItem(LS_CONTENT_KEY) || "{}");

  return <BuilderComponent content={content} componentDict={componentDict} />;
};
