import request from 'superagent'

export async function getArtworkById(id: number){
  const res = await request.get(`/api/v1/artwork/${id}`)
  return res.body
}
