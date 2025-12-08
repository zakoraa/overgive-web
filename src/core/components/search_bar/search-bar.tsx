import Image from "next/image";
import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (value: string) => void;
}

export const SearchBar = ({
  placeholder = "Cari kampanye",
  onSearch,
}: SearchBarProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

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
        onChange={(e) => setValue(e.target.value)}
        className="ml-3 w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
};
