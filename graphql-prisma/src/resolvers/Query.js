import getUserId from '../utils/getUserId'
import { PubSub } from 'graphql-yoga'

const Query = {
  users(parent, args, { prisma }, info) {
    const { query } = args
    const opArgs = {}

    if (query) {
      opArgs.where = {
        OR: [
          {
            name_contains: query
          },
          {
            email_contains: query
          }
        ]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const { query } = args
    const opArgs = {
      where: {
        published: true
      }
    }

    if (query) {
      opArgs.where.OR = [
        {
          title_contains: query
        },
        {
          body_contains: query
        }
      ]
    }

    return prisma.query.posts(opArgs, info)
  },
  myPosts(parent, args, context, info) {
    const { query } = args
    const { prisma, request } = context
    const userId = getUserId(request)
    const opArgs = {
      where: {
        author: { id: userId }
      }
    }

    if (query) {
      opArgs.where.OR = [
        {
          title_contains: query
        },
        {
          body_contains: query
        }
      ]
    }

    return prisma.query.posts(opArgs, info)
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info)
  },
  me(parent, args, context, info) {
    const { prisma, request } = context
    const userId = getUserId(request)

    return prisma.query.user(
      {
        where: { id: userId }
      },
      info
    )
  },
  async post(parent, args, { prisma, request }, info) {
    const { id } = args
    const userId = getUserId(request, false)

    const posts = await prisma.query.posts(
      {
        where: {
          id,
          OR: [
            {
              published: true
            },
            {
              author: {
                id: userId
              }
            }
          ]
        }
      },
      info
    )

    if (!posts.length) {
      throw new Error('Post not found')
    }

    return posts[0]
  }
}

export { Query as default }
