"use client";

import { cn } from "@/core/lib/utils";
import { ChangeEvent } from "react";
import { Label } from "../text/label";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface AppSelectProps {
  label?: string;
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  options: SelectOption[];
  onChange?: (value: string | number) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;

  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  errorClassName?: string;
}

export const AppSelect = ({
  label,
  name,
  value,
  defaultValue,
  placeholder = "Pilih salah satu",
  options,
  onChange,
  required = false,
  disabled = false,
  error,
  hint,
  className,
  labelClassName,
  selectClassName,
  errorClassName,
}: AppSelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={cn("flex w-full flex-col space-y-1", className)}>
      {label && (
        <Label
          text={label}
          required={required}
          htmlFor={name}
          className={cn(disabled && "opacity-60", labelClassName)}
        />
      )}

      <select
        name={name}
        value={value ?? defaultValue ?? ""}
        disabled={disabled}
        onChange={handleChange}
        className={cn(
          "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800",
          "focus:border-primary focus:ring-primary/20 focus:ring-2 focus:outline-none",
          "transition-all",
          disabled && "cursor-not-allowed bg-gray-100 opacity-75",
          error && "border-red-500 focus:border-red-500 focus:ring-red-300/20",
          selectClassName,
        )}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}

      {error && (
        <p className={cn("text-xs text-red-600", errorClassName)}>{error}</p>
      )}
    </div>
  );
};
