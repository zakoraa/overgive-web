import { ethers } from "ethers";
import { CAMPAIGN_DELIVERY_ABI } from "../lib/abi/campaign-delivery-histories-abi";

export function extractDeliveryHistoryHashFromInput(
  input?: string | null
): string | null {
  if (!input || input === "0x") return null;

  try {
    const iface = new ethers.Interface(CAMPAIGN_DELIVERY_ABI);
    const decoded = iface.parseTransaction({ data: input });

    if (!decoded?.args || decoded.args.length < 4) {
      return null;
    }

    const hashBytes32 = decoded.args[3];

    if (typeof hashBytes32 !== "string") return null;

    return hashBytes32.replace(/^0x/, "");
  } catch {
    return null;
  }
}
