import { saveDonationToBlockchain } from "@/modules/donation/services/save-donation-to-blockchain";
import { ethers } from "ethers";

// ================= SKRIPSI =================
jest.mock("ethers", () => {
  const original = jest.requireActual("ethers");

  return {
    ...original,
    ethers: {
      ...original.ethers,
      JsonRpcProvider: jest.fn(),
      Wallet: jest.fn(),
      Contract: jest.fn(),
    },
  };
});

describe("Unit Test saveDonationToBlockchain", () => {
  beforeEach(() => {
    process.env.CONTRACT_RPC = "http://rpc";
    process.env.CONTRACT_PRIVATE_KEY = "private-key";
    process.env.CONTRACT_ADDRESS = "0xcontract";
  });

  // ================= TERPAKAI =================
  // =================== HAPPY PATH ===================
  it("Happy Path: berhasil menyimpan donasi ke blockchain", async () => {
    const mockWait = jest.fn().mockResolvedValue({
      hash: "0xtx",
      blockNumber: 123,
      gasUsed: BigInt(21000),
      gasPrice: BigInt(1000000000),
    });

    (ethers.Contract as jest.Mock).mockImplementation(() => ({
      storeDonation: jest.fn().mockResolvedValue({
        wait: mockWait,
      }),
    }));

    const result = await saveDonationToBlockchain(
      "donation-1",
      "campaign-1",
      "payment-1",
      10000,
      "IDR",
      "abcdef",
      1700000000
    );

    expect(result.txHash).toBe("0xtx");
    expect(result.blockNumber).toBe(123);
  });

  // =================== ERROR PATH ===================
  it("Error Path: gagal jika env blockchain tidak lengkap", async () => {
    delete process.env.CONTRACT_RPC;

    await expect(
      saveDonationToBlockchain(
        "donation-1",
        "campaign-1",
        "payment-1",
        10000,
        "IDR",
        "abcdef",
        1700000000
      )
    ).rejects.toThrow("Missing blockchain env variables");
  });

   it("Error Path: gagal kirim tx ke blockchain", async () => {
    (ethers.Contract as jest.Mock).mockImplementation(() => ({
      storeDonation: jest.fn().mockRejectedValue(
        new Error("Blockchain transaction failed")
      ),
    }));

    const result = await saveDonationToBlockchain(
      "donation-1",
      "campaign-1",
      "payment-1",
      10000,
      "IDR",
      "abcdef",
      1700000000
    );

    // Karena di fungsi asli, error blockchain non-fatal → tetap return null txHash
    expect(result.txHash).toBeNull();
  });


  // ================= TERPAKAI =================
    // ================== ERROR PATH – DATA TIDAK VALID ==================
  it("Error Path: gagal jika data donasi tidak valid (amount negatif)", async () => {
    await expect(
      saveDonationToBlockchain(
        "donation-1",
        "campaign-1",
        "payment-1",
        -5000, // amount tidak valid
        "IDR",
        "abcdef",
        1700000000
      )
    ).rejects.toThrow("Invalid donation data"); // perlu validasi di fungsi
  });

  // ================= TERPAKAI =================
  it("Error Path: gagal jika data donasi tidak valid (donationId kosong)", async () => {
    await expect(
      saveDonationToBlockchain(
        "", // donationId kosong
        "campaign-1",
        "payment-1",
        10000,
        "IDR",
        "abcdef",
        1700000000
      )
    ).rejects.toThrow("Invalid donation data"); // perlu validasi di fungsi
  });

});
