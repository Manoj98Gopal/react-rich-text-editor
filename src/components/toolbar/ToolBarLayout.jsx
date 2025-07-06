"use client";

import React from "react";
import Headings from "./Headings";
import { cn } from "@/lib/utils";
import InlineFormatting from "./InlineFormatting";

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
    </div>
  );
};

export default ToolBarLayout;
