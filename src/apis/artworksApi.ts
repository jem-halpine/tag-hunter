import request from 'superagent'
import { Artwork } from '../../models/artwork'

const artworkUrl = '/api/v1/artworks'

export async function getAllArtwork(): Promise<Artwork[]> {
  const res = await request.get(artworkUrl)
  return res.body
}
