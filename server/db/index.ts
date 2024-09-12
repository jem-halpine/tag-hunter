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

export function getArtworks() {
  return db('artworks').select(
    'id',
    'location',
    'latitude',
    'longitude',
    'artist',
    'image_url as imageUrl',
    'user_id as userId',
    'description',
  )
}
