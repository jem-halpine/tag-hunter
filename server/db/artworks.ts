import connection from './connection'
import { Artwork } from '../../models/artwork'

const db = connection

export async function getAllArtwork(): Promise<Artwork[]> {
  return await db('artworks').select(
    'id',
    'location',
    'latitude',
    'longitude',
    'image_url as imageUrl',
    'artist',
  )
}
