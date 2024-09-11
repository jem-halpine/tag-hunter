import express from 'express'
import { Users } from 'models/users'

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

export default router
