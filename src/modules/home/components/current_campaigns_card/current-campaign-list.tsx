import { ChevronLeft, ChevronRight } from "lucide-react";
import { CampaignVerticalCard } from "../../../../core/components/donation_campaign_card/campaign-vertical-card";
import { useHorizontalScroll } from "../../hooks/use-horizontal-scroll";

export const CurrentCampaignList = () => {
  const { scrollRef, scroll } = useHorizontalScroll();
  return (
    <>
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="mb-3 shrink-0">
            <CampaignVerticalCard />
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
    </>
  );
};
