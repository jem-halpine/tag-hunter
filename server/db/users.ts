
import { AppUsers } from 'models/AppUsers.ts'
import db from './connection.ts'
import { Game } from 'models/models.ts'

export async function getAllUsers(): Promise<AppUsers[]> {
  return db('users').select('*')
}

export async function getUserById(auth0id: string): Promise<AppUsers> {
  return db('users').where({ auth0id }).select('*').first()
}

export async function addUser(user: AppUsers):Promise <AppUsers> {
  return db('users').insert(user)
}

export async function getUserByGamesId(user_id: string): Promise<Game[]> {
  return db('games').where({ user_id }).select('*')
}

export async function getLeaderBoardByUser(user_id: string): Promise<Game[]> {
  return await db('games')
    .join('users','users.auth0Id','=','games.user_id')
    .where({user_id})
    .select('users.name', 'users.email')
    .count('games.id as games')
    .sum('games.art_was_found as wins')
    .sum('guesses_used as guesses')
    // .groupBy('users.name')
}
