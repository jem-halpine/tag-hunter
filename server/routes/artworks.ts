import { Router } from 'express'
import * as db from '../db/index'

const router = Router()

router.get('/length', async (req, res) => {
  try {
    const length = await db.getArtworksLength()
    res.json(length[0].count)
  } catch (error) {
    res.status(500)
  }
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  try {
    const artwork = await db.getArtworkById(id)
    res.json(artwork)
  } catch (error) {
    res.status(500)
  }
})

router.get('/', async (req, res) => {
  try {
    const page = req.query.page
    const artworks = await db.getArtworks(Number(page))
    res.json(artworks)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
