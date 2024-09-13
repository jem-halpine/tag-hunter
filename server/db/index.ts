
import connection from "./connection";
import { Artwork } from "models/models";

const db = connection

export async function getArtworkById(id: number){
  return await db('artworks')
    .where('id', id)
    .select(
      "id",
      "location",
      "latitude",
      "longitude",
      "artist",
      "image_url as imageUrl"
    )
    .first()
}

export async function getAllArtwork(): Promise<Artwork[]> {
  return await db('artworks')
  .select(
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
  ).first()
}
