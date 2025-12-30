import { DonatePage } from "@/modules/donate";

interface DonatePageProps {
  params: { id: string };
}

export default async function Page({ params }: DonatePageProps) {
  const { id } = await params;

  return <DonatePage campaignId={id} />;
}
