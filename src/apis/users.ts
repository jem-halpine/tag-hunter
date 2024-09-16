import request from 'superagent'
import { User } from '@auth0/auth0-react'

const usersUrl = '/api/v1/users'



export async function getUserById(token:string) {
  const result = await request.get(usersUrl).set('Authorization', `Bearer ${token}`)
  return result.body.user
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
