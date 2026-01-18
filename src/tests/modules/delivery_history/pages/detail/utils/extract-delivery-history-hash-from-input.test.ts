import { extractDeliveryHistoryHashFromInput } from "@/modules/delivery_history/pages/detail/utils/extract-delivery-history-hash-from-input";
import { ethers } from "ethers";

describe("Unit Test extractDeliveryHistoryHashFromInput", () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // =================== HAPPY PATH ===================
  it("Happy Path: berhasil mengekstrak delivery history hash dari input valid", () => {
    const mockDecoded = {
      args: [
        "arg0",
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
      ],
    };

    // Mock Interface dengan parseTransaction
    jest.spyOn(ethers, "Interface" as any).mockImplementation(() => ({
      parseTransaction: jest.fn().mockReturnValue(mockDecoded),
    }));

    const result = extractDeliveryHistoryHashFromInput("0xdata");

    expect(result).toBe("abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890");
  });

  // =================== ALTERNATIVE PATH ===================
  it("Alternative Path: args[1] undefined → return null", () => {
    const mockDecoded = { args: ["onlyArg0"] };

    jest.spyOn(ethers, "Interface" as any).mockImplementation(() => ({
      parseTransaction: jest.fn().mockReturnValue(mockDecoded),
    }));

    const result = extractDeliveryHistoryHashFromInput("0xdata");

    expect(result).toBeNull();
  });

  it("Alternative Path: input null atau '0x' → return null", () => {
    expect(extractDeliveryHistoryHashFromInput(null)).toBeNull();
    expect(extractDeliveryHistoryHashFromInput("0x")).toBeNull();
  });

  // =================== ERROR PATH ===================
  it("Error Path: parseTransaction lempar error → return null", () => {
    jest.spyOn(ethers, "Interface" as any).mockImplementation(() => ({
      parseTransaction: jest.fn().mockImplementation(() => {
        throw new Error("Invalid transaction data");
      }),
    }));

    const result = extractDeliveryHistoryHashFromInput("0xinvalid");

    expect(result).toBeNull();
  });

});
