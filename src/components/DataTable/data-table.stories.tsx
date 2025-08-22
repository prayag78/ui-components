import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "./data-table";
import type { Column, DataTableProps } from "./data-table";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

const UserDataTable = (props: DataTableProps<User>) => (
  <DataTable<User> {...props} />
);

const meta: Meta<typeof UserDataTable> = {
  title: "Components/DataTable",
  component: UserDataTable,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible data table component with sorting, row selection, and loading states.",
      },
    },
  },
  argTypes: {
    loading: {
      control: { type: "boolean" },
      description: "Whether the table is in a loading state",
    },
    selectable: {
      control: { type: "boolean" },
      description: "Whether rows can be selected",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    lastLogin: "2024-01-14",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "inactive",
    lastLogin: "2024-01-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Moderator",
    status: "active",
    lastLogin: "2024-01-13",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "User",
    status: "inactive",
    lastLogin: "2024-01-08",
  },
];

const sampleProducts: Product[] = [
  {
    id: "P001",
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    stock: 15,
    rating: 4.5,
  },
  {
    id: "P002",
    name: "Mouse",
    category: "Electronics",
    price: 29.99,
    stock: 50,
    rating: 4.2,
  },
  {
    id: "P003",
    name: "Keyboard",
    category: "Electronics",
    price: 79.99,
    stock: 25,
    rating: 4.7,
  },
  {
    id: "P004",
    name: "Monitor",
    category: "Electronics",
    price: 299.99,
    stock: 10,
    rating: 4.8,
  },
  {
    id: "P005",
    name: "Headphones",
    category: "Electronics",
    price: 149.99,
    stock: 30,
    rating: 4.3,
  },
];

const userColumns: Column<User>[] = [
  {
    key: "id",
    title: "ID",
    dataIndex: "id",
    sortable: true,
    width: "16",
  },
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    sortable: true,
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
    sortable: true,
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
    sortable: true,
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    sortable: true,
    render: (value) => (
      <span className={value === "active" ? "text-green-600" : "text-red-600"}>
        {String(value)}
      </span>
    ),
  },
  {
    key: "lastLogin",
    title: "Last Login",
    dataIndex: "lastLogin",
    sortable: true,
  },
];

const productColumns: Column<Product>[] = [
  {
    key: "id",
    title: "Product ID",
    dataIndex: "id",
    sortable: true,
    width: "24",
  },
  {
    key: "name",
    title: "Product Name",
    dataIndex: "name",
    sortable: true,
  },
  {
    key: "category",
    title: "Category",
    dataIndex: "category",
    sortable: true,
  },
  {
    key: "price",
    title: "Price",
    dataIndex: "price",
    sortable: true,
    render: (value) => `$${(value as number).toFixed(2)}`,
  },
  {
    key: "stock",
    title: "Stock",
    dataIndex: "stock",
    sortable: true,
    render: (value) => (
      <span
        className={
          (value as number) < 20 ? "text-red-600 font-medium" : "text-gray-900"
        }
      >
        {value as number}
      </span>
    ),
  },
  {
    key: "rating",
    title: "Rating",
    dataIndex: "rating",
    sortable: true,
    render: (value) => (
      <div className="flex items-center">
        <span className="text-yellow-500 mr-1">★</span>
        <span>{value as number}</span>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    selectable: true,
  },
};

export const ProductTable: Story = {
  render: () => (
    <DataTable<Product> data={sampleProducts} columns={productColumns} />
  ),
};

export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
  },
};

export const Interactive: Story = {
  render: () => {
    const [users, setUsers] = useState<User[]>(sampleUsers);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const handleRowSelect = (selectedRows: User[]) => {
      setSelectedUsers(selectedRows);
    };

    const addUser = () => {
      const newUser: User = {
        id: users.length + 1,
        name: `New User ${users.length + 1}`,
        email: `user${users.length + 1}@example.com`,
        role: "User",
        status: "active",
        lastLogin: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
    };

    const removeSelected = () => {
      const selectedIds = new Set(selectedUsers.map((u) => u.id));
      setUsers(users.filter((u) => !selectedIds.has(u.id)));
      setSelectedUsers([]);
    };

    return (
      <div className="space-y-4 w-full max-w-6xl">
        <div className="flex space-x-4">
          <button
            onClick={addUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add User
          </button>
          {selectedUsers.length > 0 && (
            <button
              onClick={removeSelected}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Remove Selected ({selectedUsers.length})
            </button>
          )}
        </div>

        <DataTable
          data={users}
          columns={userColumns}
          selectable={true}
          onRowSelect={handleRowSelect}
        />
      </div>
    );
  },
};
