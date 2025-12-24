import { Label } from "@/core/components/text/label";
import { Card } from "@/core/components/ui/card";
import { Donation } from "@/modules/donation/types/donation";
import { formatRupiah } from "@/core/utils/currency";
import { timeAgo } from "@/core/utils/date";
import { useRouter } from "next/navigation";

export const MyDonationCard = ({ donation }: { donation: Donation }) => {
  const { campaign } = donation;
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/donation/${donation.id}`)}
      className="hover:bg-hover flex h-24 cursor-pointer transition-colors duration-300"
    >
      <img
        src={
          campaign.image_url ??
          "https://www.jagaindonesia.com/wp-content/uploads/2023/03/Papua.jpg"
        }
        height={100}
        width={100}
        alt="campaign-image"
        className="h-full rounded-s-2xl object-cover"
      />
      <div className="m-3 flex w-full flex-col justify-between">
        <Label size="md" className="text-start" text={campaign.title} />
        <div className="space-y-1">
          <p className="text-sm">
            Berdonasi sebesar{"  "}
            <span className="font-black">{formatRupiah(donation.amount)}</span>
          </p>
          <p className="mt-3 text-end text-xs text-gray-500">
            {timeAgo(donation.created_at)}
          </p>
        </div>
      </div>
    </Card>
  );
};
