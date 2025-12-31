/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react'
import { useVerifyCampaignDeliveryHistoryList } from
  '@/modules/delivery_history/pages/list/hooks/use-verify-campaign-delivery-history-list'

jest.mock(
  '@/modules/delivery_history/pages/detail/services/get-campaign-delivery-hash'
)

jest.mock(
  '@/modules/delivery_history/pages/detail/utils/extract-delivery-history-hash-from-input'
)

import { generateCampaignDeliveryHash } from
  '@/modules/delivery_history/pages/detail/services/get-campaign-delivery-hash'

import { extractDeliveryHistoryHashFromInput } from
  '@/modules/delivery_history/pages/detail/utils/extract-delivery-history-hash-from-input'

describe('useVerifyCampaignDeliveryHistoryList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('isValid = null jika history null', () => {
    const { result } = renderHook(() =>
      useVerifyCampaignDeliveryHistoryList(null)
    )

    expect(result.current.isValid).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('isValid = null jika blockchain_input kosong', async () => {
    const history: any = {
      campaign_id: 'cmp-1',
      title: 'Update',
      note: 'Catatan',
      created_by: { id: 'user-1' },
      blockchain_input: null,
    }

    const { result } = renderHook(() =>
      useVerifyCampaignDeliveryHistoryList(history)
    )

    await waitFor(() => {
      expect(result.current.isValid).toBeNull()
    })
  })

  it('isValid = true jika hash cocok', async () => {
    ;(generateCampaignDeliveryHash as jest.Mock).mockReturnValue('hash123')
    ;(extractDeliveryHistoryHashFromInput as jest.Mock).mockReturnValue('hash123')

    const history: any = {
      campaign_id: 'cmp-1',
      title: 'Update',
      note: 'Catatan',
      created_by: { id: 'user-1' },
      blockchain_input: '0xabc',
    }

    const { result } = renderHook(() =>
      useVerifyCampaignDeliveryHistoryList(history)
    )

    await waitFor(() => {
      expect(result.current.isValid).toBe(true)
      expect(result.current.loading).toBe(false)
    })
  })

  it('isValid = false jika hash tidak cocok', async () => {
    ;(generateCampaignDeliveryHash as jest.Mock).mockReturnValue('hash123')
    ;(extractDeliveryHistoryHashFromInput as jest.Mock).mockReturnValue('hash999')

    const history: any = {
      campaign_id: 'cmp-1',
      title: 'Update',
      note: 'Catatan',
      created_by: { id: 'user-1' },
      blockchain_input: '0xabc',
    }

    const { result } = renderHook(() =>
      useVerifyCampaignDeliveryHistoryList(history)
    )

    await waitFor(() => {
      expect(result.current.isValid).toBe(false)
      expect(result.current.loading).toBe(false)
    })
  })
})
