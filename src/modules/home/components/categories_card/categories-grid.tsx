"use client";
import { Label } from "@/core/components/text/label";
import { Card } from "@/core/components/ui/card";
import { CATEGORY_MAP } from "@/modules/categories/types/campaign-category";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Pendidikan",
    background: "/icons/categories/backgrounds/bg-education.svg",
    icon: "/icons/categories/icons/ic-education.png",
  },
  {
    name: "Lingkungan",
    background: "/icons/categories/backgrounds/bg-environment.svg",
    icon: "/icons/categories/icons/ic-environment.png",
  },
  {
    name: "Bencana Alam",
    background: "/icons/categories/backgrounds/bg-natural-disaster.svg",
    icon: "/icons/categories/icons/ic-natural-disaster.png",
  },
  {
    name: "Kesehatan",
    background: "/icons/categories/backgrounds/bg-health.svg",
    icon: "/icons/categories/icons/ic-health.png",
  },
  {
    name: "Panti Asuhan",
    background: "/icons/categories/backgrounds/bg-orphanage.svg",
    icon: "/icons/categories/icons/ic-orphanage.png",
  },
  {
    name: "Rumah Ibadah",
    background: "/icons/categories/backgrounds/bg-worship-place.svg",
    icon: "/icons/categories/icons/ic-worship-place.png",
  },
  {
    name: "Difabel",
    background: "/icons/categories/backgrounds/bg-disability.svg",
    icon: "/icons/categories/icons/ic-disability.png",
  },
  {
    name: "Lainnya",
    background: "/icons/categories/backgrounds/bg-others.svg",
    icon: "/icons/categories/icons/ic-others.png",
  },
];

export const CategoriesGrid = () => {
  const router = useRouter();
  return (
    <div className="mt-5 grid grid-cols-4 gap-6 md:gap-8">
      {categories.map((cat) => (
        <div
          key={cat.name}
          onClick={() =>
            router.push(`/categories?cat=${CATEGORY_MAP[cat.name]}`)
          }
          className="group flex cursor-pointer flex-col items-center"
        >
          <Card className="bg-muted flex flex-col items-center justify-center gap-2 rounded-full border-none">
            <div className="relative flex h-16 w-16 items-center justify-center">
              {/* Background */}
              <Image
                src={cat.background}
                height={100}
                width={100}
                alt={`${cat.name}-icon-bg`}
                className="absolute inset-0 z-0 h-full w-full object-cover"
              />

              {/* Icon */}
              <Image
                src={cat.icon}
                height={45}
                width={45}
                alt={`${cat.name}-icon`}
                onClick={() => router.push("/categories")}
                className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
            </div>
          </Card>
          <Label
            size="sm"
            className="mt-1 text-center font-bold"
            text={cat.name}
          />
        </div>
      ))}
    </div>
  );
};
