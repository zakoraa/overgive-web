import { getTxReceiptByHash } from "@/core/services/get-transactions-from-tx-hash";

// ================= SKRIPSI =================
describe("Unit Test getTxReceiptByHash", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).fetch = mockFetch;
    process.env.POLYGONSCAN_API_KEY = "dummy-api-key";
  });

  // ================= TERPAKAI =================
  // =================== HAPPY PATH ===================
  it("Happy Path: berhasil mengambil tx receipt dari blockchain", async () => {
    const mockReceipt = {
      gasUsed: "21000",
      effectiveGasPrice: "1000000000",
    };

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        result: mockReceipt,
      }),
    });

    const result = await getTxReceiptByHash("0xabc");

    expect(fetch).toHaveBeenCalled();
    expect(result.gasUsed).toBe("21000");
    expect(result.effectiveGasPrice).toBe("1000000000");
  });

  // ================= TERPAKAI =================
  // =================== ALTERNATIVE PATH ===================
  it("Alternative Path: response result kosong → throw error", async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        result: null,
      }),
    });

    await expect(
      getTxReceiptByHash("0xnotfound")
    ).rejects.toThrow("TX receipt tidak ditemukan");
  });

  // =================== ERROR PATH ===================
  it("Error Path: API key belum diset → throw error", async () => {
    delete process.env.POLYGONSCAN_API_KEY;

    await expect(
      getTxReceiptByHash("0xabc")
    ).rejects.toThrow("POLYGONSCAN_API_KEY belum diset");
  });

  it("Error Path: fetch gagal → throw error", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));

    await expect(getTxReceiptByHash("0xabc")).rejects.toThrow(
      "Network failure"
    );
  });
});
