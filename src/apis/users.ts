import request from 'superagent'
import { User } from '@auth0/auth0-react'
import { UserData } from 'models/models'

const usersUrl = '/api/v1/users'

interface GetUsersFunction {
  token: string
}

export async function getUserById({
  token,
}: GetUsersFunction): Promise<UserData | null> {
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
}: AddUserFunction) {
  return await request
    .post(usersUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
}
