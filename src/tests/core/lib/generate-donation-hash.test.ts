import { generateDonationHash } from "@/core/lib/generate-donation-hash";

// ============= SKRIPSI ================

describe("Unit Test generateDonationHash", () => {

  // =================== HAPPY PATH ===================
  it("Happy Path: berhasil menghasilkan hash dari data donasi lengkap", () => {
    const data = {
      user_id: "1",
      username: "andi",
      user_email: "andi@mail.com",
      campaign_id: "campaign_1",
      amount: 10000,
      currency: "IDR",
      donation_message: "semoga bermanfaat",
      xendit_reference_id: "ref_123",
    };

    const hash = generateDonationHash(data);

    expect(hash).toBeDefined();
    expect(typeof hash).toBe("string");
    expect(hash.length).toBe(64); // SHA-256
  });

  // =================== ALTERNATIVE PATH ===================
  it("Alternative Path: tetap menghasilkan hash meskipun beberapa field opsional kosong", () => {
    const data = {
      campaign_id: "campaign_1",
      amount: 10000,
      // field opsional tidak diisi
    };

    const hash = generateDonationHash(data);

    expect(hash).toBeDefined();
    expect(hash.length).toBe(64);
  });

  // =================== ERROR PATH ===================
  it("Error Path: lempar error jika input bukan objek", () => {
    // @ts-ignore
    expect(() => generateDonationHash(null)).toThrow();
    // @ts-ignore
    expect(() => generateDonationHash(undefined)).toThrow();
    // @ts-ignore
    expect(() => generateDonationHash("string")).toThrow();
  });

});
