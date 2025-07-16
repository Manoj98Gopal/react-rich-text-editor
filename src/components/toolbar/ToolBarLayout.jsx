"use client";

import React from "react";
import Headings from "./Headings";
import { cn } from "@/lib/utils";
import InlineFormatting from "./InlineFormatting";
import AlignmentFormatting from "./AlignmentFormatting";
import ListFormatting from "./ListFormatting";
import TableFormatting from "./TableFormatting";

const ToolBarLayout = ({ editor, className = "" }) => {
  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        "rounded-t-lg border-b border-border bg-muted/50",
        "px-3 py-2 shadow-sm",
        className
      )}
    >
      <Headings editor={editor} />
      <InlineFormatting editor={editor} />
      <AlignmentFormatting editor={editor} />
      <ListFormatting editor={editor} />
      <TableFormatting editor={editor} />
    </div>
  );
};

export default ToolBarLayout;
