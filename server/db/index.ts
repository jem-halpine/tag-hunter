import connection from './connection'
import {
  Artwork,
  ArtworkPaginate,
  Game,
  GameData,
  UserData,
} from 'models/models'

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
    .join('users', 'users.auth0Id', '=', 'games.user_id')
    .select(
      'games.id',
      'games.timestamp',
      'games.artwork_id as artworkId',
      'users.name as username',
      'games.art_was_found as artWasFound',
      'games.guesses_used as guessesUsed',
    )
}

export async function getLeaderBoard(): Promise<Game[]> {
  return await db('games')
    .join('users', 'users.auth0Id', '=', 'games.user_id')
    .select('users.name')
    .count('games.id as games')
    .sum('games.art_was_found as wins')
    .sum('guesses_used as guesses')
    .groupBy('users.name')
}

export async function addGame(data: GameData) {
  const {
    auth0Id: user_id,
    artworkId: artwork_id,
    artWasFound: art_was_found,
    guessesUsed: guesses_used,
    rating,
  } = data

  const timestamp = new Date(Date.now())

  return await db('games').insert({
    user_id,
    artwork_id,
    art_was_found,
    guesses_used,
    rating,
    timestamp,
  })
}

export async function getPaginateArtworks(
  page: number,
): Promise<ArtworkPaginate> {
  return await db('artworks')
    .select(
      'id',
      'location',
      'latitude',
      'longitude',
      'image_url as imageUrl',
      'artist',
      'description',
      'user_id as userId',
    )
    .paginate({
      perPage: 10,
      currentPage: page,
      isLengthAware: true,
    })
}

export async function getUserById(auth0id: string): Promise<UserData> {
  return db('users').where({ auth0id }).first()
}

export async function addUser(user: UserData) {
  return db('users').insert(user).onConflict('auth0id').ignore()
}

export async function getUserProfile(user_id: string) {
  const profile = await db('users')
    .leftJoin('games', 'users.auth0Id', '=', 'games.user_id')
    .where('users.auth0id', user_id)
    .select('users.name', 'users.email')
    .count('games.id as games')
    .sum('games.art_was_found as wins')
    .sum('guesses_used as guesses')
    .first()

  const unlockedArt = await db('games')
    .join('artworks','artworks.id','=','games.artwork_id')
    .where("games.user_id", user_id)
    .andWhere("games.art_was_found", 1)
    .select("artworks.id", "artworks.image_url as imageUrl")
    .distinct()


  return {
    ...profile,
    unlockedArt
  }
  }
