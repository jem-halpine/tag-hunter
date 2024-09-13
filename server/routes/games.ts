import { Router } from 'express'
import * as db from '../db/index'

const router = Router()

router.get('/', async (req, res) => {
  
  try {
    const games = await db.getGames()
    res.json(games)
  } catch (error) {
    res.status(500)
  }
})


router.post('/', async (req, res) => {

  const newGame = req.body
  
  try {
    await db.addGame(newGame)
    res.sendStatus(201)
  } catch (error) {
    res.status(500)
  }
})


export default router