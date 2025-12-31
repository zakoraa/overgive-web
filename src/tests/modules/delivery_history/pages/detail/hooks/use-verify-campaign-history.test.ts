/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react'
import { useVerifyCampaignDeliveryHistory } from
  '@/modules/delivery_history/pages/detail/hooks/use-verify-campaign-delivery-history'

// ⚠️ PATH HARUS IDENTIK DENGAN IMPORT DI HOOK ASLI
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

describe('useVerifyCampaignDeliveryHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('isValid = null jika history null', () => {
    const { result } = renderHook(() =>
      useVerifyCampaignDeliveryHistory(null)
    )

    expect(result.current.isValid).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('isValid = null jika blockchain_input tidak ada', () => {
    const history: any = {
      campaign_id: 'cmp-1',
      title: 'Update',
      note: 'Catatan',
      created_by: { id: 'user-1' },
      blockchain_input: null,
    }

    const { result } = renderHook(() =>
      useVerifyCampaignDeliveryHistory(history)
    )

    expect(result.current.isValid).toBeNull()
  })

  it('isValid = false jika blockchain hash tidak valid', () => {
    ;(generateCampaignDeliveryHash as jest.Mock).mockReturnValue('hash123')
    ;(extractDeliveryHistoryHashFromInput as jest.Mock).mockReturnValue(null)

    const history: any = {
      campaign_id: 'cmp-1',
      title: 'Update',
      note: 'Catatan',
      created_by: { id: 'user-1' },
      blockchain_input: '0xabc',
    }

    const { result } = renderHook(() =>
      useVerifyCampaignDeliveryHistory(history)
    )

    expect(result.current.isValid).toBe(false)
  })

  it('isValid = true jika hash cocok', () => {
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
      useVerifyCampaignDeliveryHistory(history)
    )

    expect(result.current.isValid).toBe(true)
  })

  it('isValid = false jika hash tidak cocok', () => {
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
      useVerifyCampaignDeliveryHistory(history)
    )

    expect(result.current.isValid).toBe(false)
  })
})
