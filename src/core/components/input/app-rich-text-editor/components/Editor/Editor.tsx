import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { RichTextProvider } from "reactjs-tiptap-editor";

// Base Kit
import { Document } from "@tiptap/extension-document";
import { HardBreak } from "@tiptap/extension-hard-break";
import { ListItem } from "@tiptap/extension-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  Dropcursor,
  Gapcursor,
  Placeholder,
  TrailingNode,
} from "@tiptap/extensions";

// build extensions
import {
  Attachment,
  RichTextAttachment,
} from "reactjs-tiptap-editor/attachment";
import {
  Blockquote,
  RichTextBlockquote,
} from "reactjs-tiptap-editor/blockquote";
import { Bold, RichTextBold } from "reactjs-tiptap-editor/bold";
import {
  BulletList,
  RichTextBulletList,
} from "reactjs-tiptap-editor/bulletlist";
import { Clear, RichTextClear } from "reactjs-tiptap-editor/clear";
import { Code, RichTextCode } from "reactjs-tiptap-editor/code";
import { CodeBlock, RichTextCodeBlock } from "reactjs-tiptap-editor/codeblock";
import { CodeView, RichTextCodeView } from "reactjs-tiptap-editor/codeview";
import { Color, RichTextColor } from "reactjs-tiptap-editor/color";
import {
  Column,
  ColumnNode,
  MultipleColumnNode,
  RichTextColumn,
} from "reactjs-tiptap-editor/column";
import { Drawer, RichTextDrawer } from "reactjs-tiptap-editor/drawer";
import { Emoji, RichTextEmoji } from "reactjs-tiptap-editor/emoji";
import {
  Excalidraw,
  RichTextExcalidraw,
} from "reactjs-tiptap-editor/excalidraw";
import { ExportPdf, RichTextExportPdf } from "reactjs-tiptap-editor/exportpdf";
import {
  ExportWord,
  RichTextExportWord,
} from "reactjs-tiptap-editor/exportword";
import {
  FontFamily,
  RichTextFontFamily,
} from "reactjs-tiptap-editor/fontfamily";
import { FontSize, RichTextFontSize } from "reactjs-tiptap-editor/fontsize";
import { Heading, RichTextHeading } from "reactjs-tiptap-editor/heading";
import { Highlight, RichTextHighlight } from "reactjs-tiptap-editor/highlight";
import {
  History,
  RichTextRedo,
  RichTextUndo,
} from "reactjs-tiptap-editor/history";
import {
  HorizontalRule,
  RichTextHorizontalRule,
} from "reactjs-tiptap-editor/horizontalrule";
import { Iframe, RichTextIframe } from "reactjs-tiptap-editor/iframe";
import { Image, RichTextImage } from "reactjs-tiptap-editor/image";
import {
  ImportWord,
  RichTextImportWord,
} from "reactjs-tiptap-editor/importword";
import { Indent, RichTextIndent } from "reactjs-tiptap-editor/indent";
import { Italic, RichTextItalic } from "reactjs-tiptap-editor/italic";
import { Katex, RichTextKatex } from "reactjs-tiptap-editor/katex";
import {
  LineHeight,
  RichTextLineHeight,
} from "reactjs-tiptap-editor/lineheight";
import { Link, RichTextLink } from "reactjs-tiptap-editor/link";
import { Mention } from "reactjs-tiptap-editor/mention";
import { Mermaid, RichTextMermaid } from "reactjs-tiptap-editor/mermaid";
import { MoreMark, RichTextMoreMark } from "reactjs-tiptap-editor/moremark";
import {
  OrderedList,
  RichTextOrderedList,
} from "reactjs-tiptap-editor/orderedlist";
import {
  RichTextSearchAndReplace,
  SearchAndReplace,
} from "reactjs-tiptap-editor/searchandreplace";
import { RichTextStrike, Strike } from "reactjs-tiptap-editor/strike";
import { RichTextTable, Table } from "reactjs-tiptap-editor/table";
import { RichTextTaskList, TaskList } from "reactjs-tiptap-editor/tasklist";
import { RichTextAlign, TextAlign } from "reactjs-tiptap-editor/textalign";
import {
  RichTextTextDirection,
  TextDirection,
} from "reactjs-tiptap-editor/textdirection";
import {
  RichTextUnderline,
  TextUnderline,
} from "reactjs-tiptap-editor/textunderline";
import { RichTextTwitter, Twitter } from "reactjs-tiptap-editor/twitter";
import { RichTextVideo, Video } from "reactjs-tiptap-editor/video";
import { RichTextCallout, Callout } from "reactjs-tiptap-editor/callout";

// Slash Command
import {
  SlashCommand,
  SlashCommandList,
} from "reactjs-tiptap-editor/slashcommand";

// Bubble
import {
  RichTextBubbleColumns,
  RichTextBubbleDrawer,
  RichTextBubbleExcalidraw,
  RichTextBubbleIframe,
  RichTextBubbleImage,
  RichTextBubbleKatex,
  RichTextBubbleLink,
  RichTextBubbleMermaid,
  RichTextBubbleTable,
  RichTextBubbleText,
  RichTextBubbleTwitter,
  RichTextBubbleVideo,
  RichTextBubbleMenuDragHandle,
  RichTextBubbleCallout,
} from "reactjs-tiptap-editor/bubble";

import "@excalidraw/excalidraw/index.css";
import "katex/dist/katex.min.css";
import "prism-code-editor-lightweight/layout.css";
import "prism-code-editor-lightweight/themes/github-dark.css";
import "reactjs-tiptap-editor/style.css";

import { EditorContent, useEditor } from "@tiptap/react";
import "katex/contrib/mhchem";
import { Count } from "./extension/Count";
import { buildExtensions } from "./extension";
import { Label } from "@/core/components/text/label";
import { cn } from "@/core/lib/utils";

const RichTextToolbar = () => {
  return (
    <div className="!border-border flex flex-wrap items-center gap-2 !border-b !border-solid !p-1">
      {/* BASIC EDIT */}
      <RichTextUndo />
      <RichTextRedo />
      {/* <RichTextSearchAndReplace /> ❌ tidak perlu untuk laporan */}
      <RichTextClear />

      {/* TEXT STYLE */}
      <RichTextFontFamily />
      <RichTextHeading />
      <RichTextFontSize />
      <RichTextBold />
      <RichTextItalic />
      <RichTextUnderline />
      <RichTextStrike />

      {/* <RichTextMoreMark /> ❌ tidak relevan */}
      {/* <RichTextEmoji /> ❌ tidak formal */}
      {/* <RichTextColor /> ❌ opsional, biasanya tidak dipakai */}
      {/* <RichTextHighlight /> ❌ opsional */}

      {/* LIST & ALIGN */}
      <RichTextBulletList />
      <RichTextOrderedList />
      <RichTextAlign />
      {/* <RichTextIndent /> ❌ jarang dipakai */}
      {/* <RichTextLineHeight /> ❌ opsional */}

      {/* CONTENT */}
      {/* <RichTextTaskList /> ❌ tidak relevan */}
      <RichTextLink />
      <RichTextImage />
      {/* <RichTextVideo /> ❌ jarang untuk laporan */}

      <RichTextBlockquote />
      <RichTextHorizontalRule />

      {/* <RichTextCode /> ❌ tidak relevan */}
      {/* <RichTextCodeBlock /> ❌ tidak relevan */}
      {/* <RichTextColumn /> ❌ layout kompleks */}
      <RichTextTable />

      {/* <RichTextIframe /> ❌ raw embed */}
      {/* <RichTextExportPdf /> ❌ export sebaiknya dari backend */}
      {/* <RichTextImportWord /> ❌ tidak perlu */}
      {/* <RichTextExportWord /> ❌ tidak perlu */}

      {/* <RichTextTextDirection /> ❌ default cukup */}
      {/* <RichTextAttachment /> ❌ upload file mentah */}
      {/* <RichTextKatex /> ❌ rumus */}
      {/* <RichTextExcalidraw /> ❌ gambar bebas */}
      {/* <RichTextMermaid /> ❌ diagram teknis */}
      {/* <RichTextDrawer /> ❌ tidak relevan */}
      {/* <RichTextTwitter /> ❌ embed sosial */}
      {/* <RichTextCodeView /> ❌ teknis */}
      {/* <RichTextCallout /> ❌ opsional */}
    </div>
  );
};

type EditorProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  error?: string;
  defaultValue?: string;
  limit?: number;

  required?: boolean;
  onChange?: (value: string) => void;
};

function App({
  placeholder,
  onChange,
  defaultValue,
  limit,
  label,
  name,
  error,
  required,
}: EditorProps) {
  const LIMIT = limit ?? 5000;

  const extensions = useMemo(
    () => buildExtensions({ placeholder, limit: LIMIT }),
    [placeholder],
  );

  const handleUpdate = useCallback(
    ({ editor }: any) => {
      if (!editor.isEditable) return;
      onChange?.(editor.getHTML());
    },
    [onChange],
  );

  const editor = useEditor({
    extensions,
    textDirection: "auto",
    immediatelyRender: false,
    onUpdate: handleUpdate,
  });

  const isInitialized = useRef(false);

  // SET DEFAULT VALUE (EDIT MODE)
  useEffect(() => {
    if (!editor) return;
    if (!defaultValue) return;
    if (isInitialized.current) return;

    editor.commands.setContent(defaultValue, {
      emitUpdate: false,
    });
    isInitialized.current = true;
  }, [editor, defaultValue]);

  useEffect(() => {
    window.editor = editor;
  }, [editor]);

  if (!editor) return null;
  return (
    <>
      <div className="my-0 w-full">
        {label && (
          <Label
            className="mb-3"
            htmlFor={name}
            text={label}
            required={required}
          />
        )}

        {/* Toolbar */}
        <RichTextProvider editor={editor} dark={false}>
          <div
            className={cn(
              "bg-background !border-border overflow-hidden rounded-[0.5rem] !border",
              error ? "border-red-500" : "border-gray-500",
            )}
          >
            <div className="flex max-h-full w-full flex-col">
              <RichTextToolbar />

              <EditorContent editor={editor} />

              {/* Bubble */}
              <RichTextBubbleColumns />
              <RichTextBubbleDrawer />
              <RichTextBubbleExcalidraw />
              <RichTextBubbleIframe />
              <RichTextBubbleKatex />
              <RichTextBubbleLink />

              <RichTextBubbleImage />
              {/* <RichTextBubbleVideo /> */}

              <RichTextBubbleMermaid />
              <RichTextBubbleTable />
              <RichTextBubbleText />
              {/* <RichTextBubbleTwitter /> */}
              {/* <RichTextBubbleCallout /> */}

              {/* Command List */}
              <SlashCommandList />
              <RichTextBubbleMenuDragHandle />
            </div>

            <Count editor={editor} limit={LIMIT} />
          </div>
        </RichTextProvider>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </>
  );
}

export default App;
