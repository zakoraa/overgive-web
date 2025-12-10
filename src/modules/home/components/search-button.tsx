"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SearchButton = () => {
  const route = useRouter();
  return (
    <div
      onClick={() => route.push("/search-campaign")}
      className="mb-2 flex w-full cursor-pointer items-center space-x-3 rounded-xl border border-gray-300 px-3 py-2 transition-colors duration-300 hover:bg-blue-100"
    >
      <Image
        src="/icons/ic-search.svg"
        alt="search-icon"
        height={18}
        width={18}
        className="opacity-60"
      />
      <p className="text-sm text-gray-500">Cari kampanye...</p>
    </div>
  );
};
