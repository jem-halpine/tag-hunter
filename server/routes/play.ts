import { Router } from 'express'
import * as db from '../db/index'

const router = Router()

router.get('/', async (req, res) => {
  
  try {
    const artwork = await db.getRandomArtwork()
    res.json(artwork)
  } catch (error) {
    res.status(500)
  }
})

export default router