import { getTxByHash } from "@/core/services/get-transactions-from-tx-hash";

// ================= SKRIPSI =================
describe("Unit Test getTxByHash", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).fetch = mockFetch;
    process.env.POLYGONSCAN_API_KEY = "dummy-api-key";
  });

  // =================== TERPAKAI ===================
  // =================== HAPPY PATH ===================
  it("Happy Path: berhasil mengambil transaksi dari blockchain", async () => {
    const mockTx = {
      hash: "0xabc",
      from: "0x123",
      to: "0x456",
      value: "1000",
    };

    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        result: mockTx,
      }),
    });

    const result = await getTxByHash("0xabc");

    expect(fetch).toHaveBeenCalled();
    expect(result).toEqual(mockTx);
  });

  
  // =================== TERPAKAI ===================
  // =================== ALTERNATIVE PATH ===================
  it("Alternative Path: transaksi tidak ditemukan → throw error", async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        result: null,
      }),
    });

    await expect(getTxByHash("0xnotfound")).rejects.toThrow(
      "Transaksi tidak ditemukan di blockchain"
    );
  });

  // =================== ERROR PATH ===================
  it("Error Path: API key belum diset → throw error", async () => {
    delete process.env.POLYGONSCAN_API_KEY;

    await expect(getTxByHash("0xabc")).rejects.toThrow(
      "POLYGONSCAN_API_KEY belum diset"
    );
  });
});
