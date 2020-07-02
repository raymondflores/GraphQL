const Comment = {
  author({ author }, args, { db }, info) {
    return db.users.find((user) => user.id === author)
  },
  post({ post }, args, { db }, info) {
    return db.posts.find((p) => p.id === post)
  }
}

export { Comment as default }
