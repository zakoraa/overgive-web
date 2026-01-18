import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { convertGasfeeToIDR } from "@/core/utils/convert-gas-fee-to-idr";
import { convertGasFeeWeiToMatic } from "@/core/utils/convert-gas-fee-to-idr";
import { calculateQrisFee } from "@/core/utils/calculate-qris-xendit";
import { getTxReceiptByHash } from "@/core/services/get-transactions-from-tx-hash";
import { sleep } from "@/core/utils/sleep";
import { getDonationSettlementSummaryByCampaign } from "@/modules/donation-settlement/services/get-donation-settlement-summary-by-campaign";

/* =========================
   MOCK DEPENDENCIES
========================= */
jest.mock("@/core/lib/supabase/supabase-server");
jest.mock("@/core/utils/convert-gas-fee-to-idr");
jest.mock("@/core/utils/calculate-qris-xendit");
jest.mock("@/core/services/get-transactions-from-tx-hash");
jest.mock("@/core/utils/sleep", () => ({
  sleep: jest.fn(() => Promise.resolve()),
}));

/* =========================
   SUPABASE MOCK HELPER
========================= */
const mockSupabase = {
  from: jest.fn(),
};

const mockQuery = {
  select: jest.fn(),
  eq: jest.fn(),
  not: jest.fn(),
  is: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();

  (supabaseServer as jest.Mock).mockResolvedValue(mockSupabase);
  mockSupabase.from.mockReturnValue(mockQuery);

  // semua chainable return mockQuery
  mockQuery.select.mockReturnValue(mockQuery);
  mockQuery.eq.mockReturnValue(mockQuery);
  mockQuery.not.mockReturnValue(mockQuery);
  mockQuery.is.mockReturnValue(mockQuery);
});


function setupSupabaseMock({
  donations = [],
  deliveries = [],
  opsCosts = [],
  donationError = null,
  deliveryError = null,
}: {
  donations?: any[];
  deliveries?: any[];
  opsCosts?: any[];
  donationError?: any;
  deliveryError?: any;
}) {
  const donationsQuery = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    not: jest.fn().mockReturnThis(),
    then: jest.fn((resolve) =>
      resolve({ data: donations, error: donationError })
    ),
  };

  const deliveriesQuery = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    not: jest.fn().mockReturnThis(),
    then: jest.fn((resolve) =>
      resolve({ data: deliveries, error: deliveryError })
    ),
  };

  const opsQuery = {
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    is: jest.fn().mockReturnThis(),
    then: jest.fn((resolve) =>
      resolve({ data: opsCosts, error: null })
    ),
  };

  mockSupabase.from.mockImplementation((table) => {
    if (table === "donations") return donationsQuery;
    if (table === "campaign_delivery_histories") return deliveriesQuery;
    if (table === "campaign_operational_costs") return opsQuery;
    return mockQuery;
  });
}


/* =========================
   DUMMY DATA
========================= */
const donationsMock = [
  {
    id: "1",
    amount: 100_000,
    currency: "IDR",
    blockchain_tx_hash: "0xabc",
    created_at: new Date().toISOString(),
    campaigns: {
      title: "Campaign Test",
    },
  },
];

const receiptMock = {
  gasUsed: "21000",
  effectiveGasPrice: "1000000000",
};

/* =========================
   TEST SUITE
========================= */
describe("getDonationSettlementSummaryByCampaign", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* =========================
     ✅ HAPPY PATH
  ========================= */
  it("berhasil menghitung settlement summary", async () => {
  setupSupabaseMock({
    donations: donationsMock,
    deliveries: [{ id: "d1", blockchain_tx_hash: "0xdef" }],
  });

  (convertGasfeeToIDR as jest.Mock).mockResolvedValue(1000);
  (convertGasFeeWeiToMatic as jest.Mock).mockReturnValue(0.000021);
  (calculateQrisFee as jest.Mock).mockReturnValue(700);
  (getTxReceiptByHash as jest.Mock).mockResolvedValue(receiptMock);

  const result = await getDonationSettlementSummaryByCampaign("campaign-1");

  expect(result.total_gross).toBe(100000);
  expect(result.total_xendit_fee).toBe(700);
  expect(result.total_donation_gas_fee).toBeGreaterThan(0);
  expect(result.total_delivery_gas_fee).toBeGreaterThan(0);
  expect(result.total_fee).toBeGreaterThan(0);
  expect(result.final_net).toBeLessThan(result.total_gross);
  expect(result.currency).toBe("IDR");
});


  /* =========================
     ❌ DONATION KOSONG
  ========================= */
 it("throw error jika tidak ada settlement", async () => {
  setupSupabaseMock({
    donations: [],
    deliveries: [],
  });

  await expect(
    getDonationSettlementSummaryByCampaign("campaign-x")
  ).rejects.toThrow("No settlements found");
});


  /* =========================
     ❌ SUPABASE ERROR
  ========================= */
  it("throw error jika supabase error", async () => {
  setupSupabaseMock({
    donations: [],
    donationError: new Error("Supabase error"),
  });

  await expect(
    getDonationSettlementSummaryByCampaign("campaign-x")
  ).rejects.toThrow("Supabase error");
});


  /* =========================
     ⚠️ RECEIPT TIDAK VALID (gas kosong)
  ========================= */
 it("skip gas fee jika receipt tidak valid", async () => {
  setupSupabaseMock({ donations: donationsMock });

  (convertGasfeeToIDR as jest.Mock).mockResolvedValue(1000);
  (calculateQrisFee as jest.Mock).mockReturnValue(700);
  (getTxReceiptByHash as jest.Mock).mockResolvedValue({
    gasUsed: null,
    effectiveGasPrice: null,
  });

  const result = await getDonationSettlementSummaryByCampaign("campaign-1");

  expect(result.total_donation_gas_fee).toBe(0);
  expect(result.total_xendit_fee).toBe(0); 
});



  /* =========================
     ⚠️ BLOCKCHAIN RECEIPT ERROR
  ========================= */
  it("throw error jika getTxReceiptByHash gagal", async () => {
  setupSupabaseMock({ donations: donationsMock });

  (convertGasfeeToIDR as jest.Mock).mockResolvedValue(1000);
  (getTxReceiptByHash as jest.Mock).mockRejectedValue(
    new Error("RPC error")
  );

  await expect(
    getDonationSettlementSummaryByCampaign("campaign-1")
  ).rejects.toThrow("RPC error");
});


  /* =========================
     ⚠️ ADA OPERATIONAL COST
  ========================= */
  it("mengurangi operational cost dari final net", async () => {
  setupSupabaseMock({
    donations: donationsMock,
    opsCosts: [
      { amount: 10_000 },
      { amount: 5_000 },
    ],
  });

  (convertGasfeeToIDR as jest.Mock).mockResolvedValue(1000);
  (convertGasFeeWeiToMatic as jest.Mock).mockReturnValue(0.000021);
  (calculateQrisFee as jest.Mock).mockReturnValue(700);
  (getTxReceiptByHash as jest.Mock).mockResolvedValue(receiptMock);

  const result = await getDonationSettlementSummaryByCampaign("campaign-1");

  expect(result.total_operational).toBe(15000);
  expect(result.final_net).toBeLessThan(result.total_net);
});


  /* =========================
     💤 SLEEP DIPANGGIL
  ========================= */
  it("memanggil sleep untuk setiap donation", async () => {
    setupSupabaseMock({ donations: donationsMock });

    (convertGasfeeToIDR as jest.Mock).mockResolvedValue(1000);
    (convertGasFeeWeiToMatic as jest.Mock).mockReturnValue(0.000021);
    (calculateQrisFee as jest.Mock).mockReturnValue(700);
    (getTxReceiptByHash as jest.Mock).mockResolvedValue(receiptMock);

    await getDonationSettlementSummaryByCampaign("campaign-1");

    expect(sleep).toHaveBeenCalled();
  });
});
