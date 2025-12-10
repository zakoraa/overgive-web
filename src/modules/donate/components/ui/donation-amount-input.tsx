import { cn } from "@/core/lib/utils";
import { ChangeEvent } from "react";

interface DonationAmountInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;

  min?: number;
  max?: number;

  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;

  error?: string;
  helperText?: string;

  className?: string;
  inputClassName?: string;
}

export const DonationAmountInput = ({
  label = "Isi Nominal Donasi",
  value,
  onChange,
  min,
  max,
  placeholder = "0",
  disabled,
  readOnly,
  error,
  helperText,
  className,
  inputClassName,
}: DonationAmountInputProps) => {
  const formatRupiah = (num: number) => {
    if (!num) return "";
    return num.toLocaleString("id-ID");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const numericValue = Number(raw);

    if (min && numericValue < min) {
      onChange(numericValue);
      return;
    }

    if (max && numericValue > max) {
      return;
    }

    onChange(numericValue);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={cn(
          "border-primary bg-background flex items-center rounded-xl border px-4 py-3 transition",
          error ? "border-red-500" : "border-primary",
          disabled && "opacity-60",
        )}
      >
        {/* Prefix */}
        <span className="mr-2 text-lg font-black text-gray-700">Rp</span>

        {/* Input */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={formatRupiah(value)}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={cn(
            "w-full bg-transparent text-right text-lg font-black text-gray-700 outline-none placeholder:text-gray-400",
            inputClassName,
          )}
        />
      </div>

      {/* Helper / Error */}
      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : (
        helperText && <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
