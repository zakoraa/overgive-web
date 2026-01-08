import { NextRequest } from "next/server";

jest.mock("@/core/lib/supabase/supabase-server");
jest.mock("@/core/lib/generate-donation-hash");
jest.mock("@/modules/donation/services/save-donation-to-blockchain");
jest.mock("@/modules/payment/services/update-collected-amount-campaign");

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { generateDonationHash } from "@/core/lib/generate-donation-hash";
import { saveDonationToBlockchain } from "@/modules/donation/services/save-donation-to-blockchain";
import { increaseCollectedAmount } from "@/modules/payment/services/update-collected-amount-campaign";
import { POST } from "@/app/api/xendit/webhook/route";

const mockSupabase = {
  from: jest.fn(),
};

const mockQuery = {
  select: jest.fn(),
  eq: jest.fn(),
  maybeSingle: jest.fn(),
  insert: jest.fn(),
};

const validPayload = {
  data: {
    status: "SUCCEEDED",
    reference_id: "donation_123",
    request_amount: 20000,
    currency: "IDR",
    metadata: {
      campaign_id: "campaign_1",
      username: "halo",
      email: "halo@gmail.com",
      is_anonymous: true,
    },
  },
};

beforeEach(() => {
  jest.clearAllMocks();

  (supabaseServer as jest.Mock).mockResolvedValue(mockSupabase);
  mockSupabase.from.mockReturnValue(mockQuery);

  mockQuery.select.mockReturnValue(mockQuery);
  mockQuery.eq.mockReturnValue(mockQuery);

  (generateDonationHash as jest.Mock).mockReturnValue("hash123");
  process.env.XENDIT_CALLBACK_TOKEN = "valid-token";
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("Xendit Webhook", () => {
  it("401 jika token invalid", async () => {
    const req = new NextRequest("http://test", {
      method: "POST",
      headers: { "x-callback-token": "wrong" },
      body: JSON.stringify(validPayload),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("abaikan jika status bukan SUCCEEDED", async () => {
    const req = new NextRequest("http://test", {
      method: "POST",
      headers: { "x-callback-token": "valid-token" },
      body: JSON.stringify({ data: { status: "PENDING" } }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  it("tidak insert jika donation sudah ada", async () => {
    mockQuery.maybeSingle.mockResolvedValueOnce({ data: { id: 1 } });

    const req = new NextRequest("http://test", {
      method: "POST",
      headers: { "x-callback-token": "valid-token" },
      body: JSON.stringify(validPayload),
    });

    await POST(req);

    expect(mockQuery.insert).not.toHaveBeenCalled();
    expect(increaseCollectedAmount).not.toHaveBeenCalled();
  });

  it("happy path: insert + update collected amount", async () => {
    mockQuery.maybeSingle.mockResolvedValueOnce({ data: null });
    mockQuery.insert.mockResolvedValueOnce({ error: null });

    (saveDonationToBlockchain as jest.Mock).mockResolvedValue({
      txHash: "0xabc",
    });

    const req = new NextRequest("http://test", {
      method: "POST",
      headers: { "x-callback-token": "valid-token" },
      body: JSON.stringify(validPayload),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(generateDonationHash).toHaveBeenCalled();
    expect(saveDonationToBlockchain).toHaveBeenCalled();
    expect(mockQuery.insert).toHaveBeenCalled();
    expect(increaseCollectedAmount).toHaveBeenCalled();
    expect(json.success).toBe(true);
  });

  it("insert gagal → 500 dan tidak update campaign", async () => {
    mockQuery.maybeSingle.mockResolvedValueOnce({ data: null });
    mockQuery.insert.mockResolvedValueOnce({
      error: new Error("DB error"),
    });

    const req = new NextRequest("http://test", {
      method: "POST",
      headers: { "x-callback-token": "valid-token" },
      body: JSON.stringify(validPayload),
    });

    const res = await POST(req);

    expect(res.status).toBe(500);
    expect(increaseCollectedAmount).not.toHaveBeenCalled();
  });

  it("blockchain gagal tapi donation tetap masuk", async () => {
    mockQuery.maybeSingle.mockResolvedValueOnce({ data: null });
    mockQuery.insert.mockResolvedValueOnce({ error: null });

    (saveDonationToBlockchain as jest.Mock).mockRejectedValue(
      new Error("Blockchain down")
    );

    const req = new NextRequest("http://test", {
      method: "POST",
      headers: { "x-callback-token": "valid-token" },
      body: JSON.stringify(validPayload),
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(mockQuery.insert).toHaveBeenCalled();
    expect(increaseCollectedAmount).toHaveBeenCalled();
  });
});
