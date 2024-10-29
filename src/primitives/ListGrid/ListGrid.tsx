import React from "react";

import clsx from "clsx";
import { tv } from "tailwind-variants";

const listGridVariants = tv({
  slots: {
    root: "mx-auto w-full max-w-7xl overflow-x-auto",
    grid: "grid gap-4 px-4 py-2",
    headerElement: "flex items-center",
    row: "grid items-center gap-4 p-4",
  },
  variants: {
    nColumns: {
      0: {},
      1: { grid: "grid-cols-1", row: "grid-cols-1" },
      2: { grid: "grid-cols-2", row: "grid-cols-2" },
      3: { grid: "grid-cols-3", row: "grid-cols-3" },
      4: { grid: "grid-cols-4", row: "grid-cols-4" },
      5: { grid: "grid-cols-5", row: "grid-cols-5" },
      6: { grid: "grid-cols-6", row: "grid-cols-6" },
      7: { grid: "grid-cols-7", row: "grid-cols-7" },
      8: { grid: "grid-cols-8", row: "grid-cols-8" },
      9: { grid: "grid-cols-9", row: "grid-cols-9" },
      10: { grid: "grid-cols-10", row: "grid-cols-10" },
    },
  },
});

export interface ListGridColumn<T> {
  header: React.ReactNode;
  key: keyof T | string;
  render: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface ListGridProps<T> {
  data: T[];
  columns: ListGridColumn<T>[];
  getRowKey: (item: T) => string | number;
}

type ColumnCount = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export const ListGrid = <T,>({ data, columns, getRowKey }: ListGridProps<T>) => {
  const nColumns = columns.length as ColumnCount;
  if (nColumns < 0 || nColumns > 10) {
    throw new Error("ListGrid: Invalid number of columns, max is 10");
  }

  const { root, grid, headerElement, row } = listGridVariants({ nColumns });
  return (
    <div className={root()}>
      <div className={grid()}>
        {columns.map((column, index) => (
          <div key={index} className={headerElement()}>
            {column.header}
          </div>
        ))}
      </div>
      {data.map((item, index) => (
        <div key={getRowKey ? getRowKey(item) : index} className={row()}>
          {columns.map((column) => (
            <React.Fragment key={column.key as string}>{column.render(item)}</React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};
