import styled from "@emotion/styled";
import { DndFrame, EditorProvider } from "modules/builder";
import { LS_CONTENT_KEY } from "modules/core";
import {
  BuilderHeader,
  DEFAULT_CONTENT,
  Editor,
  SettingSidebar,
  ToolBox,
  draggableElements,
  resolvers,
} from "modules/page-builder";

export const Admin = () => {
  return (
    <EditorProvider resolvers={resolvers}>
      <Wrapper>
        <BuilderHeader />
        <Viewport>
          <ToolBox elements={draggableElements} />
          <Editor>
            <DndFrame
              content={
                JSON.parse(localStorage.getItem(LS_CONTENT_KEY || "")) ||
                DEFAULT_CONTENT
              }
            />
          </Editor>
          <SettingSidebar />
        </Viewport>
      </Wrapper>
    </EditorProvider>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Viewport = styled.div`
  display: flex;
  flex: 1;
`;
