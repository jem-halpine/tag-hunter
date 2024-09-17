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

// GET /
describe('GET /', () => {
  it('gets all the game data', async () => {
    const res = await request(server).get('/api/v1/games')

    expect(res.status).toBe(StatusCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)

    expect(res.body[0]).toHaveProperty('id')
    expect(res.body[0]).toHaveProperty('timestamp')
  })
  //FIX THIS!!!!!!!
  it.skip('returns status code 500 if there was an error', async () => {
    const res = await request(server).get('/api/v1/games')

    expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })
})

// GET /leaderboard
describe('GET /api/v1/leaderboard', () => {
  it('returns leaderboard data successfully', async () => {
    const res = await request(server).get('/api/v1/games/leaderboard')

    expect(res.status).toBe(StatusCodes.OK)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0]).toHaveProperty('name')
    expect(res.body[0]).toHaveProperty('guesses')
  })
  //FIX THIS!!!!
  it.skip('returns status code 500 if there is an error', async () => {})
})
