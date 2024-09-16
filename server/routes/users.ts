import express from 'express'
// import { UserData } from 'models/models'
import { JwtRequest } from 'server/auth0'
import checkJwt from 'server/auth0'

import * as db from '../db/index'

const router = express.Router()

//GET /api/v1/users
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0id = String(req.auth?.sub)
  try {
    const user = await db.getUserById(auth0id)
    res.json({ user })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

//POST /api/v1/users
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    await db.addUser({auth0id: "J", name: "JW", email: "J@J" })
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router
