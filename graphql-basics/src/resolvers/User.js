const User = {
  posts({ id }, args, { db }, info) {
    return db.posts.filter((post) => post.author === id)
  },
  comments({ id }, args, { db }, info) {
    return db.comments.filter((comment) => comment.author === id)
  }
}

export { User as default }
