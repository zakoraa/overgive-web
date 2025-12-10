"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { formatRupiah } from "@/core/utils/currency";
import { Label } from "../text/label";
import ErrorInputMessage from "../ui/error-input-message";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelMessage?: string | null;
  hint: string;
  error?: string;
  allowedChar?: "letters" | "integer" | "decimal" | "currency" | "default";
  suffix?: string | null;
  isPassword?: boolean;
  required?: boolean;
  name?: string;
}

export function AppInput({
  label,
  labelMessage = null,
  hint,
  error,
  name,
  required = false,
  allowedChar = "default",
  className,
  onChange,
  isPassword = false,
  suffix = null,
  ...props
}: AppInputProps) {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFocusedRef = useRef(false);

  useEffect(() => {
    if (props.value === undefined) return;

    // jika sedang focus, jangan overwrite (user sedang mengetik)
    if (isFocusedRef.current) return;

    if (allowedChar === "currency") {
      const numeric = Number(String(props.value).replace(/[^\d]/g, "")) || 0;
      const formatted =
        numeric === 0 && (props.value === "" || props.value === null)
          ? "" // preserve empty
          : formatRupiah(numeric);

      if (formatted !== value) {
        setValue(formatted);
      }
    } else {
      const str =
        props.value !== null && props.value !== undefined
          ? String(props.value)
          : "";
      if (str !== value) setValue(str);
    }
    // ignore value in deps to avoid loop; we only run when props.value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, allowedChar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (allowedChar === "currency") {
      // Hanya angka
      const raw = newValue.replace(/\D/g, ""); // masih string
      const numericValue = Number(raw); // konversi ke number
      const formatted = formatRupiah(numericValue);

      setValue(formatted);

      // Kirim angka murni ke parent
      onChange?.({
        ...e,
        target: { ...e.target, value: raw },
      });

      return;
    }

    if (allowedChar === "integer") {
      newValue = newValue.replace(/[^0-9]/g, "");
    } else if (allowedChar === "decimal") {
      newValue = newValue.replace(/[^0-9.]/g, "");
      const parts = newValue.split(".");
      if (parts.length > 2) {
        newValue = parts[0] + "." + parts.slice(1).join("");
      }
    } else if (allowedChar === "letters") {
      newValue = newValue.replace(/[^a-zA-Z.\s]/g, "");
    }

    setValue(newValue);
    onChange?.({ ...e, target: { ...e.target, value: newValue } });
  };

  const resolvedType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : allowedChar === "integer" || allowedChar === "decimal"
      ? "tel"
      : "text";

  return (
    <div className="flex w-full flex-col space-y-1">
      <Label htmlFor={name} required={required} text={label} />
      {labelMessage && <p className="text-xs text-gray-500">{labelMessage}</p>}

      <div className="relative">
        <input
          {...props}
          type={resolvedType}
          placeholder={hint}
          className={clsx(
            "bg-card-background w-full rounded-lg border px-4 py-2 pr-12 text-sm transition duration-200 outline-none",
            error
              ? "border-red-500 focus:border-red-600"
              : "border-gray-300 focus:border-gray-500",
            props.disabled && "cursor-not-allowed bg-gray-100 text-gray-400",
            className,
          )}
          value={value}
          onChange={handleChange}
        />

        {isPassword ? (
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {!showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : suffix ? (
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-600">
            {suffix}
          </span>
        ) : null}
      </div>

      <ErrorInputMessage error={error} />
    </div>
  );
}
