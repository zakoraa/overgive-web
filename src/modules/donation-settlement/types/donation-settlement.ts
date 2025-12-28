import { CampaignOperationalCost } from "./campaign-operational-cost";

export interface DonationSettlement {
  id: string;
  donation_id: string;
  campaign_id: string;
  gross_amount: number;
  gas_fee: number;
  xendit_fee: number;
  total_fee: number;
  net_amount: number;
  currency: string;
  calculated_at: string;
  created_at: string;
  updated_at: string;
}

export interface DonationSettlementMeta {
  id: string;
  updated_at: string;
}

export interface DonationSettlementWithCampaignTitle extends DonationSettlement {
  campaign_title: string;
}

export interface DonationSettlementSummary {
  campaign_title: string;
  total_gross: number;
  total_gas_fee: number;
  total_xendit_fee: number;
  total_fee: number;
  total_net: number;
  operational_fees: CampaignOperationalCost[];
  total_operational: number;
  final_net: number;
  currency: string;
  updated_at: string;
}

