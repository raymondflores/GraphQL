import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const {
      data: { email, password }
    } = args
    const emailTaken = await prisma.exists.User({ email })

    if (emailTaken) {
      throw new Error('Email Taken')
    }

    const hashedPassword = await hashPassword(password)
    const user = prisma.mutation.createUser({
      data: {
        ...args.data,
        password: hashedPassword
      }
    })

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async login(parent, args, { prisma }, info) {
    const {
      data: { email, password }
    } = args
    const user = await prisma.query.user({ where: { email } })

    if (!user) {
      throw new Error('Unable to login.')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error('Unable to login')
    }

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const userExists = await prisma.exists.User({ id: userId })

    if (!userExists) {
      throw new Error('No user found.')
    }

    return prisma.mutation.deleteUser({ where: { id: userId } }, info)
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const { data } = args
    const userId = getUserId(request)

    if (typeof data.password === 'string') {
      data.password = await hashPassword(password)
    }

    return prisma.mutation.updateUser({ where: { id: userId }, data }, info)
  },
  async createPost(parent, args, { prisma, request }, info) {
    const {
      data: { title, body, published }
    } = args
    const userId = getUserId(request)
    const userExists = await prisma.exists.User({ id: userId })

    if (!userExists) {
      throw new Error('User does not exist.')
    }

    return prisma.mutation.createPost(
      {
        data: { title, body, published, author: { connect: { id: userId } } }
      },
      info
    )
  },
  async deletePost(parent, args, { prisma, request }, info) {
    const { id } = args
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    })

    if (!postExists) {
      throw new Error('Unable to delete post.')
    }

    return prisma.mutation.deletePost({ where: { id } }, info)
  },
  async updatePost(parent, args, { prisma, request }, info) {
    const { id, data } = args
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    })
    const isPublished = await prisma.exists.Post({ id, published: true })

    if (!postExists) {
      throw new Error('Unable to update post.')
    }

    if (isPublished && data.published === false) {
      await prisma.mutation.deleteManyComments({ where: { post: { id } } })
    }

    return prisma.mutation.updatePost({ where: { id }, data }, info)
  },
  async createComment(parent, args, { prisma, request }, info) {
    const {
      data: { text, post }
    } = args
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: post,
      published: true
    })

    if (!postExists) {
      throw new Error('Unable to find post.')
    }

    return prisma.mutation.createComment(
      {
        data: {
          text,
          author: { connect: { id: userId } },
          post: { connect: { id: post } }
        }
      },
      info
    )
  },
  async deleteComment(parent, args, { prisma, request }, info) {
    const { id } = args
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    })

    if (!commentExists) {
      throw new Error('Cannot delete comment.')
    }

    return prisma.mutation.deleteComment({ where: { id } }, info)
  },
  async updateComment(parent, args, { prisma, request }, info) {
    const { id, data } = args
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({
      id,
      author: {
        id: userId
      }
    })

    if (!commentExists) {
      throw new Error('Cannot update comment.')
    }

    return prisma.mutation.updateComment({ where: { id }, data }, info)
  }
}

export { Mutation as default }
