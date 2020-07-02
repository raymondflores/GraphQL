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

const db = {
  users,
  posts,
  comments
}

export { db as default }
