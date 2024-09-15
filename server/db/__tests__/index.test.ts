import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.ts'
import * as db from '../index.ts'

//TESTING SET UP
beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

//TESTS
describe('getAllArtwork()', () => {
  it('gets all the artworks from the database', async () => {
    const artworks = await db.getAllArtwork()

    expect(artworks).toHaveLength(24)
  })
})

describe('getArtworkById(id)', () => {
  it('uses an id parameter to get a specific artwork', async () => {
    const testId = 1

    const artwork = await db.getArtworkById(testId)

    expect(artwork).toEqual({
      id: 1,
      location: '2 Mein Street, Newtown',
      latitude: -41.31092143587734,
      longitude: 174.77957489029637,
      artist: null,
      imageUrl: 'te-ao-maori-zoo.webp',
    })
  })

  it('returns undefined if no id matches the artwork database', async () => {
    const fakeId = 9999

    const artwork = await db.getArtworkById(fakeId)

    expect(artwork).toBeUndefined()
  })
})

//getRandomArtwork()

//getPaginateArtworks()
