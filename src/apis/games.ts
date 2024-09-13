import { Game, GameData } from "models/models";
import request from "superagent";

export async function getGames(): Promise<Game[]> {
  const res = await request.get(`/api/v1/games`)
  return res.body
}

export async function addGame(data: GameData) {
  const res = await request.post(`/api/v1/games`).send(data)
  return res.status
}