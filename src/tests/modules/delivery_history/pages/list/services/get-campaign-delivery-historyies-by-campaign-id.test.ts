

import { supabaseServer } from '@/core/lib/supabase/supabase-server'
import { getTxByHash } from '@/core/services/get-transactions-from-tx-hash'
import { getCampaignDeliveryHistories } from '@/modules/delivery_history/pages/list/services/get-campaign-delivery-histories-by-campaign-id'

jest.mock('@/core/lib/supabase/supabase-server')
jest.mock('@/core/services/get-transactions-from-tx-hash')

describe('getCampaignDeliveryHistories', () => {
  const mockFrom = jest.fn()
  const mockSelect = jest.fn()
  const mockEq = jest.fn()
  const mockOrder = jest.fn()
  const mockIlike = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: mockFrom,
    })

    mockFrom.mockReturnValue({
      select: mockSelect,
    })

    mockSelect.mockReturnValue({
      eq: mockEq,
    })

    mockEq.mockReturnValue({
      order: mockOrder,
    })

    mockOrder.mockReturnValue({
      ilike: mockIlike,
    })
  })

  it('return [] jika data kosong', async () => {
    mockOrder.mockResolvedValue({
      data: [],
      error: null,
    })

    const result = await getCampaignDeliveryHistories({
      campaign_id: 'cmp-1',
    })

    expect(result).toEqual([])
  })

  it('throw error jika supabase error', async () => {
    mockOrder.mockResolvedValue({
      data: null,
      error: { message: 'DB error' },
    })

    await expect(
      getCampaignDeliveryHistories({ campaign_id: 'cmp-1' })
    ).rejects.toThrow('DB error')
  })

  it('return data tanpa blockchain_tx_hash', async () => {
    mockOrder.mockResolvedValue({
      data: [
        {
          id: '1',
          title: 'Pengiriman 1',
          note: 'Catatan',
          campaign_id: 'cmp-1',
          created_at: '2024-01-01',
          blockchain_tx_hash: null,
          created_by: {
            id: 'u1',
            name: 'User',
            email: 'user@email.com',
          },
        },
      ],
      error: null,
    })

    const result = await getCampaignDeliveryHistories({
      campaign_id: 'cmp-1',
    })

    expect(result).toHaveLength(1)
    expect(result[0].blockchain_input).toBeNull()
    expect(result[0].created_by.email).toContain('***')
  })

  it('return blockchain_input jika tx hash valid', async () => {
    ;(getTxByHash as jest.Mock).mockResolvedValue({
      input: '0xabc123',
    })

    mockOrder.mockResolvedValue({
      data: [
        {
          id: '1',
          title: 'Pengiriman 1',
          note: 'Catatan',
          campaign_id: 'cmp-1',
          created_at: '2024-01-01',
          blockchain_tx_hash: '0xtxhash',
          created_by: {
            id: 'u1',
            name: 'User',
            email: 'user@email.com',
          },
        },
      ],
      error: null,
    })

    const result = await getCampaignDeliveryHistories({
      campaign_id: 'cmp-1',
    })

    expect(getTxByHash).toHaveBeenCalledWith('0xtxhash')
    expect(result[0].blockchain_input).toBe('0xabc123')
  })

  it('tetap return data jika getTxByHash error', async () => {
    ;(getTxByHash as jest.Mock).mockRejectedValue(
      new Error('tx not found')
    )

    mockOrder.mockResolvedValue({
      data: [
        {
          id: '1',
          title: 'Pengiriman 1',
          note: 'Catatan',
          campaign_id: 'cmp-1',
          created_at: '2024-01-01',
          blockchain_tx_hash: '0xtxhash',
          created_by: {
            id: 'u1',
            name: 'User',
            email: 'user@email.com',
          },
        },
      ],
      error: null,
    })

    const result = await getCampaignDeliveryHistories({
      campaign_id: 'cmp-1',
    })

    expect(result[0].blockchain_input).toBeNull()
  })

  it('menggunakan ilike jika search diisi', async () => {
    mockIlike.mockResolvedValue({
      data: [],
      error: null,
    })

    await getCampaignDeliveryHistories({
      campaign_id: 'cmp-1',
      search: 'bantuan',
    })

    expect(mockIlike).toHaveBeenCalledWith(
      'title',
      '%bantuan%'
    )
  })
})
