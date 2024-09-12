import ArtworkData from '@/models/artwork'
import { Artwork } from 'models/models'
import request from 'superagent'

export async function getArtworkById(id: number): Promise<Artwork> {
  const res = await request.get(`/api/v1/artworks/${id}`)
  return res.body
}
export async function getAllArtwork(): Promise<ArtworkData[]> {
  const res = await request.get(`/api/v1/artworks`)
  return res.body
}
