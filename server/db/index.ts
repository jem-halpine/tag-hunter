import ArtworkData from '@/models/artwork'
import connection from './connection'

const db = connection

export async function getArtworkById(id: number) {
  return await db('artworks')
    .where('id', id)
    .select(
      'id',
      'location',
      'latitude',
      'longitude',
      'artist',
      'image_url as imageUrl',
    )
    .first()
}

export function getArtworks(page: number): Promise<ArtworkData[]> { //getAllArtwork
  return db('artworks').select(
    'id',
    'location',
    'latitude',
    'longitude',
    'artist',
    'image_url as imageUrl',
    'user_id as userId',
    'description',
  ).limit(5 * page)
}

export function getArtworksLength() {
  return db('artworks').select().count({count:'*'})
}
