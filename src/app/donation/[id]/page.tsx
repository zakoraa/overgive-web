import {  DonationDetailPage } from "@/modules/donation/pages/detail";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <DonationDetailPage donationId={id} />;
}
