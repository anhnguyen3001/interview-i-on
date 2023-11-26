import { useEditor } from "modules/builder/contexts";
import { PBContentInterface, BuilderComponent } from "modules/core";
import { useEffect } from "react";

interface DndFrameProps {
  content: PBContentInterface;
}

export const DndFrame: React.FC<DndFrameProps> = ({ content: initContent }) => {
  const { content, setContent, resolvers } = useEditor();

  useEffect(() => {
    setContent(initContent);
    // eslint-disable-next-line
  }, [JSON.stringify(initContent || {})]);

  return <BuilderComponent content={content} componentDict={resolvers} />;
};
