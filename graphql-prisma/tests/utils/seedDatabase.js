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

const postOne = {
  input: {
    title: 'My published post',
    body: '',
    published: true
  },
  post: undefined
}

const postTwo = {
  input: {
    title: 'My draft post',
    body: '',
    published: false
  },
  post: undefined
}

const commentOne = {
  input: {
    text: 'Hello World!'
  },
  comment: undefined
}

const commentTwo = {
  input: {
    text: 'This is my post!'
  },
  comment: undefined
}

const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyComments()
  await prisma.mutation.deleteManyPosts()
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

  // create post by userOne
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })

  // create post by userOne
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })

  // create comment by userTwo
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      post: {
        connect: {
          id: postOne.post.id
        }
      },
      author: {
        connect: {
          id: userTwo.user.id
        }
      }
    }
  })

  // create comment by userOne
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      post: {
        connect: {
          id: postOne.post.id
        }
      },
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })
}

export {
  seedDatabase as default,
  userOne,
  postOne,
  postTwo,
  userTwo,
  commentOne,
  commentTwo
}
