import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.ts'
import * as db from '../index.ts'

import '../../server.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

//getArtworkById(id)
describe('getArtworkById(id)', () => {
  it('uses an id parameter to get a specific artwork', async () => {
    const testId = 17

    const artwork = await db.getArtworkById(testId)

    expect(artwork).toEqual({
      id: 17,
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

//getAllArtwork()
describe('getAllArtwork()', () => {
  it('gets all the artworks from the database', async () => {
    const artworks = await db.getAllArtwork()

    expect(artworks).toHaveLength(24)
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

//getGames()
describe('getGames()', () => {
  it('returns a list of games', async () => {
    const games = await db.getGames()

    expect(Array.isArray(games)).toBe(true)
    expect(games.length).toBeGreaterThan(0)
    games.forEach((game) => {
      expect(game).toHaveProperty('id')
      expect(game).toHaveProperty('timestamp')
      expect(game).toHaveProperty('artworkId')
      expect(game).toHaveProperty('username')
      expect(game).toHaveProperty('artWasFound')
      expect(game).toHaveProperty('guessesUsed')
    })
  })
})

//getLeaderboard()
describe('getLeaderBoard()', () => {
  it('returns a leaderboard using the user stats', async () => {
    const leaderboard = await db.getLeaderBoard()

    expect(leaderboard.length).toBeGreaterThan(0)

    leaderboard.forEach((entry) => {
      expect(entry).toHaveProperty('name')
      expect(entry).toHaveProperty('games')
      expect(entry).toHaveProperty('wins')
      expect(entry).toHaveProperty('guesses')
    })
  })
})

//addGame()
describe('addGame()', () => {
  it('adds a game to the games database', async () => {
    const fakeGame = {
      auth0Id: 'auth0|user123',
      artworkId: 1,
      artWasFound: true,
      guessesUsed: 3,
      rating: 5,
    }

    await db.addGame(fakeGame)

    const addedGame = await connection('games')
      .where('user_id', fakeGame.auth0Id)
      .andWhere('artwork_id', fakeGame.artworkId)
      .first()

    expect(addedGame).toBeDefined()
    expect(addedGame.user_id).toBe(fakeGame.auth0Id)
    expect(addedGame.artwork_id).toBe(fakeGame.artworkId)
    expect(addedGame.art_was_found).toBe(fakeGame.artWasFound ? 1 : 0)
    expect(addedGame.guesses_used).toBe(fakeGame.guessesUsed)
    expect(addedGame.rating).toBe(fakeGame.rating)
  })
})

// TODO: getPaginateArtworks()
describe('getPaginateArtworks()', () => {
  it('returns paginated artwork data based on the page number', async () => {
    const page = 1
    const paginatedArtworks = await db.getPaginateArtworks(page)

    expect(paginatedArtworks).toBeDefined()
    expect(paginatedArtworks.data).toHaveLength(10)

    const artwork = paginatedArtworks.data[0]
    expect(artwork).toHaveProperty('id')
    expect(artwork).toHaveProperty('location')
    expect(artwork).toHaveProperty('latitude')
    expect(artwork).toHaveProperty('longitude')
    expect(artwork).toHaveProperty('imageUrl')
    expect(artwork).toHaveProperty('artist')
    expect(artwork).toHaveProperty('description')
    expect(artwork).toHaveProperty('userId')

    expect(paginatedArtworks.pagination).toHaveProperty('total')
    expect(paginatedArtworks.pagination).toHaveProperty('perPage', 10)
    expect(paginatedArtworks.pagination).toHaveProperty('currentPage', page)
  })
})

//getUserById(auth0id)
describe('getUserById()', () => {
  it('returns user with the matching id', async () => {
    const testId = 'Auth0999'
    const user = await db.getUserById(testId)
    expect(user).toEqual({
      auth0Id: 'Auth0999',
      name: 'Ronald McDonald-San',
      email: 'coolest.guy@ever.com',
    })
  })

  it('returns undefined if user cannot be found', async () => {
    const fakeId = '69420'
    const user = await db.getUserById(fakeId)
    expect(user).toBeUndefined()
  })
})

//addUser(user)
describe('addUser()', () => {
  it('adds a new user to the database', async () => {
    const newUser = {
      auth0Id: 'Auth01010101',
      name: 'Jimbob',
      email: 'that@guy.com',
    }
    await db.addUser(newUser)
    const addedUser = await db.getUserById(newUser.auth0Id)
    expect(addedUser).toEqual({
      auth0Id: 'Auth01010101',
      name: 'Jimbob',
      email: 'that@guy.com',
    })
  })
})

//getUserProfile(user_id)
describe('getUserProfile(user_id)', () => {
  it('gets user profile data using the provided user id', async () => {
    const testId = 'Auth0999'

    const userProfile = await db.getUserProfile(testId)

    expect(userProfile).toEqual({
      name: 'Ronald McDonald-San',
      email: 'coolest.guy@ever.com',
      games: 4,
      wins: 1,
      guesses: 18,
      unlockedArt: [
        {
          id: 4,
          imageUrl: 'bird-trinity.webp',
        },
      ],
    })
  })

  it('returns undefined when the user cannot be found', async () => {
    const fakeId = 'thebirdsarenotreal'

    const userProfile = await db.getUserProfile(fakeId)

    expect(userProfile).toEqual({
      name: null,
      email: null,
      games: 0,
      wins: null,
      guesses: null,
      unlockedArt: [],
    })
  })
})

//newArtwork(data)
describe('newArtwork(data)', () => {
  it('adds a new artwork to the database', async () => {
    const data = {
      latitude: 100,
      longitude: 100,
      artist: 'Your mum',
      image_url: 'your-mum.webp',
      location: 'your house',
    }
    await db.newArtwork(data)

    const addedArtwork = await connection('artworks')
      .where({ location: 'your house' })
      .first()

    expect(addedArtwork).toMatchObject({
      latitude: 100,
      longitude: 100,
      artist: 'Your mum',
      image_url: 'your-mum.webp',
      location: 'your house',
    })
  })
})
