'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var users = [{
  id: '1',
  name: 'Raymond',
  email: 'ray@aol.com',
  age: 27
}, {
  id: '2',
  name: 'Devin',
  email: 'dev@aol.com',
  age: 7
}];

var posts = [{
  id: '1',
  title: 'My first post',
  body: 'hello world',
  published: true,
  author: '1'
}, {
  id: '2',
  title: 'My 2nd post',
  body: 'this is the body',
  published: false,
  author: '2'
}];

var comments = [{
  id: '1',
  text: 'first comment',
  author: '1',
  post: '1'
}, {
  id: '2',
  text: 'second comment',
  author: '1',
  post: '1'
}, {
  id: '3',
  text: 'hello world',
  author: '2',
  post: '2'
}];

var db = {
  users: users,
  posts: posts,
  comments: comments
};

exports.default = db;