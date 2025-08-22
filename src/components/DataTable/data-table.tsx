import React, { useState, useMemo } from "react";
import { clsx } from "clsx";

export interface Column<T extends object = object> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T extends object = object> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  selectAllText?: string;
}

export interface SortConfig {
  key: string | null;
  direction: "asc" | "desc" | null;
}

export function DataTable<T extends object = object>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
  selectAllText = "Select all",
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
        key = "";
      }
    }

    setSortConfig({ key: direction ? key : null, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);

    if (checked) {
      newSelectedRows.add(index);
    } else {
      newSelectedRows.delete(index);
    }

    setSelectedRows(newSelectedRows);

    if (onRowSelect) {
      const selectedData = Array.from(newSelectedRows).map(
        (i) => sortedData[i]
      );
      onRowSelect(selectedData);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = new Set(sortedData.map((_, index) => index));
      setSelectedRows(allIndices);

      if (onRowSelect) {
        onRowSelect(sortedData);
      }
    } else {
      setSelectedRows(new Set());

      if (onRowSelect) {
        onRowSelect([]);
      }
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }

    if (sortConfig.direction === "asc") {
      return (
        <svg
          className="w-4 h-4 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      );
    }

    return (
      <svg
        className="w-4 h-4 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className={clsx("w-full", className)}>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {selectable && (
                    <th scope="col" className="px-6 py-3 text-left">
                      <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
                    </th>
                  )}
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="w-20 h-4 bg-gray-300 rounded animate-pulse" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {selectable && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("w-full", className)}>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {selectable && (
                  <th scope="col" className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={
                        selectedRows.size === data.length && data.length > 0
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      aria-label={selectAllText}
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    className={clsx(
                      "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                      column.sortable &&
                        "cursor-pointer hover:bg-gray-100 select-none",
                      column.width && `w-${column.width}`
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                    {...(column.sortable && {
                      "aria-label": `Sort by ${column.title}`,
                    })}
                  >
                    <div
                      className={clsx(
                        "flex items-center space-x-1",
                        column.sortable && "hover:text-gray-700"
                      )}
                    >
                      <span>{column.title}</span>
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={clsx(
                    "hover:bg-gray-50 transition-colors duration-150",
                    selectedRows.has(rowIndex) && "bg-blue-50 hover:bg-blue-100"
                  )}
                >
                  {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedRows.has(rowIndex)}
                        onChange={(e) =>
                          handleRowSelect(rowIndex, e.target.checked)
                        }
                        aria-label={`Select row ${rowIndex + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {column.render ? (
                        column.render(
                          row[column.dataIndex] as unknown,
                          row,
                          rowIndex
                        )
                      ) : (
                        <span>{String(row[column.dataIndex])}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectable && selectedRows.size > 0 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {selectedRows.size} of {data.length} rows selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
