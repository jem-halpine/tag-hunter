import express from 'express'
// import { UserData } from 'models/models'
import { JwtRequest } from 'server/auth0'
import checkJwt from 'server/auth0'

import * as db from '../db/index'
import { UserData } from 'models/models'

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
// router.post('/', checkJwt, async (req: JwtRequest, res) => {
router.post('/', async (req, res) => {
  
  const newUser = req.body

  try {
    await db.addUser(newUser)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router



// //////////////////////////////////////////////////
// //POST /api/v1/users
// router.post('/', checkJwt, async (req: JwtRequest, res) => {
//   try {
//     const newUser = req.body
//     const auth0id = req.auth?.sub
//     const [users] = await db.addUser({
//       ...newUser,
//       auth0id,
//     })
//     res.json(users)
//   } catch (error) {
//     console.error(error)
//     res.sendStatus(500)
//   }
// })

// export default router
