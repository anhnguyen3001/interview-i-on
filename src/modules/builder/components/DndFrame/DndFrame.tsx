import { PBContentInterface, BuilderComponent } from "modules/core";

interface DndFrameProps {
  rootId: string;
  content: PBContentInterface;
  resolvers: Record<string, React.ComponentType>;
}

export const DndFrame: React.FC<DndFrameProps> = ({ resolvers, ...rest }) => {
  return <BuilderComponent componentDict={resolvers} {...rest} />;
};
