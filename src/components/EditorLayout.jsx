import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils"; // Optional utility for merging Tailwind classes
import ToolBarLayout from "./toolbar/ToolBarLayout";
import HardBreak from "@tiptap/extension-hard-break";
import Underline from "@tiptap/extension-underline";

const EditorLayout = ({
  content = "Hi hello working !",
  className = "",
  editorProps = {},
  onChange
}) => {
  const editor = useEditor({
    extensions: [StarterKit, HardBreak, Underline],
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
