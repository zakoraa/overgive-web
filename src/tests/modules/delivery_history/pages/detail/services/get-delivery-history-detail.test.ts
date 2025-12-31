
import { supabaseServer } from '@/core/lib/supabase/supabase-server'
import { getTxByHash } from '@/core/services/get-transactions-from-tx-hash'
import { getCampaignDeliveryHistoryById } from '@/modules/delivery_history/pages/detail/services/get-delivery-history-detail'

jest.mock('@/core/lib/supabase/supabase-server')
jest.mock('@/core/services/get-transactions-from-tx-hash')

describe('getCampaignDeliveryHistoryById', () => {
  const mockFrom = jest.fn()
  const mockSelect = jest.fn()
  const mockEq = jest.fn()
  const mockSingle = jest.fn()

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
      single: mockSingle,
    })
  })

  it('throw error jika data tidak ditemukan', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: { message: 'not found' },
    })

    await expect(
      getCampaignDeliveryHistoryById({
        campaign_delivery_history_id: 'cdh-1',
      })
    ).rejects.toThrow('Campaign delivery history tidak ditemukan')
  })

  it('return data tanpa blockchain_tx_hash', async () => {
    mockSingle.mockResolvedValue({
      data: {
        id: '1',
        campaign_id: 'cmp-1',
        title: 'Pengiriman',
        note: 'Catatan',
        delivery_hash: 'hash123',
        created_at: '2024-01-01',
        blockchain_tx_hash: null,
        created_by: {
          id: 'u1',
          name: 'User',
          email: 'user@email.com',
        },
      },
      error: null,
    })

    const result = await getCampaignDeliveryHistoryById({
      campaign_delivery_history_id: 'cdh-1',
    })

    expect(result.blockchain_input).toBeNull()
    expect(result.created_by.email).toContain('***')
  })

  it('return blockchain_input jika tx hash valid', async () => {
    ;(getTxByHash as jest.Mock).mockResolvedValue({
      input: '0xabc123',
    })

    mockSingle.mockResolvedValue({
      data: {
        id: '1',
        campaign_id: 'cmp-1',
        title: 'Pengiriman',
        note: 'Catatan',
        delivery_hash: 'hash123',
        created_at: '2024-01-01',
        blockchain_tx_hash: '0xtxhash',
        created_by: {
          id: 'u1',
          name: 'User',
          email: 'user@email.com',
        },
      },
      error: null,
    })

    const result = await getCampaignDeliveryHistoryById({
      campaign_delivery_history_id: 'cdh-1',
    })

    expect(getTxByHash).toHaveBeenCalledWith('0xtxhash')
    expect(result.blockchain_input).toBe('0xabc123')
  })

  it('tetap return data jika getTxByHash gagal', async () => {
    ;(getTxByHash as jest.Mock).mockRejectedValue(
      new Error('tx error')
    )

    mockSingle.mockResolvedValue({
      data: {
        id: '1',
        campaign_id: 'cmp-1',
        title: 'Pengiriman',
        note: 'Catatan',
        delivery_hash: 'hash123',
        created_at: '2024-01-01',
        blockchain_tx_hash: '0xtxhash',
        created_by: {
          id: 'u1',
          name: 'User',
          email: 'user@email.com',
        },
      },
      error: null,
    })

    const result = await getCampaignDeliveryHistoryById({
      campaign_delivery_history_id: 'cdh-1',
    })

    expect(result.blockchain_input).toBeNull()
  })
})
