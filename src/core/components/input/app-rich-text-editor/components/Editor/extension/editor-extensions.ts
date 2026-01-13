import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import { Paragraph } from "@tiptap/extension-paragraph";
import { HardBreak } from "@tiptap/extension-hard-break";
import { ListItem } from "@tiptap/extension-list";
import { TextStyle } from "@tiptap/extension-text-style";
import {
    Dropcursor,
    Gapcursor,
    Placeholder,
    TrailingNode,
} from "@tiptap/extensions";

import { CharacterCount } from "@tiptap/extensions";
// build extensions
import {
    Attachment,
} from "reactjs-tiptap-editor/attachment";
import {
    Blockquote,
} from "reactjs-tiptap-editor/blockquote";
import { Bold, RichTextBold } from "reactjs-tiptap-editor/bold";
import {
    BulletList,
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


import { EMOJI_LIST } from "../emojis";


const DocumentColumn = /* @__PURE__ */ Document.extend({
    content: '(block|columns)+',
});

const BlockImage = Image.extend({
    group: 'block', // bikin image jadi block node
    inline: false,  // pastikan dianggap block
});



const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            dir: {
                default: null,
                parseHTML: () => null,
                renderHTML: () => ({}),
            },
        };
    },
});


const BaseKit = [
    DocumentColumn,
    Text,
    Dropcursor.configure({
        class: 'reactjs-tiptap-editor-theme',
        color: 'hsl(var(--primary))',
        width: 2,
    }),
    Gapcursor,
    HardBreak.configure({
        HTMLAttributes: {
            style: "margin: 0",
        },
    }),
    CustomParagraph,
    TrailingNode,
    ListItem,
    TextStyle,
    Placeholder.configure({
        placeholder: "Press '/' for commands",
    }),
];


export const richTextExtensions = (LIMIT = 2505) => [
    ...BaseKit,
    CharacterCount.configure({
        limit: LIMIT,
    }),

    History,
    SearchAndReplace,
    Clear,
    FontFamily,
    Heading,
    FontSize,
    Bold,
    Italic,
    TextUnderline,
    Strike,
    MoreMark,
    Emoji.configure({
        suggestion: {
            items: async ({ query }: any) => {
                const lowerCaseQuery = query?.toLowerCase();

                return EMOJI_LIST.filter(({ name }) =>
                    name.toLowerCase().includes(lowerCaseQuery),
                );
            },
        },
    }),
    Color,
    Highlight,
    BulletList,
    OrderedList,
    TextAlign,
    Indent,
    LineHeight,
    TaskList,
    Link,
    BlockImage.configure({
        upload: (files: File) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string); // base64
                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(files);
            }),
    }),
    // Video.configure({
    //     upload: (files: File) => {
    //         return new Promise((resolve) => {
    //             setTimeout(() => {
    //                 resolve(URL.createObjectURL(files));
    //             }, 300);
    //         });
    //     },
    // }),
    Blockquote,
    HorizontalRule,
    Code,
    CodeBlock,

    Column,
    ColumnNode,
    MultipleColumnNode,
    Table,
    // Iframe,
    // ExportPdf,
    ImportWord,
    ExportWord,
    TextDirection.configure({
        defaultDirection: null,
    }),
    Attachment.configure({
        upload: (file: File) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string); // langsung base64
                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(file);
            }),
    }),
    Katex,
    Excalidraw,
    Mermaid.configure({
        upload: (file: any) => {
            // fake upload return base 64
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise((resolve) => {
                setTimeout(() => {
                    const blob = convertBase64ToBlob(reader.result as string);
                    resolve(URL.createObjectURL(blob));
                }, 300);
            });
        },
    }),
    Drawer.configure({
        upload: (file: any) => {
            // fake upload return base 64
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise((resolve) => {
                setTimeout(() => {
                    const blob = convertBase64ToBlob(reader.result as string);
                    resolve(URL.createObjectURL(blob));
                }, 300);
            });
        },
    }),
    // Twitter,

    SlashCommand,
    CodeView,
    // Callout,
];

function convertBase64ToBlob(base64: string) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}