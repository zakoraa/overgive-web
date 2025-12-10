"use client";

import { useState } from "react";
import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import { useCampaignDetailContext } from "../providers/campaign-detail-provider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/core/lib/utils";

export const CampaignBackgroundCard = () => {
  const { campaign } = useCampaignDetailContext();
  const [expanded, setExpanded] = useState(false);

  if (!campaign) return null;

  return (
    <Card className="relative space-y-3 px-5 py-5 text-sm">
      <Title text="Latar Belakang" />

      {/* Content */}
      <div
        className={cn(
          "prose max-w-none overflow-hidden transition-all duration-300",
          !expanded && "max-h-40",
        )}
        dangerouslySetInnerHTML={{ __html: campaign.backgroundHtml }}
      />

      {/* Overlay + Read more */}
      {!expanded && (
        <div className="from-background via-background/80 absolute right-0 bottom-0 left-0 flex justify-center bg-linear-to-t to-transparent pt-16">
          <button
            onClick={() => setExpanded(true)}
            className="mb-3 flex cursor-pointer items-center gap-1 rounded-full bg-white px-4 py-1 text-sm font-medium shadow transition-colors duration-300 hover:bg-gray-100"
          >
            Baca selengkapnya
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Collapse button */}
      {expanded && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setExpanded(false)}
            className="text-primary flex cursor-pointer items-center gap-1 text-sm"
          >
            Tampilkan lebih sedikit
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
      )}
    </Card>
  );
};
