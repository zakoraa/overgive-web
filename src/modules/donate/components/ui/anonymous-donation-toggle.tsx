import { cn } from "@/core/lib/utils";

interface AnonymousDonationToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;

  label?: string;
  description?: string;

  disabled?: boolean;
  error?: string;

  className?: string;
}

export const AnonymousDonationToggle = ({
  value,
  onChange,
  label = "Sembunyikan nama saya (donasi sebagai anonim)",
  description,
  disabled,
  error,
  className,
}: AnonymousDonationToggleProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "flex items-center justify-between rounded-xl border px-4 py-4 transition",
          error ? "border-red-500" : "border-gray-200",
          disabled && "opacity-60",
        )}
      >
        {/* Text */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700">{label}</span>

          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>

        {/* Switch */}
        <button
          type="button"
          disabled={disabled}
          aria-checked={value}
          onClick={() => onChange(!value)}
          className={cn(
            "relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition",
            value ? "bg-primary" : "bg-gray-300",
          )}
        >
          <span
            className={cn(
              "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
              value ? "translate-x-5" : "translate-x-1",
            )}
          />
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
