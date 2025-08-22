import React, { forwardRef, useState } from "react";
import { clsx } from "clsx";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  showPasswordToggle?: boolean;
  className?: string;
  required?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      defaultValue = "",
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      variant = "outlined",
      size = "md",
      type = "text",
      showPasswordToggle = false,
      className,
      required = false,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    const inputType =
      type === "password" && showPasswordToggle
        ? showPassword
          ? "text"
          : "password"
        : type;

    const handleInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const baseInputClasses = clsx(
      "w-full transition-all duration-200 ease-in-out font-medium text-gray-500 dark:text-gray-300",
      "focus:outline-none focus:ring-2 focus:ring-offset-0",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-5 py-4 text-lg",
      }[size],
      {
        filled: clsx(
          "bg-gray-100 dark:bg-gray-800 border-0 rounded-lg",
          "focus:bg-white dark:focus:bg-gray-700 focus:ring-blue-500",
          "hover:bg-gray-50 dark:hover:bg-gray-700",
          invalid &&
            "bg-red-50 dark:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20 focus:ring-red-500"
        ),
        outlined: clsx(
          "bg-transparent border rounded-lg",
          "focus:ring-blue-500",
          invalid
            ? "border-red-300 dark:border-red-600 focus:border-red-500"
            : "border-gray-300 dark:border-gray-600 focus:border-blue-500",
          "hover:border-gray-400 dark:hover:border-gray-500"
        ),
        ghost: clsx(
          "bg-transparent border-b-2 rounded-md border-gray-300 dark:border-gray-600",
          "focus:ring-0 focus:border-blue-500",
          "focus:outline-none",
          invalid
            ? "border-red-300 dark:border-red-600 focus:border-red-500"
            : "border-gray-300 dark:border-gray-600 focus:border-blue-500",
          "hover:border-gray-400 dark:hover:border-gray-500"
        ),
      }[variant]
    );

    const labelClasses = clsx(
      "block font-medium text-gray-700 dark:text-gray-200 mb-2",
      {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      }[size]
    );

    const helperTextClasses = clsx(
      "mt-2 text-sm",
      errorMessage
        ? "text-red-600 dark:text-red-400"
        : "text-gray-500 dark:text-gray-400"
    );

    return (
      <div className="relative">
        {label && (
          <label className={labelClasses}>
            {label}
            {required && (
              <span className="text-red-600" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            value={isControlled ? value : uncontrolledValue}
            onChange={handleInternalChange}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={invalid}
            className={clsx(baseInputClasses, className)}
            required={required}
          />

          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              onClick={togglePassword}
              className={clsx(
                "absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer",
                "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200",
                {
                  sm: "text-sm",
                  md: "text-base",
                  lg: "text-lg",
                }[size]
              )}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {(helperText || errorMessage) && (
          <div
            className={helperTextClasses}
            role={errorMessage ? "alert" : "note"}
          >
            {errorMessage || helperText}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
