/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react'
import { useVerifyDonationDetail } from '@/modules/donation/hooks/use-verify-donation-detail'
import { generateDonationHash } from '@/core/lib/generate-donation-hash'
import { extractDonationHashFromInput } from '@/modules/donation/utils/extract-donation-hash-from-input'

jest.mock('@/core/lib/generate-donation-hash')
jest.mock('@/modules/donation/utils/extract-donation-hash-from-input')

describe('useVerifyDonationDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('isValid = null jika donation null', () => {
    const { result } = renderHook(() =>
      useVerifyDonationDetail(null)
    )

    expect(result.current.isValid).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('isValid = false jika blockchain data tidak ada', async () => {
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

    const { result } = renderHook(() =>
      useVerifyDonationDetail(donation)
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.isValid).toBe(false)
  })

  it('isValid = true jika hash cocok', async () => {
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

    const { result } = renderHook(() =>
      useVerifyDonationDetail(donation)
    )

    await waitFor(() => {
      expect(result.current.isValid).toBe(true)
    })

    expect(result.current.loading).toBe(false)
  })

  it('isValid = false jika hash tidak cocok', async () => {
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

    const { result } = renderHook(() =>
      useVerifyDonationDetail(donation)
    )

    await waitFor(() => {
      expect(result.current.isValid).toBe(false)
    })

    expect(result.current.loading).toBe(false)
  })
})
