import bcrypt from 'bcryptjs'
import prisma from '../../src/prisma'
import jwt from 'jsonwebtoken'

const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('test1234')
  },
  user: undefined,
  jwt: undefined
}

const userTwo = {
  input: {
    name: 'Dude',
    email: 'dude@example.com',
    password: bcrypt.hashSync('helloworld123')
  },
  user: undefined,
  jwt: undefined
}

const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyUsers()

  // Create userOne
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  })
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

  // create userTwo
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  })
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)
}

export { seedDatabase as default, userOne, userTwo }
