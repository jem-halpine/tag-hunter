import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from 'server/db/connection.ts'
import server from 'server/server'
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

//finish this ome
describe('GET /artworks/:id', () => {
  it.skip('should return the correct artwork', async () => {
    const res = await request(server).get('/api/v1/artworks/1')
    expect(res.status).toBe(200)
    expect(res.body).toStrictEqual({
      id: 1,
      location: '2 Mein Street, Newtown',
      latitude: -41.31092143587734,
      longitude: 174.77957489029637,
      artist: null,
      image_url: 'te-ao-maori-zoo.webp',
      description: 'art',
      user_id: '1',
    })
  })

  it.skip('should return a 500 error if it does not exist', async () => {
    const res = await request(server).get('/api/v1/artworks/11111111111')
    expect(res.status).toBe(500)
  })
})
