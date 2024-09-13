import { Artwork } from 'models/models'
import request from 'superagent'

export async function getArtworkById(id: number): Promise<Artwork>{
  const res = await request.get(`/api/v1/artworks/${id}`)
  return res.body
}

export async function getRandomArtwork(): Promise<Artwork>{
  const res = await request.get(`/api/v1/play`)
  return res.body
}

