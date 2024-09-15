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
    expect(users).toHaveLength(1)
  })
})

//getUserById()

//addUser()
