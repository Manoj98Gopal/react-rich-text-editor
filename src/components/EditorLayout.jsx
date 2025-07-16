import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils"; // Optional utility for merging Tailwind classes
import ToolBarLayout from "./toolbar/ToolBarLayout";
import HardBreak from "@tiptap/extension-hard-break";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

const EditorLayout = ({
  content = "Hi hello working !",
  className = "",
  editorProps = {},
  onChange
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      HardBreak,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3"
        }
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3"
        }
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "table-auto border-collapse border border-gray-300"
        }
      }),
      TableRow,
      TableHeader,
      TableCell
    ],
    content,
    editorProps: {
      ...editorProps,
      attributes: {
        class: cn(
          "prose prose-stone dark:prose-invert max-w-none",
          "min-h-[300px] p-4",
          className
        )
      }
    },

    onUpdate({ editor }) {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    }
  });

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <ToolBarLayout editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorLayout;
