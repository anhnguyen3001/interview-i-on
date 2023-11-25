import styled from "@emotion/styled";
import { PBContentInterface, BuilderComponent } from "modules/core";
import { useRef } from "react";

interface DndFrameProps {
  rootId: string;
  content: PBContentInterface;
  resolvers: Record<string, React.ComponentType>;
}

export const DndFrame: React.FC<DndFrameProps> = ({ resolvers, ...rest }) => {
  const frameRef = useRef<HTMLDivElement>();

  return (
    <Wrapper ref={frameRef} onDragOver={(e) => e.preventDefault()}>
      <BuilderComponent componentDict={resolvers} {...rest} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
