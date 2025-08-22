import { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable";
import type { Column } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

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

const userColumns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true, width: "16" },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "role", title: "Role", dataIndex: "role", sortable: true },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
    sortable: true,
    render: (value) => (
      <span
        className={
          value === "active"
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }
      >
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

function App() {
  const [inputValue, setInputValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [fullNameValue, setFullNameValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [bioValue, setBioValue] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            UI Components Library
          </h1>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            InputField Component
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Input
              </h3>
              <InputField
                label="Email Address"
                placeholder="Enter your email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                variant="outlined"
                size="sm"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Password Input
              </h3>
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                showPasswordToggle={true}
                className="text-gray-500"
                size="sm"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Error State
              </h3>
              <InputField
                label="Username"
                placeholder="Enter username"
                required={true}
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}
                invalid={true}
                errorMessage="Username is required"
                className="text-gray-500"
                size="sm"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Filled Variant
              </h3>
              <InputField
                label="Full Name"
                placeholder="Enter your full name"
                value={fullNameValue}
                onChange={(e) => setFullNameValue(e.target.value)}
                variant="filled"
                className="text-gray-500"
                size="md"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Ghost Variant
              </h3>
              <InputField
                label="Company"
                placeholder="Enter company name"
                value={companyValue}
                onChange={(e) => setCompanyValue(e.target.value)}
                variant="ghost"
                className="text-gray-500"
                size="sm"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Large Size
              </h3>
              <InputField
                label="Bio"
                placeholder="Tell us about yourself"
                value={bioValue}
                onChange={(e) => setBioValue(e.target.value)}
                size="lg"
                className="text-gray-500"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            DataTable Component
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Table
              </h3>
              <DataTable data={sampleUsers} columns={userColumns} />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Table with Row Selection
              </h3>
              <DataTable
                data={sampleUsers}
                columns={userColumns}
                selectable={true}
                onRowSelect={(rows) => console.log(rows)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
