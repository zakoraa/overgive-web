import { Card } from "@/components/ui/card";
import { MyDonationCard } from "./components/my-donation-card";
import { MarginTopNavbar } from "@/components/ui/margin-top-navbar";
import { Title } from "@/components/text/title";
import { Line } from "@/components/ui/line";
import { SearchBarWithSort } from "@/components/ui/search-bar-with-sort";

export const MyDonations = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center space-y-2 md:max-w-[600px]">
      <MarginTopNavbar />
      <Card className="w-full space-y-2 px-10 py-3">
        <Title text="Donasi Saya" />
        <Line className="mb-2!" />
        <SearchBarWithSort placeholder="Cari donasi" />
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <MyDonationCard key={i} />
        ))}
      </Card>
    </section>
  );
};
