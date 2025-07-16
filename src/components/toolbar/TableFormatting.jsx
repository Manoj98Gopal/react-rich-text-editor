"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table as TableIcon,
  Plus,
  PlusSquare,
  Minus,
  MinusSquare,
  Trash,
  Merge,
  Split,
  ChevronDown,
  PlusCircle,
  Rows,
  Columns,
  Text,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TableFormatting({ editor }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rowsInput, setRowsInput] = useState(3);
  const [colsInput, setColsInput] = useState(3);

  if (!editor) return null;

  // Create Table
  const handleTableInsert = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: rowsInput, cols: colsInput, withHeaderRow: true })
      .run();
    setDialogOpen(false);
    setRowsInput(3);
    setColsInput(3);
  };

  // Check if selection is inside a table
  const isInTable = editor.isActive("table");

  // Define actions
  const tableActions = [
  {
    icon: Rows,
    label: "Add Row Above",
    action: () => editor.chain().focus().addRowBefore().run(),
    disabled: !isInTable,
  },
  {
    icon: Rows,
    label: "Add Row Below",
    action: () => editor.chain().focus().addRowAfter().run(),
    disabled: !isInTable,
  },
  {
    icon: Columns,
    label: "Add Column Left",
    action: () => editor.chain().focus().addColumnBefore().run(),
    disabled: !isInTable,
  },
  {
    icon: Columns,
    label: "Add Column Right",
    action: () => editor.chain().focus().addColumnAfter().run(),
    disabled: !isInTable,
  },
  {
    icon: Minus,
    label: "Delete Row",
    action: () => editor.chain().focus().deleteRow().run(),
    disabled: !isInTable,
  },
  {
    icon: MinusSquare,
    label: "Delete Column",
    action: () => editor.chain().focus().deleteColumn().run(),
    disabled: !isInTable,
  },
  {
    icon: Merge,
    label: "Merge Cells",
    action: () => editor.chain().focus().mergeCells().run(),
    disabled: !isInTable,
  },
  {
    icon: Split,
    label: "Split Cell",
    action: () => editor.chain().focus().splitCell().run(),
    disabled: !isInTable,
  },
  {
    icon: Text,
    label: "Insert Paragraph After",
    action: () => {
      const { state, dispatch } = editor;
      const { $from } = state.selection;
      const tableNode = $from.node(-1);
      if (tableNode?.type.name === "table") {
        const tableEndPos = $from.after(-1);
        dispatch(
          state.tr
            .insert(tableEndPos, state.schema.nodes.paragraph.create())
            .scrollIntoView()
        );
      }
      setDialogOpen(false);
    },
    disabled: !isInTable,
  },
  {
    icon: Trash,
    label: "Delete Table",
    action: () => {
      editor.chain().focus().deleteTable().run();
      setDialogOpen(false);
    },
    disabled: !isInTable,
  },
];


  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Table">
          <TableIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Table Options</DialogTitle>
          <DialogDescription>
            Create a new table or modify the current one.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Create Table Section */}
          <div>
            <h4 className="text-sm font-medium">Insert New Table</h4>
            <div className="mt-2 flex gap-2">
              <Input
                type="number"
                min={1}
                max={10}
                value={rowsInput}
                onChange={(e) => setRowsInput(Number(e.target.value))}
                placeholder="Rows"
              />
              <Input
                type="number"
                min={1}
                max={10}
                value={colsInput}
                onChange={(e) => setColsInput(Number(e.target.value))}
                placeholder="Columns"
              />
              <Button
                size="sm"
                variant="default"
                onClick={handleTableInsert}
                disabled={rowsInput < 1 || colsInput < 1}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Insert
              </Button>
            </div>
          </div>

          <Separator />

          {/* Table Actions Section */}
          <div className={cn("space-y-2", !isInTable && "opacity-50 pointer-events-none")}>
            <h4 className="text-sm font-medium">Edit Existing Table</h4>
            <ScrollArea className="max-h-64">
              <div className="grid grid-cols-2 gap-2 mt-2">
                {tableActions.map(({ icon: Icon, label, action, disabled }, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    size="sm"
                    onClick={action}
                    disabled={disabled}
                    className="flex items-center gap-2 justify-start"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </ScrollArea>
            {!isInTable && (
              <p className="text-xs text-muted-foreground mt-1">
                Select a table in the editor to enable these actions.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
