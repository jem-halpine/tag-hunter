import connection from './connection'
import { Artwork } from 'models/models'

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

export function getArtworks(page: number): Promise<Artwork[]> {
  //getAllArtwork
  return db('artworks')
    .select(
      'id',
      'location',
      'latitude',
      'longitude',
      'artist',
      'image_url as imageUrl',
      'user_id as userId',
      'description',
    )
    .limit(5 * page)
}

export function getArtworksLength() {
  return db('artworks').select().count({ count: '*' })
}

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

export async function getRandomArtwork(): Promise<Artwork> {
  return await db('artworks')
    .orderByRaw('RANDOM()')
    .limit(1)
    .select(
      'id',
      'location',
      'latitude',
      'longitude',
      'image_url as imageUrl',
      'artist',
    )
    .first()
}

export function getPaginateArtworks(page: number) {
  return db('artworks').paginate({
    perPage: 10,
    currentPage: page,
  })
}
