import { Router } from 'express'
import * as db from '../db/index'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

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

const upload = multer({ dest: 'uploads/' })

router.post('/new', upload.single('image'), async (req, res) => {
  try {
    const { latitude, longitude, artistName, location } = req.body
    const image = req.file

    if (!latitude || !longitude || !image) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const imagePath = path.join('public/images', image.filename)
    fs.renameSync(image.path, imagePath)

    const newArtwork = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      artist: artistName || null,
      image_url: image.filename,
      location: location,
    }

    await db.newArtwork(newArtwork)

    res.status(201).json({ message: 'Artwork added successfully!' })
  } catch (error) {
    console.error('Error adding artwork:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
