"use client";

import React from "react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { cn } from "@/lib/utils";

const alignments = [
  { type: "left", Icon: AlignLeft },
  { type: "center", Icon: AlignCenter },
  { type: "right", Icon: AlignRight },
];

const AlignmentFormatting = ({ editor, className = "" }) => {
  if (!editor) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {alignments.map(({ type, Icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => editor.chain().focus().setTextAlign(type).run()}
          className={cn(
            "p-1 rounded transition-colors",
            editor.isActive({ textAlign: type })
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

export default AlignmentFormatting;
