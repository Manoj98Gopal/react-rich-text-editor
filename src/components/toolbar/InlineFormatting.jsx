"use client";

import React from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [
  { type: "bold", Icon: Bold },
  { type: "italic", Icon: Italic },
  { type: "underline", Icon: Underline },
];

const InlineFormatting = ({ editor, className = "" }) => {
  if (!editor) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {icons.map(({ type, Icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => editor.chain().focus()[`toggle${type.charAt(0).toUpperCase() + type.slice(1)}`]().run()}
          className={cn(
            "p-1 rounded transition-colors",
            editor.isActive(type)
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
};

export default InlineFormatting;
