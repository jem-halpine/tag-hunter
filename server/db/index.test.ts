import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './connection.ts'
import * as db from './index.ts'

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
//getAllArtwork()
describe('db.getAllArtwork()', () => {
  it('gets all the artworks from the database', async () => {
    //ARRANGE
    //ACT
    const artworks = await db.getAllArtwork()
    //ASSERT
    expect(artworks).toHaveLength(24)
  })
})

//getArtworkById(id)

//getRandomArtwork()

//getPaginateArtworks()
