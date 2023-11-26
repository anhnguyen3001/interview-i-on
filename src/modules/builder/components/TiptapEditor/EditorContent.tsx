import styled from "@emotion/styled";
import {
  EditorContent as BaseEditorContent,
  EditorContentProps as BaseEditorContentProps,
} from "@tiptap/react";
import React from "react";

export interface EditorContentProps
  extends Pick<BaseEditorContentProps, "editor"> {
  children?: React.ReactElement;
  setIsEditable?: (isEditable: boolean) => void;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  children,
  setIsEditable,
  editor,
  ...rest
}) => {
  const editorContent = <StyledBaseEditorContent editor={editor} />;

  const onEnableEditorMode = () => {
    setIsEditable(true);
  };

  return (
    <div
      onDrag={() => setIsEditable(false)}
      onMouseUp={onEnableEditorMode}
      {...rest}
    >
      {children
        ? React.cloneElement(children, { children: editorContent })
        : editorContent}
    </div>
  );
};

const StyledBaseEditorContent = styled(BaseEditorContent)`
  min-width: 100%;
  width: 120px;

  .ProseMirror {
    width: 100%;
    cursor: text !important;
  }
`;
