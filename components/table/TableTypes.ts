import { ChangeEvent, MouseEvent } from "react";

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  isSelectable: boolean;
  headCells: readonly HeadCell[];
}

export interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export type Order = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  align?: "right" | "center" | "left";
  valueAlign?: "right" | "center" | "left";
  editable?: boolean;
  sortable?: boolean;
}

export type getComparatorType = {
  order: Order;
  orderBy: keyof Data;
};
