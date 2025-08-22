import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { InputField } from "./input-field";

describe("InputField", () => {
  it("renders label and placeholder", () => {
    render(<InputField label="Email" placeholder="Enter email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("uncontrolled: types value into input", async () => {
    const user = userEvent.setup();
    render(<InputField placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    await user.type(input, "hello");
    expect((input as HTMLInputElement).value).toBe("hello");
  });

  it("controlled: calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <InputField
        value="abc"
        onChange={handleChange}
        placeholder="Controlled"
      />
    );
    const input = screen.getByPlaceholderText("Controlled");
    await user.type(input, "x");
    expect(handleChange).toHaveBeenCalled();
  });

  it("toggles password visibility when showPasswordToggle is enabled", async () => {
    const user = userEvent.setup();
    render(
      <InputField
        type="password"
        showPasswordToggle
        placeholder="Password"
      />
    );
    const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { name: /show password/i });
    expect(input.type).toBe("password");
    await user.click(toggleButton);
    expect(input.type).toBe("text");
    // aria-label should flip to Hide password
    expect(
      screen.getByRole("button", { name: /hide password/i })
    ).toBeInTheDocument();
  });

  it("shows error message with role=alert when errorMessage is provided", () => {
    render(
      <InputField
        label="Name"
        placeholder="Enter name"
        invalid
        errorMessage="This field is required"
      />
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      /this field is required/i
    );
  });

  it("respects disabled state", async () => {
    const user = userEvent.setup();
    render(<InputField placeholder="Disabled" disabled />);
    const input = screen.getByPlaceholderText("Disabled") as HTMLInputElement;
    expect(input).toBeDisabled();
    await user.type(input, "x");
    expect(input.value).toBe("");
  });

  it("applies custom className", () => {
    render(<InputField placeholder="Clsx" className="text-pink-600" />);
    const input = screen.getByPlaceholderText("Clsx");
    expect(input).toHaveClass("text-pink-600");
  });
});



