import bcrypt from 'bcryptjs'
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
  }
}

export { Mutation as default }
