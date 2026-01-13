"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { RichTextProvider } from "reactjs-tiptap-editor";
import { useMemo } from "react";
import { buildExtensions } from "./extension";

type Props = {
  content: string;
};

export const RichTextViewer = ({ content }: Props) => {
  const extensions = useMemo(() => buildExtensions(), []);

  const editor = useEditor({
    extensions,
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <RichTextProvider editor={editor}>
      <div className="rich-text-viewer">
        <EditorContent editor={editor} />
      </div>
    </RichTextProvider>
  );
};
