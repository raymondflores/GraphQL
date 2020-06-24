import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: '1',
    name: 'Raymond',
    email: 'ray@aol.com',
    age: 27
  },
  {
    id: '2',
    name: 'Devin',
    email: 'dev@aol.com',
    age: 7
  }
]

// Demo post data
const posts = [
  {
    id: '1',
    title: 'My first post',
    body: 'hello world',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'My 2nd post',
    body: 'this is the body',
    published: false,
    author: '2'
  }
]

// Demo comment data
const comments = [
  {
    id: '1',
    text: 'first comment',
    author: '1',
    post: '1'
  },
  {
    id: '2',
    text: 'second comment',
    author: '1',
    post: '1'
  },
  {
    id: '3',
    text: 'hello world',
    author: '2',
    post: '2'
  }
]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

// Resolvers
const resolvers = {
  Query: {
    users(parent, { query }, ctx, info) {
      if (!query) {
        return users
      }

      return users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      )
    },
    posts(parent, { query }, ctx, info) {
      if (!query) {
        return posts
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(query.toLowerCase())
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(query.toLowerCase())

        return isTitleMatch || isBodyMatch
      })
    },
    comments(parent, args, ctx, info) {
      return comments
    },
    me() {
      return {
        id: '123',
        name: 'Raymond',
        email: 'ray@aol.com',
        age: 27
      }
    },
    post() {
      return {
        id: '092',
        title: 'Hello World',
        body: 'This is my first post',
        published: true
      }
    }
  },
  Post: {
    author({ author }, args, ctx, info) {
      return users.find((user) => user.id === author)
    },
    comments({ id }, args, ctx, info) {
      return comments.filter((comment) => comment.post === id)
    }
  },
  User: {
    posts({ id }, args, ctx, info) {
      return posts.filter((post) => post.author === id)
    },
    comments({ id }, args, ctx, info) {
      return comments.filter((comment) => comment.author === id)
    }
  },
  Comment: {
    author({ author }, args, ctx, info) {
      return users.find((user) => user.id === author)
    },
    post({ post }, args, ctx, info) {
      return posts.find((p) => p.id === post)
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up')
})
