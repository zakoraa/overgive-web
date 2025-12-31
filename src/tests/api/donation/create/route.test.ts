import { POST } from '@/app/api/donation/create/route'
import { generateDonationHash } from '@/core/lib/generate-donation-hash'
import { saveDonationToBlockchain } from '@/modules/donation/services/save-donation-to-blockchain'
import { supabaseServer } from '@/core/lib/supabase/supabase-server'

jest.mock('@/core/lib/generate-donation-hash')
jest.mock('@/modules/donation/services/save-donation-to-blockchain')
jest.mock('@/core/lib/supabase/supabase-server')

describe('POST /api/donation/create', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

   // =============================
   //   VALIDASI INPUT
   // =============================
  it('return 400 jika campaign_id kosong atau amount <= 0', async () => {
    const req = new Request('http://localhost/api/donation/create', {
      method: 'POST',
      body: JSON.stringify({
        campaign_id: '',
        amount: 0,
      }),
    })

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBeDefined()
  })

   // =============================
   //  SUCCESS FLOW
   // =============================
  it('berhasil simpan donation, kirim ke blockchain dan supabase', async () => {
    const body = {
      campaign_id: 'cmp-1',
      amount: 10000,
      user_id: 'user-1',
    }

    // mock donation hash
    ;(generateDonationHash as jest.Mock).mockReturnValue('mock-hash')

    // mock blockchain
    ;(saveDonationToBlockchain as jest.Mock).mockResolvedValue({
      txHash: '0xabc',
      blockNumber: 123,
      gasUsed: '21000',
      gasPrice: '100',
    })

    // mock supabase
    const insertMock = jest.fn().mockReturnValue({
      select: () => ({
        single: async () => ({
          data: {
            id: 1,
            campaign_id: 'cmp-1',
            amount: 10000,
          },
          error: null,
        }),
      }),
    })

    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: () => ({
        insert: insertMock,
      }),
    })

    const req = new Request('http://localhost/api/donation/create', {
      method: 'POST',
      body: JSON.stringify(body),
    })

    const res = await POST(req)
    const json = await res.json()

    // response
    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.blockchain_tx_hash).toBe('0xabc')

    // assertions logic
    expect(generateDonationHash).toHaveBeenCalledWith(body)

    expect(saveDonationToBlockchain).toHaveBeenCalledWith(
      'unknown',
      'cmp-1',
      'unknown',
      10000,
      'IDR',
      'mock-hash',
      expect.any(Number)
    )

    expect(insertMock).toHaveBeenCalled()
  })

   // =============================
   //  SUPABASE ERROR
   // =============================
  it('return 500 jika supabase insert error', async () => {
    ;(generateDonationHash as jest.Mock).mockReturnValue('mock-hash')

    ;(saveDonationToBlockchain as jest.Mock).mockResolvedValue({
      txHash: '0xabc',
      blockNumber: 1,
      gasUsed: '21000',
      gasPrice: '100',
    })

    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: () => ({
        insert: () => ({
          select: () => ({
            single: async () => ({
              data: null,
              error: { message: 'DB error' },
            }),
          }),
        }),
      }),
    })

    const req = new Request('http://localhost/api/donation/create', {
      method: 'POST',
      body: JSON.stringify({
        campaign_id: 'cmp-1',
        amount: 10000,
      }),
    })

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(500)
    expect(json.error).toBe('DB error')
  })

   // =============================
   // BLOCKCHAIN ERROR
   // =============================
  it('return 500 jika blockchain throw error', async () => {
    ;(generateDonationHash as jest.Mock).mockReturnValue('mock-hash')

    ;(saveDonationToBlockchain as jest.Mock).mockRejectedValue(
      new Error('Blockchain failed')
    )

    const req = new Request('http://localhost/api/donation/create', {
      method: 'POST',
      body: JSON.stringify({
        campaign_id: 'cmp-1',
        amount: 10000,
      }),
    })

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(500)
    expect(json.error).toBe('Blockchain failed')
  })
})
