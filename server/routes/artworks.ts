import { Router } from 'express'
import * as db from '../db/index'

const router = Router()

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    const artwork = await db.getArtworkById(id)
    res.json(artwork)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.get('/paginated-results/:page', async (req, res) => {
  try {
    const page = Number(req.params.page)
    const artworks = await db.getPaginateArtworks(page)
    res.json(artworks)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
