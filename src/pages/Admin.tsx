import styled from "@emotion/styled";
import { DndFrame, builderActions, selectContent } from "modules/builder";
import { LS_CONTENT_KEY, ROOT_ID } from "modules/core";
import {
  BuilderHeader,
  DEFAULT_CONTENT,
  Editor,
  SettingSidebar,
  ToolBox,
  draggableElements,
  resolvers,
} from "modules/page-builder";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Admin = () => {
  const content = useSelector(selectContent);
  const dispatch = useDispatch();

  useEffect(() => {
    let pbContent;

    try {
      pbContent = JSON.parse(localStorage.getItem(LS_CONTENT_KEY));
    } catch {}

    if (!Object.keys(pbContent || {}).length) {
      pbContent = DEFAULT_CONTENT;
    }

    dispatch(builderActions.setContent(pbContent || DEFAULT_CONTENT));
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <BuilderHeader />
      <Viewport>
        <ToolBox elements={draggableElements} />
        <Editor>
          <DndFrame rootId={ROOT_ID} content={content} resolvers={resolvers} />
        </Editor>
        <SettingSidebar />
      </Viewport>
    </Wrapper>
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
