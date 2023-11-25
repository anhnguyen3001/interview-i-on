import React from "react";
import { EditorContent } from "./EditorContent";
import { useCustomTiptap } from "./hooks";

interface TipTapEditorProps {
  children?: React.ReactElement;
  propKey: string;
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({
  propKey,
  ...rest
}) => {
  const { editor, setIsEditable } = useCustomTiptap(propKey);

  return (
    <EditorContent editor={editor} setIsEditable={setIsEditable} {...rest} />
  );
};
