import { GET } from '@/app/api/donation/[id]/route'
import { supabaseServer } from '@/core/lib/supabase/supabase-server'
import { getTxByHash } from '@/core/services/get-transactions-from-tx-hash'

jest.mock('@/core/lib/supabase/supabase-server')
jest.mock('@/core/services/get-transactions-from-tx-hash')

describe('GET /api/donation/[id]', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  function createParams(id?: string) {
    return Promise.resolve({ id: id as any })
  }

  it('return 400 jika id kosong', async () => {
    const res = await GET({} as any, { params: createParams('') })
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
              error: { code: 'PGRST116' },
            }),
          }),
        }),
      }),
    })

    const res = await GET({} as any, { params: createParams('1') })
    const json = await res.json()

    expect(res.status).toBe(404)
    expect(json.error).toBe('Donasi tidak ditemukan')
  })

  it('return 500 jika supabase error lain', async () => {
    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({
              data: null,
              error: { message: 'DB error' },
            }),
          }),
        }),
      }),
    })

    const res = await GET({} as any, { params: createParams('1') })
    const json = await res.json()

    expect(res.status).toBe(500)
    expect(json.error).toBe('DB error')
  })

  it('berhasil return donasi tanpa blockchain', async () => {
    const donation = {
      id: 1,
      amount: 10000,
      blockchain_tx_hash: null,
    }

    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({
              data: donation,
              error: null,
            }),
          }),
        }),
      }),
    })

    const res = await GET({} as any, { params: createParams('1') })
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.data.blockchain).toBeNull()
  })

  it('berhasil return donasi dengan blockchain', async () => {
    const donation = {
      id: 1,
      amount: 10000,
      blockchain_tx_hash: '0xtxhash',
    }

    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({
              data: donation,
              error: null,
            }),
          }),
        }),
      }),
    })

    ;(getTxByHash as jest.Mock).mockResolvedValue({
      hash: '0xtxhash',
      from: '0xfrom',
    })

    const res = await GET({} as any, { params: createParams('1') })
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.data.blockchain.hash).toBe('0xtxhash')
    expect(getTxByHash).toHaveBeenCalledWith('0xtxhash')
  })

  it('blockchain error tidak menggagalkan response', async () => {
    const donation = {
      id: 1,
      amount: 10000,
      blockchain_tx_hash: '0xtxhash',
    }

    ;(supabaseServer as jest.Mock).mockResolvedValue({
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({
              data: donation,
              error: null,
            }),
          }),
        }),
      }),
    })

    ;(getTxByHash as jest.Mock).mockRejectedValue(
      new Error('Blockchain error')
    )

    const res = await GET({} as any, { params: createParams('1') })
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.data.blockchain).toBeNull()
  })
})
