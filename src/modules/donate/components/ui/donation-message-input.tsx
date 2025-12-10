import { cn } from "@/core/lib/utils";

interface DonationMessageInputProps {
  value: string;
  onChange: (value: string) => void;

  label?: string;
  placeholder?: string;

  maxLength?: number;
  showCounter?: boolean;

  disabled?: boolean;
  error?: string;
  helperText?: string;

  className?: string;
  textareaClassName?: string;
}

export const DonationMessageInput = ({
  value,
  onChange,
  label = "Berikan doa dan dukungan (opsional)",
  placeholder = "Tulis doa atau dukungan yang ingin kamu sampaikan.",
  maxLength = 300,
  showCounter = true,
  disabled = false,
  error,
  helperText,
  className,
  textareaClassName,
}: DonationMessageInputProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Label */}
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}

      {/* Textarea */}
      <div
        className={cn(
          "bg-card-background relative mt-2 rounded-xl border",
          error ? "border-red-500" : "border-gray-300",
          disabled && "bg-gray-100",
        )}
      >
        <textarea
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={5}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full resize-none rounded-xl px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400",
            disabled && "cursor-not-allowed",
            textareaClassName,
          )}
        />

        {/* Counter */}
        {showCounter && maxLength && (
          <span className="absolute right-3 bottom-2 text-xs text-gray-400">
            {value.length} / {maxLength}
          </span>
        )}
      </div>

      {/* Helper / Error */}
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        helperText && <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
