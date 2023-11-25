import styled from "@emotion/styled";
import {
  EditorContent as BaseEditorContent,
  EditorContentProps as BaseEditorContentProps,
} from "@tiptap/react";
import React from "react";

export interface EditorContentProps
  extends Pick<BaseEditorContentProps, "editor"> {
  children?: React.ReactElement;
  className?: string;
  setIsEditable?: (isEditable: boolean) => void;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  children,
  className,
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
        ? React.cloneElement(children, { className }, editorContent)
        : editorContent}
    </div>
  );
};

const StyledBaseEditorContent = styled(BaseEditorContent)`
  min-width: 8px;
  max-width: 100%;

  .ProseMirror[contenteditable="true"] {
    cursor: text !important;
  }

  a {
    pointer-events: none;
  }
`;
