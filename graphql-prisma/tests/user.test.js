import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import bcrypt from 'bcryptjs'
import prisma from '../src/prisma'

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()
  const user = await prisma.mutation.createUser({
    data: {
      name: 'Jen',
      email: 'jen@example.com',
      password: bcrypt.hashSync('test1234')
    }
  })

  Promise.all([
    await prisma.mutation.createPost({
      data: {
        title: 'My published post',
        body: '',
        published: true,
        author: {
          connect: {
            id: user.id
          }
        }
      }
    }),
    await prisma.mutation.createPost({
      data: {
        title: 'My draft post',
        body: '',
        published: false,
        author: {
          connect: {
            id: user.id
          }
        }
      }
    })
  ])
})

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Raymond Flores"
          email: "ray@aol.com"
          password: "test1234"
        }
      ) {
        token
        user {
          id
        }
      }
    }
  `

  const response = await client.mutate({
    mutation: createUser
  })

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  })

  expect(exists).toBe(true)
})

test('Should expose public author profiles', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `

  const response = await client.query({
    query: getUsers
  })

  expect(response.data.users.length).toBe(1)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('Jen')
})

test('Should expose published posts', async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `

  const response = await client.query({
    query: getPosts
  })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].published).toBe(true)
})

test('Should not login with bad credentials', async () => {
  const login = gql`
    mutation {
      login(data: { email: "jeff@example.com", password: "test1234" }) {
        token
      }
    }
  `

  expect(client.mutate({ mutation: login })).rejects.toThrow()
})

test('Should not signup with short password', async () => {
  const signup = gql`
    mutation {
      signup(
        data: {
          name: "Raymond Flores"
          email: "raymond@test.com"
          password: "abc123"
        }
      ) {
        token
      }
    }
  `

  expect(client.mutate({ mutation: signup })).rejects.toThrow()
})
