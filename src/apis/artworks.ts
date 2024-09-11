import { Artwork } from 'models/models'
import request from 'superagent'

export async function getArtworkById(id: number): Promise<Artwork>{
  const res = await request.get(`/api/v1/artwork/${id}`)
  return res.body
}
