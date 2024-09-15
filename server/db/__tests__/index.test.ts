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
describe('getRandomArtwork()', () => {
  it('gets an artwork from the database at random', async () => {
    const randomArtwork = await db.getRandomArtwork()
    const allArtworks = await db.getAllArtwork()

    expect(randomArtwork).toBeDefined()
    expect(randomArtwork).toHaveProperty('id')
    expect(randomArtwork).toHaveProperty('location')
    expect(randomArtwork).toHaveProperty('latitude')
    expect(randomArtwork).toHaveProperty('longitude')
    expect(randomArtwork).toHaveProperty('imageUrl')
    expect(randomArtwork).toHaveProperty('artist')

    expect(allArtworks).toContainEqual(randomArtwork)
  })
})

//TODO: getPaginateArtworks()
describe('getPaginateArtworks()', () => {
  it.skip('returns paginated artwork data based on the page number', async () => {
    const page = 1
    const { data, pagination } = await db.getPaginateArtworks(page)

    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeLessThanOrEqual(10)
  })
})
