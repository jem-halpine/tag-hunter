import connection from './connection'
import { Artwork, Game, GameData } from 'models/models'

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

export async function getGames(): Promise<Game[]> {
  return await db('games')
    .join('users','users.auth0Id','=','games.user_id')
    .select(
      "games.id",
      "games.timestamp",
      "games.artwork_id as artworkId",
      "users.name as username",
      "users.auth0Id",
      "games.art_was_found as artWasFound",
      "games.guesses_used as guessesUsed",
      "games.rating",
    )  
}


export async function addGame(data: GameData) {
  
  const { 
    auth0Id: user_id,
    artworkId: artwork_id,
    artWasFound: art_was_found,
    guessesUsed: guesses_used,
    rating
  } = data

  const timestamp = new Date(Date.now())
  
  return await db('games').insert(
    {
      user_id,
      artwork_id,
      art_was_found,
      guesses_used,
      rating,
      timestamp
    }
  )
}