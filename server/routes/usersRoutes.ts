import express from 'express'
import { JwtRequest } from 'server/auth0'
import checkJwt from 'server/auth0'

import * as db from '../db/users'

const router = express.Router()

//Get /api/v1/users
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

//GET /api/v1/users/:id
router.get('/id', checkJwt, async (req: JwtRequest, res) => {
  const id = req.auth?.sub
  try {
    const user = await db.getUserById(id as string)
    res.json({ user })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

//POST /api/v1/users
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const newUser = req.body
    const auth0id = req.auth?.sub
    const [users] = await db.addUser({
      ...newUser,
      auth0id,
    })
    res.json(users)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

//GET /api/v1/profile
router.get('/profile', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
//  const auth0Id = 'Auth0999'
  try {
    const profile = await db.getLeaderBoardByUser(auth0Id as string)
    res.json({profile})
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// router.get('/profile', async (req, res) => {
//   // const auth0Id = req.auth?.sub
//  const user_id = 'google-oauth2|112374505010152495623'
//   try {
//     const profile = await db.getLeaderBoardByUser(user_id)
//     res.json({profile})
//   } catch (error) {
//     console.error(error)
//     res.sendStatus(500)
//   }
// })

export default router
