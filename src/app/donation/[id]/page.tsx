import { DonationDetail } from "@/modules/donation/pages/detail";
import { getDonationByIdAction } from "@/modules/donation/services/get-donation-by-id";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await getDonationByIdAction(id);

  if (!res.success || !res.data) {
    notFound();
  }

  return <DonationDetail donation={res.data} />;
}
