jest.mock('@/core/lib/generate-donation-hash')
jest.mock('@/modules/donation/utils/extract-donation-hash-from-input')

import { generateDonationHash } from '@/core/lib/generate-donation-hash'
import { extractDonationHashFromInput } from '@/modules/donation/utils/extract-donation-hash-from-input'

describe('donation-worker', () => {
  const postMessage = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(global as any).self = { postMessage }
  })

  it('postMessage(true) jika hash cocok', () => {
    ;(generateDonationHash as jest.Mock).mockReturnValue('hash123')
    ;(extractDonationHashFromInput as jest.Mock).mockReturnValue('hash123')

    require('@/modules/donation/utils/donation-worker')

    ;(self as any).onmessage({
      data: {
        donation: {
          campaign_id: 'cmp-1',
          amount: 10000,
        },
        blockchainInput: '0xinput',
      },
    })

    expect(postMessage).toHaveBeenCalledWith(true)
  })
})
