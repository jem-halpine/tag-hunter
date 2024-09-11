import express from 'express'
import { Artwork } from '../../models/artwork'
// TODO: JWT

import * as db from '../db/artworks.ts'

const router = express.Router()

// GET /api/v1/artworks
router.get('/', async (req, res) => {
  try {
    const artworks = await db.getAllArtwork()
    res.json(artworks as Artwork[]).sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router
