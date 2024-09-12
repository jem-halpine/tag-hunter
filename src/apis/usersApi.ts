import request from 'superagent'
import { Users } from 'models/users'
import { User } from '@auth0/auth0-react'

const usersUrl = '/api/v1/users'

interface GetUsersFunction {
  token: string
}

export async function getUserById({
  token,
}: GetUsersFunction): Promise<Users | null> {
  return await request
    .get(usersUrl)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.users ? res.body.users : null))
    .catch(console.error)
}

interface AddUserFunction {
  newUser: User
  token: string
}

export async function addUser({
  newUser,
  token,
}: AddUserFunction): Promise<Users> {
  return await request
    .post(usersUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body.users)
    .catch(console.error)
}
