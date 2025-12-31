jest.mock('@/core/lib/generate-donation-hash')
jest.mock('@/modules/donation/utils/extract-donation-hash-from-input')

describe('donation-worker', () => {
  const postMessage = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(global as any).self = {
      postMessage,
    }
  })

  it('postMessage(true) jika hash cocok', () => {
    jest.isolateModules(() => {
      jest.doMock('@/core/lib/generate-donation-hash', () => ({
        generateDonationHash: jest.fn(() => 'hash123'),
      }))

      jest.doMock(
        '@/modules/donation/utils/extract-donation-hash-from-input',
        () => ({
          extractDonationHashFromInput: jest.fn(() => 'hash123'),
        })
      )

      require('@/modules/donation/utils/donation-worker')

      ;(self as any).onmessage({
        data: {
          donation: {
            user_id: 'u1',
            username: 'user',
            user_email: 'a@a.com',
            campaign_id: 'cmp-1',
            amount: 10000,
            currency: 'IDR',
            donation_message: null,
            xendit_reference_id: null,
          },
          blockchainInput: '0xinput',
        },
      })

      expect(postMessage).toHaveBeenCalledWith(true)
    })
  })

  it('postMessage(false) jika hash tidak cocok', () => {
    jest.isolateModules(() => {
      jest.doMock('@/core/lib/generate-donation-hash', () => ({
        generateDonationHash: jest.fn(() => 'hash123'),
      }))

      jest.doMock(
        '@/modules/donation/utils/extract-donation-hash-from-input',
        () => ({
          extractDonationHashFromInput: jest.fn(() => 'hash999'),
        })
      )

      require('@/modules/donation/utils/donation-worker')

      ;(self as any).onmessage({
        data: {
          donation: {
            user_id: 'u1',
            username: 'user',
            user_email: 'a@a.com',
            campaign_id: 'cmp-1',
            amount: 10000,
            currency: 'IDR',
            donation_message: null,
            xendit_reference_id: null,
          },
          blockchainInput: '0xinput',
        },
      })

      expect(postMessage).toHaveBeenCalledWith(false)
    })
  })
})
