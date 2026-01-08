import { DonationSettlement } from "./components/donation-settlement";

interface Props {
  campaignId: string;
}

export const DonationSettlementPage = ({ campaignId }: Props) => {
  return <DonationSettlement campaignId={campaignId} />;
};
