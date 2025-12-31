
import { supabaseServer } from '@/core/lib/supabase/supabase-server'
import { getDonationSettlementSummaryByCampaign } from '@/modules/donation-settlement/services/get-donation-settlement-summary-by-campaign'

jest.mock('@/core/lib/supabase/supabase-server')

describe('getDonationSettlementSummaryByCampaign', () => {
  const mockFrom = jest.fn()
  const mockSelect = jest.fn()
  const mockEq = jest.fn()
  const mockIs = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: mockFrom,
    })
  })

  it('throw error jika settlement kosong', async () => {
    mockFrom.mockReturnValueOnce({
      select: () => ({
        eq: () => ({
          data: [],
          error: null,
        }),
      }),
    })

    await expect(
      getDonationSettlementSummaryByCampaign('cmp-1')
    ).rejects.toThrow('No settlements found')
  })

  it('berhasil menghitung summary tanpa operational cost', async () => {
    mockFrom
      // donation_settlements
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            data: [
              {
                gross_amount: 100000,
                gas_fee: 1000,
                xendit_fee: 2000,
                total_fee: 3000,
                net_amount: 97000,
                currency: 'IDR',
                updated_at: '2024-01-01T10:00:00Z',
                campaigns: { title: 'Campaign A' },
              },
            ],
            error: null,
          }),
        }),
      })
      // campaign_operational_costs
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            is: () => ({
              data: [],
              error: null,
            }),
          }),
        }),
      })

    const result = await getDonationSettlementSummaryByCampaign('cmp-1')

    expect(result.campaign_title).toBe('Campaign A')
    expect(result.total_gross).toBe(100000)
    expect(result.total_net).toBe(97000)
    expect(result.total_operational).toBe(0)
    expect(result.final_net).toBe(97000)
    expect(result.currency).toBe('IDR')
  })

  it('berhasil menghitung summary dengan operational cost', async () => {
    mockFrom
      // donation_settlements
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            data: [
              {
                gross_amount: 200000,
                gas_fee: 2000,
                xendit_fee: 3000,
                total_fee: 5000,
                net_amount: 195000,
                currency: 'IDR',
                updated_at: '2024-01-02T10:00:00Z',
                campaigns: { title: 'Campaign B' },
              },
            ],
            error: null,
          }),
        }),
      })
      // campaign_operational_costs
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            is: () => ({
              data: [
                { id: '1', amount: 10000, note: 'Transport' },
                { id: '2', amount: 5000, note: 'Logistik' },
              ],
              error: null,
            }),
          }),
        }),
      })

    const result = await getDonationSettlementSummaryByCampaign('cmp-2')

    expect(result.total_operational).toBe(15000)
    expect(result.final_net).toBe(180000)
    expect(result.operational_fees.length).toBe(2)
  })

  it('mengambil updated_at terbaru dari settlements', async () => {
    mockFrom
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            data: [
              {
                gross_amount: 100000,
                gas_fee: 1000,
                xendit_fee: 1000,
                total_fee: 2000,
                net_amount: 98000,
                currency: 'IDR',
                updated_at: '2024-01-01T10:00:00Z',
                campaigns: { title: 'Campaign C' },
              },
              {
                gross_amount: 50000,
                gas_fee: 500,
                xendit_fee: 500,
                total_fee: 1000,
                net_amount: 49000,
                currency: 'IDR',
                updated_at: '2024-01-03T10:00:00Z',
                campaigns: { title: 'Campaign C' },
              },
            ],
            error: null,
          }),
        }),
      })
      .mockReturnValueOnce({
        select: () => ({
          eq: () => ({
            is: () => ({
              data: [],
              error: null,
            }),
          }),
        }),
      })

    const result = await getDonationSettlementSummaryByCampaign('cmp-3')

    expect(result.updated_at).toBe('2024-01-03T10:00:00.000Z')
  })
})
