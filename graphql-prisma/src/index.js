import '@babel/polyfill'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { fragmentReplacements } from './resolvers/index'

import db from './db'
import { resolvers } from './resolvers/index'
import prisma from './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request
    }
  },
  fragmentReplacements
})

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('The server is up')
})
