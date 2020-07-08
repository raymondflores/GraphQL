'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _prismaBinding = require('prisma-binding');

var _index = require('./resolvers/index');

var prisma = new _prismaBinding.Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'thisismysecret',
  fragmentReplacements: _index.fragmentReplacements
});

// prisma.query.users(null, '{ id name posts { id title} }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId })

//   if (!userExists) {
//     throw new Error('User not found.')
//   }

//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     '{ author { id name email posts { id title published } } }'
//   )

//   return post.author
// }

// createPostForUser('ckbxc3azc002i0829geu3prwc', {
//   title: 'Async/Await',
//   body: 'cool stuff',
//   published: true
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// const updatePostForUser = async (postId, data) => {
//   const postExists = prisma.exists.Post({
//     id: postId
//   })

//   if (!postExists) {
//     throw new Error('Post not found.')
//   }

//   const post = await prisma.mutation.updatePost(
//     {
//       where: {
//         id: postId
//       },
//       data
//     },
//     ' { author { id name email posts { id title published } } }'
//   )

//   return post.author
// }

// updatePostForUser('ckbxcd2kf006a0829wlznjuoh', { published: false }).then(
//   (user) => {
//     console.log(JSON.stringify(user, undefined, 2))
//   }
// )

exports.default = prisma;