import { Users } from 'models/users.ts'
import db from './connection.ts'
import { User } from '@auth0/auth0-react'

export async function getAllUsers(): Promise<Users[]> {
  return db('users').select('*')
}

export async function getUserById(auth0id: string): Promise<User> {
  return db('users').where({ auth0id }).select('*').first()
}

export async function addUser(user: User): Promise<User[]> {
  return db('users').insert(user)
}
