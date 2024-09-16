import request from 'superagent'
import { AppUsers } from 'models/AppUsers'
import { LeaderboardRow } from 'models/models'
import { User } from '@auth0/auth0-react'

const usersUrl = '/api/v1/users'

interface GetUsersFunction {
  token: string
}

export async function getUserById({
  token,
}: GetUsersFunction): Promise<AppUsers | null> {
  return await request
    .get(usersUrl)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.users ? res.body.users : null))
    .catch(console.error)
}

interface AddUserFunction {
  newUser: AppUsers
  token: string
}

export async function addUser({
  newUser,
  token,
}: AddUserFunction): Promise<AppUsers> {
  return await request
    .post(usersUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body.users)
    .catch(console.error)
}

export async function getUserLeaderboard(): Promise<LeaderboardRow> {
  const result = await request.get(`/api/v1/profile`)
  return result.body
}