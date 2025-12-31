import { POST } from '@/app/api/donation-settlement/create/route'
import { supabaseServer } from '@/core/lib/supabase/supabase-server'
import {
  convertGasFeeWeiToMatic,
  convertGasfeeToIDR,
} from '@/core/utils/convert-gas-fee-to-idr'
import { calculateQrisFee } from '@/core/utils/calculate-qris-xendit'

jest.mock('@/core/lib/supabase/supabase-server')
jest.mock('@/core/utils/convert-gas-fee-to-idr')
jest.mock('@/core/utils/calculate-qris-xendit')

describe('POST /api/donation-settlement/create', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  function mockRequest(body: any) {
    return {
      json: async () => body,
    } as any
  }

  it('return 400 jika donation_id kosong', async () => {
    const res = await POST(mockRequest({}))
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBeDefined()
  })

  it('return 404 jika donasi tidak ditemukan', async () => {
    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({
              data: null,
            }),
          }),
        }),
      }),
    })

    const res = await POST(mockRequest({ donation_id: 1 }))
    const json = await res.json()

    expect(res.status).toBe(404)
    expect(json.error).toBe('Donasi tidak ditemukan')
  })

  it('sukses tanpa blockchain tx', async () => {
    const donation = {
      id: 1,
      campaign_id: 2,
      amount: 100000,
      currency: 'IDR',
      blockchain_tx_hash: null,
      blockchain_gas_used: null,
      blockchain_gas_price: null,
    }

    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: (table: string) => {
        if (table === 'donations') {
          return {
            select: () => ({
              eq: () => ({
                single: async () => ({ data: donation }),
              }),
            }),
          }
        }

        return {
          insert: () => ({
            select: () => ({
              single: async () => ({
                data: {
                  id: 10,
                  donation_id: 1,
                  net_amount: 90000,
                },
                error: null,
              }),
            }),
          }),
        }
      },
    })

    ;(convertGasFeeWeiToMatic as jest.Mock).mockReturnValue(0)
    ;(convertGasfeeToIDR as jest.Mock).mockResolvedValue(0)
    ;(calculateQrisFee as jest.Mock).mockReturnValue(10000)

    const res = await POST(mockRequest({ donation_id: 1 }))
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.data.gas_fee_idr).toBe(0)
  })

  it('sukses dengan blockchain tx dan gas fee', async () => {
    const donation = {
      id: 1,
      campaign_id: 2,
      amount: 100000,
      currency: 'IDR',
      blockchain_tx_hash: '0xtx',
      blockchain_gas_used: '21000',
      blockchain_gas_price: '1000000000',
    }

    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: (table: string) => {
        if (table === 'donations') {
          return {
            select: () => ({
              eq: () => ({
                single: async () => ({ data: donation }),
              }),
            }),
          }
        }

        return {
          insert: () => ({
            select: () => ({
              single: async () => ({
                data: { id: 99 },
                error: null,
              }),
            }),
          }),
        }
      },
    })

    ;(convertGasFeeWeiToMatic as jest.Mock).mockReturnValue(0.001)
    ;(convertGasfeeToIDR as jest.Mock).mockResolvedValue(10000)
    ;(calculateQrisFee as jest.Mock).mockReturnValue(500)

    const res = await POST(mockRequest({ donation_id: 1 }))
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.data.gas_fee_matic).toBe(0.001)
    expect(json.data.xendit_fee).toBe(500)
  })

  it('return 500 jika gagal insert settlement', async () => {
    const donation = {
      id: 1,
      campaign_id: 2,
      amount: 100000,
    }

    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: (table: string) => {
        if (table === 'donations') {
          return {
            select: () => ({
              eq: () => ({
                single: async () => ({ data: donation }),
              }),
            }),
          }
        }

        return {
          insert: () => ({
            select: () => ({
              single: async () => ({
                data: null,
                error: { message: 'Insert error' },
              }),
            }),
          }),
        }
      },
    })

    ;(convertGasFeeWeiToMatic as jest.Mock).mockReturnValue(0)
    ;(convertGasfeeToIDR as jest.Mock).mockResolvedValue(0)
    ;(calculateQrisFee as jest.Mock).mockReturnValue(0)

    const res = await POST(mockRequest({ donation_id: 1 }))
    const json = await res.json()

    expect(res.status).toBe(500)
    expect(json.error).toBe('Insert error')
  })
})
