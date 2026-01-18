/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react'
import { useVerifyDonationDetail } from '@/modules/donation/hooks/use-verify-donation-detail'
import { generateDonationHash } from '@/core/lib/generate-donation-hash'
import { extractDonationHashFromInput } from '@/modules/donation/utils/extract-donation-hash-from-input'

jest.mock('@/core/lib/generate-donation-hash')
jest.mock('@/modules/donation/utils/extract-donation-hash-from-input')
// ================= SKRIPSI =================

describe('Unit Test useVerifyDonationDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // =================== ALTERNATIVE PATH ===================
  it('Alternative Path: donation null → isValid = null, loading = false', () => {
    const { result } = renderHook(() => useVerifyDonationDetail(null))

    expect(result.current.isValid).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  // =================== ERROR PATH ===================
  it('Error Path: blockchain data tidak ada → isValid = false', async () => {
    ;(generateDonationHash as jest.Mock).mockReturnValue('hash123')

    const donation: any = {
      user_id: 'u1',
      username: 'user',
      user_email: 'a@a.com',
      campaign_id: 'cmp-1',
      amount: 10000,
      currency: 'IDR',
      donation_message: null,
      xendit_reference_id: null,
      blockchain_tx_hash: '0xabc',
      blockchain: null,
    }

    const { result } = renderHook(() => useVerifyDonationDetail(donation))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.isValid).toBe(false)
  })

  // =================== HAPPY PATH ===================
  it('Happy Path: hash cocok → isValid = true', async () => {
    ;(generateDonationHash as jest.Mock).mockReturnValue('hash123')
    ;(extractDonationHashFromInput as jest.Mock).mockReturnValue('hash123')

    const donation: any = {
      user_id: 'u1',
      username: 'user',
      user_email: 'a@a.com',
      campaign_id: 'cmp-1',
      amount: 10000,
      currency: 'IDR',
      donation_message: null,
      xendit_reference_id: null,
      blockchain_tx_hash: '0xabc',
      blockchain: {
        input: '0xinput',
      },
    }

    const { result } = renderHook(() => useVerifyDonationDetail(donation))

    await waitFor(() => {
      expect(result.current.isValid).toBe(true)
    })

    expect(result.current.loading).toBe(false)
  })

  // =================== ERROR PATH ===================
  it('Error Path: hash tidak cocok → isValid = false', async () => {
    ;(generateDonationHash as jest.Mock).mockReturnValue('hash123')
    ;(extractDonationHashFromInput as jest.Mock).mockReturnValue('hash999')

    const donation: any = {
      user_id: 'u1',
      username: 'user',
      user_email: 'a@a.com',
      campaign_id: 'cmp-1',
      amount: 10000,
      currency: 'IDR',
      donation_message: null,
      xendit_reference_id: null,
      blockchain_tx_hash: '0xabc',
      blockchain: {
        input: '0xinput',
      },
    }

    const { result } = renderHook(() => useVerifyDonationDetail(donation))

    await waitFor(() => {
      expect(result.current.isValid).toBe(false)
    })

    expect(result.current.loading).toBe(false)
  })
})
