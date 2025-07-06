"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Text } from "lucide-react";

const headingOptions = [
  { value: "paragraph", label: "Paragraph", icon: Text },
  { value: "heading1", label: "Heading 1", icon: Heading1 },
  { value: "heading2", label: "Heading 2", icon: Heading2 },
  { value: "heading3", label: "Heading 3", icon: Heading3 },
  { value: "heading4", label: "Heading 4", icon: Heading4 },
  { value: "heading5", label: "Heading 5", icon: Heading5 },
  { value: "heading6", label: "Heading 6", icon: Heading6 },
];

const Headings = ({ editor, className = "" }) => {
  if (!editor) return null;

  const getCurrentBlock = () => {
    if (editor.isActive("heading", { level: 1 })) return "heading1";
    if (editor.isActive("heading", { level: 2 })) return "heading2";
    if (editor.isActive("heading", { level: 3 })) return "heading3";
    if (editor.isActive("heading", { level: 4 })) return "heading4";
    if (editor.isActive("heading", { level: 5 })) return "heading5";
    if (editor.isActive("heading", { level: 6 })) return "heading6";
    return "paragraph";
  };

  const handleChange = (value) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value.replace("heading", ""), 10);
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select onValueChange={handleChange} value={getCurrentBlock()}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Formatting" />
        </SelectTrigger>
        <SelectContent>
          {headingOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="flex items-center gap-2">
              <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Headings;
