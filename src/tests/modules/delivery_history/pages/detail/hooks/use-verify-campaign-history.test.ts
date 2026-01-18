/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react'
import { useVerifyCampaignDeliveryHistory } from
  '@/modules/delivery_history/pages/detail/hooks/use-verify-campaign-delivery-history'

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

// ================= SKRIPSI =================

describe('Unit Test useVerifyCampaignDeliveryHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // ================= TERPAKAI =================
  // =================== ALTERNATIVE PATH ===================
  it('Alternative Path: history null → isValid = null, loading = false', () => {
    const { result } = renderHook(() =>
      useVerifyCampaignDeliveryHistory(null)
    )

    expect(result.current.isValid).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('Alternative Path: blockchain_input tidak ada → isValid = null', () => {
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

  // =================== ERROR PATH ===================
  it('Error Path: hash tidak valid → isValid = false', () => {
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

  it('Error Path: hash tidak cocok → isValid = false', () => {
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

  // =================== HAPPY PATH ===================
  it('Happy Path: hash cocok → isValid = true', () => {
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
})
