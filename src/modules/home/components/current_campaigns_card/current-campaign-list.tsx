"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { CampaignVerticalCard } from "../../../../core/components/donation_campaign_card/campaign-vertical-card";
import { useHorizontalScroll } from "../../hooks/use-horizontal-scroll";
import { useCampaignHome } from "../../hooks/use-campaign-home";
import CircularLoading from "@/core/components/ui/circular-loading";

export const CurrentCampaignList = () => {
  const { scrollRef, scroll } = useHorizontalScroll();
  const { campaigns, loading, error } = useCampaignHome("current", 10);

  if (loading) return <CircularLoading />;
  if (error)
    return <div className="py-4 text-center text-red-500">{error}</div>;

  return (
    <div className="relative">
      {/* Tombol kiri */}
      <button
        onClick={() => scroll("left")}
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </button>

      {/* Wrapper scroll */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex space-x-3 overflow-x-scroll scroll-smooth px-8"
      >
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="mb-3 shrink-0">
            <CampaignVerticalCard campaign={campaign} />
          </div>
        ))}
      </div>

      {/* Tombol kanan */}
      <button
        onClick={() => scroll("right")}
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
};
