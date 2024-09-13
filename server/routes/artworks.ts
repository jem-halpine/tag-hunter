import { Router } from 'express'
import * as db from '../db/index'

const router = Router()

router.get('/:id', async (req, res) => {
  
  const id  = Number(req.params.id)

  try {
    const artwork = await db.getArtworkById(id)
    res.json(artwork)
  } catch (error) {
    res.status(500)
  }
  
})

export default router
