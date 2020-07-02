import { v4 as uuidv4 } from 'uuid'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const {
      data: { email }
    } = args
    const emailTaken = await prisma.exists.User({ email })

    if (emailTaken) {
      throw new Error('Email Taken')
    }

    return prisma.mutation.createUser({ data: args.data }, info)
  },
  async deleteUser(parent, args, { prisma }, info) {
    const { id } = args
    const userExists = await prisma.exists.User({ id })

    if (!userExists) {
      throw new Error('No user found.')
    }

    return prisma.mutation.deleteUser({ where: { id } }, info)
  },
  updateUser(parent, args, { prisma }, info) {
    const { id, data } = args

    return prisma.mutation.updateUser({ where: { id }, data }, info)
  },
  async createPost(parent, args, { prisma }, info) {
    const {
      data: { title, body, published, author }
    } = args
    const userExists = await prisma.exists.User({ id: author })

    if (!userExists) {
      throw new Error('User does not exist.')
    }

    return prisma.mutation.createPost(
      {
        data: { title, body, published, author: { connect: { id: author } } }
      },
      info
    )
  },
  deletePost(parent, args, { prisma }, info) {
    const { id } = args

    return prisma.mutation.deletePost({ where: { id } }, info)
  },
  updatePost(parent, args, { prisma }, info) {
    const { id, data } = args

    return prisma.mutation.updatePost({ where: { id }, data }, info)
  },
  createComment(parent, args, { prisma }, info) {
    const {
      data: { text, author, post }
    } = args

    return prisma.mutation.createComment(
      {
        data: {
          text,
          author: { connect: { id: author } },
          post: { connect: { id: post } }
        }
      },
      info
    )
  },
  deleteComment(parent, args, { prisma }, info) {
    const { id } = args

    return prisma.mutation.deleteComment({ where: { id } }, info)
  },
  updateComment(parent, args, { prisma }, info) {
    const { id, data } = args

    return prisma.mutation.updateComment({ where: { id }, data }, info)
  }
}

export { Mutation as default }
