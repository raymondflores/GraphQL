import getUserId from '../utils/getUserId'
import { PubSub } from 'graphql-yoga'

const Query = {
  users(parent, args, { prisma }, info) {
    const { query, first, skip, after, orderBy } = args
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    }

    if (query) {
      opArgs.where = {
        OR: [
          {
            name_contains: query
          }
        ]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const { query, first, skip, after, orderBy } = args
    const opArgs = {
      where: {
        published: true
      },
      first,
      skip,
      after,
      orderBy
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
    const { query, first, skip, after, orderBy } = args
    const { prisma, request } = context
    const userId = getUserId(request)
    const opArgs = {
      where: {
        author: { id: userId }
      },
      first,
      skip,
      after,
      orderBy
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
    const { first, skip, after, orderBy } = args
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    }

    return prisma.query.comments(opArgs, info)
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
