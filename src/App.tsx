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
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
          value === "active"
            ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"
            : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20"
        }`}
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    fullName: "",
    company: "",
    bio: "",
    phone: "",
    small: "",
    medium: "",
    large: "",
    disabled: "",
  });

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UI</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                Component Library
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              InputField Component
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Flexible and accessible input fields with multiple variants,
              sizes, and states. Perfect for building modern forms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Basic Examples
              </h3>
              <div className="space-y-6">
                <InputField
                  label="Email Address"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  variant="outlined"
                  size="md"
                />
                <InputField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange("fullName")}
                  variant="filled"
                  size="md"
                />
                <InputField
                  label="Company"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={handleInputChange("company")}
                  variant="ghost"
                  size="md"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Password & Validation
              </h3>
              <div className="space-y-6">
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  showPasswordToggle={true}
                  size="md"
                />
                <InputField
                  label="Username"
                  placeholder="Enter username"
                  required={true}
                  value={formData.username}
                  onChange={handleInputChange("username")}
                  invalid={
                    formData.username.length > 0 && formData.username.length < 3
                  }
                  errorMessage={
                    formData.username.length > 0 && formData.username.length < 3
                      ? "Username must be at least 3 characters"
                      : undefined
                  }
                  size="md"
                />
                <InputField
                  label="Phone Number"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  size="md"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                Sizes & States
              </h3>
              <div className="space-y-6">
                <InputField
                  label="Small Size"
                  placeholder="Small input"
                  value={formData.small}
                  onChange={handleInputChange("small")}
                  size="sm"
                />
                <InputField
                  label="Medium Size (Default)"
                  placeholder="Medium input"
                  value={formData.medium}
                  onChange={handleInputChange("medium")}
                  size="md"
                />
                <InputField
                  label="Large Size"
                  placeholder="Large input"
                  value={formData.large}
                  onChange={handleInputChange("large")}
                  size="lg"
                />
                <InputField
                  label="Disabled State"
                  placeholder="This is disabled"
                  value="Cannot edit this"
                  onChange={handleInputChange("disabled")}
                  disabled={true}
                  size="md"
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              DataTable Component
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Powerful data tables with sorting, selection, and customizable
              rendering. Built for performance and accessibility.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Basic Data Table
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mt-1">
                  Simple table with sorting capabilities
                </p>
              </div>
              <div className="p-6">
                <DataTable data={sampleUsers} columns={userColumns} />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Selectable Data Table
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mt-1">
                  Table with row selection and bulk actions
                </p>
              </div>
              <div className="p-6">
                <DataTable
                  data={sampleUsers}
                  columns={userColumns}
                  selectable={true}
                  onRowSelect={(rows) => console.log("Selected rows:", rows)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
