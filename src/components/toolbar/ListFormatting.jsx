"use client";

import React from "react";
import { List, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";

const listTypes = [
  { type: "bulletList", Icon: List },
  { type: "orderedList", Icon: ListOrdered }
];

const ListFormatting = ({ editor, className = "" }) => {
  if (!editor) return null;

  const handleClick = (type) => {
    if (editor.isActive(type)) {
      // If already active, turn it off by setting to paragraph
      editor.chain().focus().setParagraph().run();
    } else {
      // Otherwise, activate the list
      editor.chain().focus().toggleList(type).run();
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {listTypes.map(({ type, Icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => handleClick(type)}
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

export default ListFormatting;
