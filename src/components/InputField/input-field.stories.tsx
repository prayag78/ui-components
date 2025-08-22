import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { InputField } from "./input-field";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible input component with validation states, multiple variants, and accessibility features.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "ghost"],
      description: "Visual style variant of the input",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the input field",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
    invalid: {
      control: { type: "boolean" },
      description: "Whether the input shows an error state",
    },
    type: {
      control: { type: "select" },
      options: ["text", "password"],
      description: "Input type",
    },
    showPasswordToggle: {
      control: { type: "boolean" },
      description: "Whether to show password toggle for password inputs",
    },
    required: {
      control: { type: "boolean" },
      description: "Whether the field is required (adds a red asterisk)",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
  },
};

export const Variants: Story = {
  args: {
    size: "sm",
  },

  render: () => (
    <div className="space-y-6 w-96">
      <InputField
        label="Filled Variant"
        placeholder="Filled input"
        variant="filled"
      />
      <InputField
        label="Outlined Variant"
        placeholder="Outlined input"
        variant="outlined"
      />
      <InputField
        label="Ghost Variant"
        placeholder="Ghost input"
        variant="ghost"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <InputField label="Small Size" placeholder="Small input" size="sm" />
      <InputField label="Medium Size" placeholder="Medium input" size="md" />
      <InputField label="Large Size" placeholder="Large input" size="lg" />
    </div>
  ),
};

export const ValidationStates: Story = {
  args: {
    disabled: false,
    invalid: false,
  },

  render: () => (
    <div className="space-y-6 w-96">
      <InputField label="Valid Input" placeholder="Valid input" />
      <InputField
        label="Invalid Input"
        placeholder="Invalid input"
        invalid={true}
        errorMessage="This field is required"
      />
      <InputField
        label="Disabled Input"
        placeholder="Disabled input"
        disabled={true}
      />
    </div>
  ),
};

export const PasswordToggle: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-4 w-96">
        <InputField
          label="Password Input"
          type="password"
          placeholder="Enter your password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showPasswordToggle={true}
        />
      </div>
    );
  },
};
