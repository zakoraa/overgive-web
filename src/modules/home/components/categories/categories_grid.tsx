import { Label } from "@/components/text/label";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const categories = [
  { name: "Pendidikan", icon: "/icons/categories/ic-education.svg" },
  { name: "Lingkungan", icon: "/icons/categories/ic-environment.svg" },
  { name: "Bencana Alam", icon: "/icons/categories/ic-natural_disaster.svg" },
  { name: "Kesehatan", icon: "/icons/categories/ic-health.svg" },
  { name: "Panti Asuhan", icon: "/icons/categories/ic-orphanage.svg" },
  { name: "Rumah Ibadah", icon: "/icons/categories/ic-worship_place.svg" },
  { name: "Difabel", icon: "/icons/categories/ic-disability.svg" },
  { name: "Lainnya", icon: "/icons/categories/ic-others.svg" },
];

export const CategoriesGrid = () => {
 return <div className="mt-8 grid grid-cols-4 gap-10">
    {categories.map((cat) => (
      <div
        key={cat.name}
        className="group flex cursor-pointer flex-col items-center justify-center"
      >
        <Card className="bg-muted flex h-12 w-12 flex-col items-center justify-center gap-2 rounded-full border-none transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          <Image
            src={cat.icon}
            height={40}
            width={40}
            alt={`${cat.name}-icon`}
            className="transition-transform duration-300"
          />
        </Card>
        <Label className="mt-1" text={cat.name} />
      </div>
    ))}
  </div>;
};
