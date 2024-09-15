import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.ts'
import * as db from '../users.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('getAllUsers()', () => {
  it('returns all users in the database', async () => {
    const users = await db.getAllUsers()
    expect(users).toHaveLength(3)
  })
})

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

describe('addUser()', () => {
  it('adds a new user to the database', async () => {
    const newUser = {
      auth0id: 'Auth01010101',
      name: 'Jimbob',
      email: 'that@guy.com',
    }
    await db.addUser(newUser)
    const addedUser = await db.getUserById(newUser.auth0id)
    expect(addedUser).toEqual({
      auth0Id: 'Auth01010101',
      name: 'Jimbob',
      email: 'that@guy.com',
    })
  })
})
