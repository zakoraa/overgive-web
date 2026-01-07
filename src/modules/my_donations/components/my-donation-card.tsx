import { Label } from "@/core/components/text/label";
import { Card } from "@/core/components/ui/card";
import { formatRupiah } from "@/core/utils/currency";
import { timeAgo } from "@/core/utils/date";
import { DonationWithBlockchain } from "@/modules/donation/services/get-donation-by-id";
import { VerificationStatus } from "@/core/components/ui/verification-status";

export const MyDonationCard = ({
  donation,
}: {
  donation: DonationWithBlockchain;
}) => {
  const { campaign } = donation;

  return (
    <Card
      href={`/donation/${donation.id}`}
      className="hover:bg-hover flex h-fit cursor-pointer transition-colors duration-300"
    >
      <img
        src={
          campaign.image_url ??
          "https://www.jagaindonesia.com/wp-content/uploads/2023/03/Papua.jpg"
        }
        height={100}
        width={150}
        alt="campaign-image"
        className="min-h-full w-[30%] rounded-s-2xl object-cover lg:w-[25%]"
      />
      <div className="m-3 flex w-full flex-col justify-between">
        <Label size="md" className="text-start" text={campaign.title} />

        <div className="space-y-1">
          <p className="text-sm">
            Berdonasi sebesar{"  "}
            <span className="font-black">{formatRupiah(donation.amount)}</span>
          </p>
          <div className="mt-3 flex justify-between">
            <VerificationStatus donation={donation} />
            <p className="text-end text-xs text-gray-500">
              {timeAgo(donation.created_at)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
