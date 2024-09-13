import { Artwork } from 'models/models'
import request from 'superagent'

export async function getArtworkById(id: number): Promise<Artwork> {
  const res = await request.get(`/api/v1/artworks/${id}`)
  return res.body
}

export async function getAllArtwork(pageNumber: number): Promise<Artwork[]> {
  const res = await request.get(`/api/v1/artworks`).query({ page: pageNumber })
  return res.body
}

export async function getArtworksLength(): Promise<number> {
  const res = await request.get(`/api/v1/artworks/length`)
  return res.body
}

export async function getRandomArtwork(): Promise<Artwork> {
  const res = await request.get(`/api/v1/play`)
  return res.body
}
