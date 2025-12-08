"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/core/utils/util";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/core/components/ui/input/app-search-select/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/input/app-search-select/popover";
import { Label } from "@/core/components/text/label";
import { Button } from "../../button/app-button-shadcn";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface AppSearchSelectInfiniteProps {
  label?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  placeholderSearch?: string;

  options: SelectOption[];

  /** dipanggil ketika scroll untuk pagination */
  onLoadMore?: () => Promise<void>;

  /** dipanggil saat mengetik di search bar */
  onSearch?: (text: string) => void;

  loadingMore?: boolean;
  hasMore?: boolean;

  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string | number) => void;
  error?: string;
  hint?: string;
}

export function AppSearchSelectInfinite({
  label,
  name,
  value,
  placeholder = "Cari atau pilih...",
  options,
  placeholderSearch = "Cari...",
  onLoadMore,
  onSearch,
  loadingMore,
  hasMore = true,
  required,
  disabled,
  className,
  onChange,
  error,
  hint,
}: AppSearchSelectInfiniteProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel =
    options.find((opt) => String(opt.value) === String(value))?.label ?? "";

  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const handleScroll = async () => {
    const el = contentRef.current;
    if (!el || !onLoadMore || loadingMore || !hasMore) return;

    const threshold = 40;
    const bottom = el.scrollHeight - el.scrollTop - el.clientHeight;

    if (bottom < threshold) {
      await onLoadMore();
    }
  };

  return (
    <div className={cn("flex w-full flex-col space-y-1", className)}>
      {label && (
        <Label
          htmlFor={name}
          text={label}
          required={required}
          className={cn(disabled && "opacity-60")}
        />
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full cursor-pointer justify-between text-left font-normal",
              !selectedLabel && "text-gray-400",
            )}
          >
            {selectedLabel || placeholder}
            <ChevronsUpDown className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            {/* Tambahkan handler untuk onSearch */}
            <CommandInput
              placeholder={placeholderSearch}
              onValueChange={(val) => onSearch?.(val)}
            />

            <CommandEmpty>Tidak ditemukan hasil</CommandEmpty>

            <div
              ref={contentRef}
              onScroll={handleScroll}
              className="max-h-60 overflow-auto"
            >
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={String(opt.label)}
                    onSelect={() => {
                      onChange?.(opt.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        String(value) === String(opt.value)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {opt.label}
                  </CommandItem>
                ))}

                {loadingMore && (
                  <div className="p-2 text-center text-sm text-gray-500">
                    Loading...
                  </div>
                )}

                {!hasMore && (
                  <div className="p-2 text-center text-xs text-gray-400">
                    Semua data telah dimuat
                  </div>
                )}
              </CommandGroup>
            </div>
          </Command>
        </PopoverContent>
      </Popover>

      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
