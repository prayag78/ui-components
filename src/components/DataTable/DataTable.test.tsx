import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DataTable } from "./data-table";

describe("DataTable", () => {
  it("renders skeleton rows when loading", () => {
    render(
      <DataTable
        data={[]}
        columns={[{ key: "id", title: "ID", dataIndex: "id" as any }]}
        loading
      />
    );
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("renders header cells based on columns", () => {
    render(
      <DataTable
        data={[]}
        columns={[{ key: "id", title: "ID", dataIndex: "id" as any }]}
      />
    );
    expect(screen.getByText("ID")).toBeInTheDocument();
  });

  it("renders rows for provided data", () => {
    const columns = [{ key: "name", title: "Name", dataIndex: "name" as any }];
    const data = [{ name: "Alice" }, { name: "Bob" }];
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("does not render selection checkboxes when selectable=false", () => {
    const columns = [{ key: "name", title: "Name", dataIndex: "name" as any }];
    const data = [{ name: "Alice" }];
    render(<DataTable data={data} columns={columns} selectable={false} />);
    expect(screen.queryByRole("checkbox")).toBeNull();
  });

  it("renders selection checkboxes and calls onRowSelect with selected rows", async () => {
    const user = userEvent.setup();
    const columns = [{ key: "name", title: "Name", dataIndex: "name" as any }];
    const data = [{ name: "Alice" }, { name: "Bob" }];
    const handleSelect = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        selectable
        onRowSelect={handleSelect}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);
    expect(handleSelect).toHaveBeenLastCalledWith([data[0]]);

    await user.click(checkboxes[2]);
    expect(handleSelect).toHaveBeenLastCalledWith([data[0], data[1]]);
  });

  it("sorts rows when clicking a sortable column header (toggles asc/desc)", async () => {
    const user = userEvent.setup();
    const columns = [
      { key: "name", title: "Name", dataIndex: "name" as any, sortable: true },
    ];
    const data = [{ name: "Bob" }, { name: "Alice" }];
    render(<DataTable data={data} columns={columns} />);

    const header = screen.getByText("Name");
    let cells = screen.getAllByRole("cell");
    expect(cells.map((c) => c.textContent)).toEqual(["Bob", "Alice"]);

    await user.click(header);
    cells = screen.getAllByRole("cell");
    expect(cells.map((c) => c.textContent)).toEqual(["Alice", "Bob"]);

    await user.click(header);
    cells = screen.getAllByRole("cell");
    expect(cells.map((c) => c.textContent)).toEqual(["Bob", "Alice"]);
  });

  it("loading overrides rows (skeleton visible, data not visible)", () => {
    const columns = [{ key: "name", title: "Name", dataIndex: "name" as any }];
    const data = [{ name: "Alice" }];
    render(<DataTable data={data} columns={columns} loading />);
    expect(screen.queryByText("Alice")).toBeNull();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
