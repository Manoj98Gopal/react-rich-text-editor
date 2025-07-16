"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Button
} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";

import {
  Table,
  Table2,
  ChevronDown
} from "lucide-react";

const TableFormatting = ({ editor }) => {
  const [tableDialogOpen, setTableDialogOpen] = useState(false);
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
  const [rowsInput, setRowsInput] = useState(2);
  const [colsInput, setColsInput] = useState(2);

  if (!editor) return null;

  // FULL list of advanced table actions
  const tableActions = [
    {
      icon: "mdi:table-row-plus-before",
      label: "Add Row Above",
      tooltip: "Insert a row above the current row",
      action: () => {
        editor.chain().focus().addRowBefore().run();
        setIsTableDropdownOpen(true);
      },
      disabled: () => !editor.can().addRowBefore(),
    },
    {
      icon: "mdi:table-row-plus-after",
      label: "Add Row Below",
      tooltip: "Insert a row below the current row",
      action: () => {
        editor.chain().focus().addRowAfter().run();
        setIsTableDropdownOpen(true);
      },
      disabled: () => !editor.can().addRowAfter(),
    },
    {
      icon: "mdi:table-column-plus-before",
      label: "Add Column Left",
      tooltip: "Insert a column to the left of the current column",
      action: () => {
        editor.chain().focus().addColumnBefore().run();
        setIsTableDropdownOpen(true);
      },
      disabled: () => !editor.can().addColumnBefore(),
    },
    {
      icon: "mdi:table-column-plus-after",
      label: "Add Column Right",
      tooltip: "Insert a column to the right of the current column",
      action: () => {
        editor.chain().focus().addColumnAfter().run();
        setIsTableDropdownOpen(true);
      },
      disabled: () => !editor.can().addColumnAfter(),
    },
    {
      icon: "mdi:table-row-remove",
      label: "Delete Row",
      tooltip: "Delete the current row",
      action: () => {
        editor.chain().focus().deleteRow().run();
        setIsTableDropdownOpen(editor.isActive("table"));
      },
      disabled: () => !editor.can().deleteRow(),
    },
    {
      icon: "mdi:table-column-remove",
      label: "Delete Column",
      tooltip: "Delete the current column",
      action: () => {
        editor.chain().focus().deleteColumn().run();
        setIsTableDropdownOpen(editor.isActive("table"));
      },
      disabled: () => !editor.can().deleteColumn(),
    },
    {
      icon: "mdi:table-merge-cells",
      label: "Merge Cells",
      tooltip: "Merge selected cells",
      action: () => {
        editor.chain().focus().mergeCells().run();
        setIsTableDropdownOpen(true);
      },
      disabled: () => !editor.can().mergeCells(),
    },
    {
      icon: "mdi:table-split-cell",
      label: "Split Cell",
      tooltip: "Split the current cell",
      action: () => {
        editor.chain().focus().splitCell().run();
        setIsTableDropdownOpen(true);
      },
      disabled: () => !editor.can().splitCell(),
    },
    {
      icon: "mdi:plus",
      label: "Insert Paragraph After",
      tooltip: "Insert a paragraph after the table",
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
        setIsTableDropdownOpen(false);
      },
      disabled: () => !editor.isActive("table"),
    },
    {
      icon: "mdi:table-remove",
      label: "Delete Table",
      tooltip: "Delete the entire table",
      action: () => {
        editor.chain().focus().deleteTable().run();
        setIsTableDropdownOpen(false);
      },
      disabled: () => !editor.can().deleteTable(),
    },
  ];

  // Handle inserting the table
  const handleTableInsert = () => {
    if (rowsInput > 0 && colsInput > 0) {
      editor
        .chain()
        .focus()
        .insertTable({ rows: rowsInput, cols: colsInput, withHeaderRow: true })
        .run();
      setTableDialogOpen(false);
      setRowsInput(2);
      setColsInput(2);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Insert Table Button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setTableDialogOpen(true)}
            aria-label="Insert Table"
          >
            <Table2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Insert Table</TooltipContent>
      </Tooltip>

      {/* Table Actions Dropdown */}
      <DropdownMenu
        open={isTableDropdownOpen && editor.isActive("table")}
        onOpenChange={setIsTableDropdownOpen}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild disabled={!editor.isActive("table")}>
              <Button
                size="icon"
                variant={editor.isActive("table") ? "secondary" : "ghost"}
                aria-label="Table Actions"
              >
                <Table className="h-4 w-4" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Table Actions</TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="w-64">
          {tableActions.map((action, index) => (
            <DropdownMenuItem
              key={index}
              onSelect={(e) => {
                e.preventDefault();
                action.action();
              }}
              disabled={action.disabled()}
              className="flex items-center gap-2"
            >
              <Icon icon={action.icon} width={16} />
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Insert Table Dialog */}
      <Dialog open={tableDialogOpen} onOpenChange={setTableDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Insert Table</DialogTitle>
            <DialogDescription>
              Specify the number of rows and columns for the new table.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="rows" className="text-right text-sm">
                Rows
              </label>
              <Input
                id="rows"
                type="number"
                min="1"
                value={rowsInput}
                onChange={(e) => setRowsInput(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="cols" className="text-right text-sm">
                Columns
              </label>
              <Input
                id="cols"
                type="number"
                min="1"
                value={colsInput}
                onChange={(e) => setColsInput(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setTableDialogOpen(false);
                setRowsInput(2);
                setColsInput(2);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleTableInsert}
              disabled={rowsInput < 1 || colsInput < 1}
            >
              Insert Table
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableFormatting;
