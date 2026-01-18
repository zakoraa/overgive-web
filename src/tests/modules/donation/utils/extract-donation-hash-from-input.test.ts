import { extractDonationHashFromInput } from "@/modules/donation/utils/extract-donation-hash-from-input";
import { ethers } from "ethers";

describe("Unit Test extractDonationHashFromInput", () => {

  afterEach(() => {
    jest.restoreAllMocks(); // kembalikan semua spy setelah setiap test
  });

  // =================== HAPPY PATH ===================
  it("Happy Path: berhasil mengekstrak donation hash dari input data valid", () => {
    const mockDecoded = {
      args: [
        "arg0", "arg1", "arg2", "arg3", "arg4",
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
      ],
    };

    // Mock Interface, cukup objek dengan parseTransaction
    jest.spyOn(ethers, "Interface" as any).mockImplementation(() => ({
      parseTransaction: jest.fn().mockReturnValue(mockDecoded),
    }));

    const result = extractDonationHashFromInput("0xdata");

    expect(result).toBe("abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890");
  });

  // =================== ALTERNATIVE PATH ===================
  it("Alternative Path: input valid tapi args[5] undefined → return empty string", () => {
    const mockDecoded = { args: ["arg0", "arg1"] };

    jest.spyOn(ethers, "Interface" as any).mockImplementation(() => ({
      parseTransaction: jest.fn().mockReturnValue(mockDecoded),
    }));

    const result = extractDonationHashFromInput("0xdata");

    expect(result).toBe("");
  });

  // =================== ERROR PATH ===================
  it("Error Path: parseTransaction lempar error → return empty string", () => {
    jest.spyOn(ethers, "Interface" as any).mockImplementation(() => ({
      parseTransaction: jest.fn().mockImplementation(() => {
        throw new Error("Invalid transaction data");
      }),
    }));

    const result = extractDonationHashFromInput("0xinvalid");

    expect(result).toBe("");
  });

});
