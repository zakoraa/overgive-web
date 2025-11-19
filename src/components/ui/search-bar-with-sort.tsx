"use client";
import Image from "next/image";

interface SearchBarWithSortProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onSortClick?: () => void;
}

export const SearchBarWithSort = ({
  placeholder = "Cari kampanye...",
  onSearch,
  onSortClick,
}: SearchBarWithSortProps) => {
  return (
    <div className="flex w-full items-center justify-between space-x-3">
      {/* Search Bar */}
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
          onChange={(e) => onSearch?.(e.target.value)}
          className="ml-3 w-full bg-transparent text-sm outline-none"
        />
      </div>

      {/* Sort Button */}
      <div
        onClick={onSortClick}
        className="hover:bg-hover flex cursor-pointer items-center space-x-1 rounded-xl border border-gray-300 px-3 py-2 transition"
      >
        <Image
          src="/icons/ic-sort.svg"
          alt="icon-sort"
          height={20}
          width={20}
        />
      </div>
    </div>
  );
};
