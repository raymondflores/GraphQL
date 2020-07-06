import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const {
      data: { email, password }
    } = args
    const emailTaken = await prisma.exists.User({ email })

    if (emailTaken) {
      throw new Error('Email Taken')
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = prisma.mutation.createUser({
      data: {
        ...args.data,
        password: hashedPassword
      }
    })

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisisasecret')
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
      token: jwt.sign({ userId: user.id }, 'thisisasecret')
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
  updateUser(parent, args, { prisma, request }, info) {
    const { data } = args
    const userId = getUserId(request)

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
