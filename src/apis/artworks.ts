import { Artwork, ArtworkPaginate } from 'models/models'
import request from 'superagent'

export async function getArtworkById(id: number): Promise<Artwork> {
  const res = await request.get(`/api/v1/artworks/${id}`)
  return res.body
}

export async function getRandomArtwork(): Promise<Artwork> {
  const res = await request.get(`/api/v1/play`)
  return res.body
}

export async function getPaginateGallery(
  pageParam: number,
): Promise<ArtworkPaginate> {
  const res = await fetch(`/api/v1/artworks/paginated-results/${pageParam}`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
}

export async function newArt(formData: FormData): Promise<Artwork> {
  const res = await request.post('/api/v1/artworks/new').send(formData)
  return res.body
}
