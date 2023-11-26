import { redoDepth, undoDepth } from "@tiptap/pm/history";
import { useEditor as useEditorTT } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { useProp } from "modules/builder/hooks";
import { useEditor, useInternalNode } from "modules/builder/contexts";
import StarterKit from "@tiptap/starter-kit";

const ADD_TO_HISTORY_KEY = "addToHistory";

export const useCustomTiptap = (propKey: string) => {
  const { selectedNode } = useEditor();
  const { id } = useInternalNode();

  const [text, setText] = useProp(propKey);

  const isActive = selectedNode === id;

  const editor = useEditorTT({
    extensions: [StarterKit],
    content: text,
  });

  const [isEditable, setIsEditable] = useState(false);

  /**
   * Lưu giá trị của text mới nhất để truy cập trong eventListener click ngoài builder (header, sidebar)
   */
  const editingTextRef = useRef<string>();
  const savedTextRef = useRef<string>(text);

  useEffect(() => {
    if (!editor) return;

    editor.on("update", ({ editor }) => {
      editingTextRef.current = editor.getHTML();
    });
  }, [editor]);

  useEffect(() => {
    if (!isActive) {
      setIsEditable(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (!editor) return;

    const { isEditable, isFocused, commands } = editor;

    if (isEditable && !isFocused) {
      commands.focus("end");
    }
    // eslint-disable-next-line
  }, [editor?.isEditable]);

  useEffect(() => {
    if (!editor) return;

    editor.setEditable(isEditable);

    // Reset history Tiptap khi focus vào component
    if (isEditable) {
      const { state } = editor;

      const noHistoryEvents = undoDepth(state) === 0 && redoDepth(state) === 0;

      if (!noHistoryEvents) {
        editor
          .chain()
          .setContent(editor.getHTML(), false, {
            preserveWhitespace: "full",
          })
          .setMeta(ADD_TO_HISTORY_KEY, false)
          .run();
      }
    }
    // eslint-disable-next-line
  }, [editor, isEditable]);

  // Lưu text vào pbContent khi click ngoài builder & ngoài component trong builder
  useEffect(() => {
    if (!editor) return;

    if (isEditable) {
      // Xử lý click ngoài builder
      const handleClickOutsideBuilder = () => {
        setIsEditable(false);

        const editorText = editingTextRef.current;

        if (editorText !== savedTextRef.current) {
          setText(editorText);
        }
      };

      document.addEventListener("mousedown", handleClickOutsideBuilder);

      return () => {
        document.removeEventListener("mousedown", handleClickOutsideBuilder);
      };
    } else {
      // Xử lý click ngoài component trong builder
      const editorText = editor.getHTML();
      if (text !== editorText) {
        setText(editorText);
      }
    }
    // eslint-disable-next-line
  }, [editor, isEditable]);

  return { editor, isEditable, setIsEditable };
};
