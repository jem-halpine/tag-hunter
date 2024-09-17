import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'

import connection from '../../db/connection.ts'
import server from '../../server.ts'
import request from 'supertest'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

// GET /:id
describe('GET /api/v1/artworks/:id', () => {
  it('returns an artwork with the specified id', async () => {
    const id = 1
    const expectedArtwork = {
      id: 1,
      location: '2 Mein Street, Newtown',
      latitude: -41.31092143587734,
      longitude: 174.77957489029637,
      artist: null,
      imageUrl: 'te-ao-maori-zoo.webp',
    }

    const res = await request(server).get(`/api/v1/artworks/${id}`)

    expect(res.status).toBe(200)
    expect(res.body).toEqual(expectedArtwork)
  })

  it('returns a 404 error if no artwork can be found', async () => {
    const fakeId = 111111111
    const res = await request(server).get(`/api/v1/artworks/${fakeId}`)
    expect(res.status).toBe(StatusCodes.NOT_FOUND)
  })
})
