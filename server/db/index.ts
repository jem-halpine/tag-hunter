
import connection from "./connection";

const db = connection

export async function getArtworkById(id: number){
  return await db('artworks').where('id', id).first()
}

