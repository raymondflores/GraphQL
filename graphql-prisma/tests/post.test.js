import 'cross-fetch/polyfill'
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import prisma from '../src/prisma'
import {
  getPosts,
  getMyPosts,
  updatePost,
  deletePost,
  createPost
} from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should expose published posts', async () => {
  const response = await client.query({
    query: getPosts
  })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].published).toBe(true)
})

test('Should fetch users posts', async () => {
  const client = getClient(userOne.jwt)
  const { data } = await client.query({ query: getMyPosts })

  expect(data.myPosts.length).toBe(2)
})

test('Should be able to update own post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postOne.post.id,
    data: {
      published: false
    }
  }

  const { data } = await client.mutate({ mutation: updatePost, variables })
  expect(data.updatePost.published).toBe(false)
})

test('Should create a new post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    data: { title: 'A test post', body: '', published: true }
  }
  const { data } = await client.mutate({ mutation: createPost, variables })

  expect(data.createPost.title).toBe('A test post')
  expect(data.createPost.body).toBe('')
  expect(data.createPost.published).toBe(true)
})

test('Should delete post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postTwo.post.id
  }

  await client.mutate({ mutation: deletePost, variables })
  const exists = await prisma.exists.Post({ id: postTwo.post.id })

  expect(exists).toBe(false)
})

// Should not be able to update another users post

// Should not be able to delete another users post

// Should require authentication to create a post (could add for update and delete too)

// Should fetch published post by id

// Should fetch own post by id

// Should not fetch draft post from other user
