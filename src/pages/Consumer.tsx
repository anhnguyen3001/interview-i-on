import { LS_CONTENT_KEY, ROOT_ID, BuilderComponent } from "modules/core";
import { componentDict } from "modules/page-builder";

export const Consumer = () => {
  const content = JSON.parse(localStorage.getItem(LS_CONTENT_KEY) || "{}");

  return (
    <BuilderComponent
      rootId={ROOT_ID}
      content={content}
      componentDict={componentDict}
    />
  );
};
