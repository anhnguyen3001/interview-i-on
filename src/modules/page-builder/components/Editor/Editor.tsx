import styled from "@emotion/styled";
import React from "react";
import { MemoizedIFrame } from "./IFrame";

interface EditorProps {
  children: React.ReactNode;
}

export const Editor: React.FC<EditorProps> = ({ children }) => {
  return (
    <Wrapper>
      <MemoizedIFrame>{children}</MemoizedIFrame>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #f3f3f3;
`;
