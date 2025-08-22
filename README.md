# UI Components Library

A modern React component library built with TypeScript, TailwindCSS, and Storybook. This project demonstrates best practices for building scalable, accessible, and maintainable UI components.

## 🚀 Features

- **React 19** with TypeScript for type safety
- **TailwindCSS v4** for modern, utility-first styling
- **Storybook** for component documentation and development
- **Vitest** for testing with React Testing Library
- **ESLint** for code quality
- **Responsive design** with mobile-first approach
- **Accessibility** features (ARIA labels, keyboard navigation)

## 📦 Components

### 1. InputField

A flexible input component with multiple variants, validation states, and accessibility features.

#### Features

- **Variants**: filled, outlined, ghost
- **Sizes**: small, medium, large
- **States**: disabled, invalid, loading
- **Optional features**: clear button, password toggle
- **Validation**: error messages, helper text
- **Accessibility**: ARIA labels, required indicators

#### Usage

```tsx
import { InputField } from "./components/InputField";

function MyForm() {
  const [value, setValue] = useState("");

  return (
    <InputField
      label="Email Address"
      placeholder="Enter your email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      helperText="We'll never share your email"
      variant="outlined"
      size="md"
      required
    />
  );
}
```

#### Props

```tsx
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
  clearable?: boolean;
  showPasswordToggle?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  className?: string;
}
```

### 2. DataTable

A powerful data table component with sorting, row selection, and custom rendering capabilities.

#### Features

- **Column sorting** (ascending/descending/clear)
- **Row selection** (single/multiple with select all)
- **Loading states** with spinner
- **Empty states** with customizable messages
- **Custom cell rendering** via render functions
- **Responsive design** with horizontal scrolling
- **TypeScript generics** for type-safe data

#### Usage

```tsx
import { DataTable } from "./components/DataTable";
import type { Column } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: false },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
    sortable: true,
    render: (value) => <span className="font-medium">{value}</span>,
  },
];

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
];

function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <DataTable
      data={users}
      columns={columns}
      selectable={true}
      onRowSelect={setSelectedUsers}
    />
  );
}
```

#### Props

```tsx
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  emptyText?: string;
  loadingText?: string;
  selectAllText?: string;
  noDataText?: string;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ui-components

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run tests
npm test

# Build for production
npm run build
```

### Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── input-field.tsx          # Main component
│   │   ├── input-field.stories.tsx  # Storybook stories
│   │   ├── input-field.test.tsx     # Unit tests
│   │   └── index.ts                 # Exports
│   └── DataTable/
│       ├── data-table.tsx           # Main component
│       ├── data-table.stories.tsx   # Storybook stories
│       ├── data-table.test.tsx      # Unit tests
│       └── index.ts                 # Exports
├── App.tsx                          # Demo application
├── main.tsx                         # Entry point
└── index.css                        # Global styles
```

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

- `npm run lint` - Run ESLint

## 🎨 Styling

The components use TailwindCSS v4 with a modern, clean design system:

- **Color palette**: Gray scale with blue accents
- **Typography**: Inter font family with consistent sizing
- **Spacing**: 4px base unit system
- **Shadows**: Subtle shadows for depth
- **Transitions**: Smooth animations for interactions
- **Responsive**: Mobile-first responsive design

## ♿ Accessibility

All components include accessibility features:

- **ARIA labels** and descriptions
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus management** and indicators
- **Semantic HTML** structure
- **Color contrast** compliance

## 📚 Storybook

Storybook provides interactive documentation:

- **Component playground** for development
- **Props documentation** with controls
- **Visual testing** and regression detection
- **Accessibility** addon for testing
- **Responsive** design testing

## 🚀 Getting Started

1. **Install dependencies**: `npm install`
2. **Start development**: `npm run dev`
3. **View components**: `npm run storybook`

