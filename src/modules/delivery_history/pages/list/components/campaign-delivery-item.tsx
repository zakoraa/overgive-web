"use client";

import { Card } from "@/core/components/ui/card";
import { Title } from "@/core/components/text/title";
import { formatDate } from "@/core/utils/date";
import { useRouter } from "next/navigation";
import { CampaignDeliveryHistoryList } from "../types/campaign-delivery-history";
import { useVerifyCampaignDeliveryHistoryList } from "../hooks/use-verify-campaign-delivery-history-list";
import { CheckCircle, XCircle } from "lucide-react";

interface CampaignDeliveryItemProps {
  item: CampaignDeliveryHistoryList;
}

export const CampaignDeliveryItem = ({ item }: CampaignDeliveryItemProps) => {
  const router = useRouter();
  const { isValid, loading: isValidating } =
    useVerifyCampaignDeliveryHistoryList(item);
  return (
    <Card
      onClick={() => router.push(`/delivery-history/${item.id}`)}
      className="hover:bg-hover cursor-pointer rounded-lg p-3 transition-colors duration-300 md:rounded-2xl"
    >
      <Title size="sm" text={item.title} />

      {item.note && (
        <div
          className="prose prose-sm line-clamp-2 max-w-none text-xs font-light text-gray-500"
          dangerouslySetInnerHTML={{ __html: item.note }}
        />
      )}
      {isValidating ? (
        <></>
      ) : isValid ? (
        <div className="my-2 flex items-start space-x-2 text-xs text-green-500">
          <CheckCircle className="h-4 w-4" /> <p>Terverifikasi</p>
        </div>
      ) : (
        <div className="my-2 flex items-start space-x-2 text-xs text-red-500">
          <XCircle className="h-4 w-4" />{" "}
          <p>Data telah dimanipulasi (tidak sesuai blockchain)</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        {item.created_by && (
          <p className="text-sm">
            Dibuat oleh:
            <span className="font-semibold">
              {" "}
              {item.created_by.name} ({item.created_by.email})
            </span>
          </p>
        )}
        <p className="text-xs font-semibold text-gray-500">
          {" "}
          {formatDate(item.created_at)}
        </p>
      </div>
    </Card>
  );
};
