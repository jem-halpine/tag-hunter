import express from 'express'
import * as Path from 'node:path'
import knex from 'knex'
import { attachPaginate } from 'knex-paginate'
import knexConfig from './db/knexfile.js'

import artworkRoutes from './routes/artworks.ts'
import playRoutes from './routes/play.ts'
import usersRoutes from './routes/usersRoutes.ts'
import gameRoutes from './routes/games.ts'

type Environments = 'development' | 'test' | 'production'

const server = express()

const environment = (process.env.NODE_ENV || 'development') as Environments
export const db = knex(knexConfig[environment])
attachPaginate()

server.use(express.json())

server.use('/api/v1/artworks', artworkRoutes)
server.use('/api/v1/play', playRoutes)
server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/games', gameRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
