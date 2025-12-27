"use client";

import { Card } from "@/core/components/ui/card";
import { Title } from "@/core/components/text/title";
import { useCampaignDeliveryHistoriesContext } from "../providers/get-campaign-delivery-histories-provider";
import CircularLoading from "@/core/components/ui/circular-loading";
import { formatDate } from "@/core/utils/date";
import { useRouter } from "next/navigation";

export const CampaignDelivaryCard = () => {
  const router = useRouter();
  const { data, loading } = useCampaignDeliveryHistoriesContext();

  if (loading) {
    return <CircularLoading />;
  }

  if (data.length === 0) {
    return (
      <p className="text-center text-xs text-gray-500">
        Belum ada kabar kampanye
      </p>
    );
  }

  return (
    <>
      {data.map((item) => (
        <Card
          onClick={() => router.push(`/delivery-history/${item.id}`)}
          key={item.id}
          className="hover:bg-hover cursor-pointer rounded-lg p-3 transition-colors duration-300 md:rounded-2xl"
        >
          <Title size="sm" text={item.title} />
          {item.note && (
            <div
              className="prose prose-sm line-clamp-2 max-w-none text-xs font-light text-gray-500"
              dangerouslySetInnerHTML={{ __html: item.note }}
            />
          )}

          <p className="mt-3 text-sm">
            Dibuat pada:
            <span className="font-semibold">
              {" "}
              {formatDate(item.created_at)}
            </span>
          </p>
        </Card>
      ))}
    </>
  );
};
