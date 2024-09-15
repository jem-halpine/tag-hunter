import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.ts'
import * as db from '../users.ts'

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
//getAllUsers()
describe('getAllUsers()', () => {
  it('returns all users in the database', async () => {
    //ARRANGE
    //ACT
    const users = await db.getAllUsers()
    //ASSERT
    expect(users).toHaveLength(3)
  })
})

//getUserById()
describe('getUserById()', () => {
  it('returns user with the matching id', async () => {
    //ARRANGE
    const testId = 'Auth0999'
    //ACT
    const user = await db.getUserById(testId)
    //ASSERT
    expect(user).toEqual({
      auth0Id: 'Auth0999',
      name: 'Ronald McDonald-San',
      email: 'coolest.guy@ever.com',
    })
  })

  it('returns undefined if user cannot be found', async () => {
    //ARRANGE
    const fakeId = '69420'
    //ACT
    const user = await db.getUserById(fakeId)
    //ASSERT
    expect(user).toBeUndefined()
  })
})

//addUser()
describe('addUser()', () => {
  it('adds a new user to the database', async () => {
    //ARRANGE
    const newUser = {
      auth0id: 'Auth01010101',
      name: 'Jimbob',
      email: 'that@guy.com',
    }
    //ACT
    await db.addUser(newUser)
    //ASSERT
    const addedUser = await db.getUserById(newUser.auth0id)
    expect(addedUser).toEqual({
      auth0Id: 'Auth01010101',
      name: 'Jimbob',
      email: 'that@guy.com',
    })
  })
})
