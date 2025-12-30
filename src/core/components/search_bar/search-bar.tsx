
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
}

export const SearchBar = ({
  placeholder = "Cari kampanye",
  onSearch,
  debounceTime = 400,
}: SearchBarProps) => {
  const [value, setValue] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(e.target.value.trim());
    }, debounceTime);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex w-full items-center rounded-xl border border-gray-300 px-3 py-2">
      <Image
        src="/icons/ic-search.svg"
        alt="search-icon"
        height={18}
        width={18}
        className="opacity-60"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="ml-3 w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
};
