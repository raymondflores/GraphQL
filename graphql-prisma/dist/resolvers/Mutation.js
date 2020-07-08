'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

var _generateToken = require('../utils/generateToken');

var _generateToken2 = _interopRequireDefault(_generateToken);

var _hashPassword = require('../utils/hashPassword');

var _hashPassword2 = _interopRequireDefault(_hashPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Mutation = {
  createUser: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
      var prisma = _ref.prisma;

      var _args$data, email, password, emailTaken, hashedPassword, user;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _args$data = args.data, email = _args$data.email, password = _args$data.password;
              _context.next = 3;
              return prisma.exists.User({ email: email });

            case 3:
              emailTaken = _context.sent;

              if (!emailTaken) {
                _context.next = 6;
                break;
              }

              throw new Error('Email Taken');

            case 6:
              _context.next = 8;
              return (0, _hashPassword2.default)(password);

            case 8:
              hashedPassword = _context.sent;
              user = prisma.mutation.createUser({
                data: _extends({}, args.data, {
                  password: hashedPassword
                })
              });
              return _context.abrupt('return', {
                user: user,
                token: (0, _generateToken2.default)(user.id)
              });

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function createUser(_x, _x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return createUser;
  }(),
  login: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref3, info) {
      var prisma = _ref3.prisma;

      var _args$data2, email, password, user, isMatch;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _args$data2 = args.data, email = _args$data2.email, password = _args$data2.password;
              _context2.next = 3;
              return prisma.query.user({ where: { email: email } });

            case 3:
              user = _context2.sent;

              if (user) {
                _context2.next = 6;
                break;
              }

              throw new Error('Unable to login.');

            case 6:
              _context2.next = 8;
              return _bcryptjs2.default.compare(password, user.password);

            case 8:
              isMatch = _context2.sent;

              if (isMatch) {
                _context2.next = 11;
                break;
              }

              throw new Error('Unable to login');

            case 11:
              return _context2.abrupt('return', {
                user: user,
                token: (0, _generateToken2.default)(user.id)
              });

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function login(_x5, _x6, _x7, _x8) {
      return _ref4.apply(this, arguments);
    }

    return login;
  }(),
  deleteUser: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, args, _ref5, info) {
      var prisma = _ref5.prisma,
          request = _ref5.request;
      var userId, userExists;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = (0, _getUserId2.default)(request);
              _context3.next = 3;
              return prisma.exists.User({ id: userId });

            case 3:
              userExists = _context3.sent;

              if (userExists) {
                _context3.next = 6;
                break;
              }

              throw new Error('No user found.');

            case 6:
              return _context3.abrupt('return', prisma.mutation.deleteUser({ where: { id: userId } }, info));

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deleteUser(_x9, _x10, _x11, _x12) {
      return _ref6.apply(this, arguments);
    }

    return deleteUser;
  }(),
  updateUser: function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, args, _ref7, info) {
      var prisma = _ref7.prisma,
          request = _ref7.request;
      var data, userId;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              data = args.data;
              userId = (0, _getUserId2.default)(request);

              if (!(typeof data.password === 'string')) {
                _context4.next = 6;
                break;
              }

              _context4.next = 5;
              return (0, _hashPassword2.default)(password);

            case 5:
              data.password = _context4.sent;

            case 6:
              return _context4.abrupt('return', prisma.mutation.updateUser({ where: { id: userId }, data: data }, info));

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function updateUser(_x13, _x14, _x15, _x16) {
      return _ref8.apply(this, arguments);
    }

    return updateUser;
  }(),
  createPost: function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, args, _ref9, info) {
      var prisma = _ref9.prisma,
          request = _ref9.request;

      var _args$data3, title, body, published, userId, userExists;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _args$data3 = args.data, title = _args$data3.title, body = _args$data3.body, published = _args$data3.published;
              userId = (0, _getUserId2.default)(request);
              _context5.next = 4;
              return prisma.exists.User({ id: userId });

            case 4:
              userExists = _context5.sent;

              if (userExists) {
                _context5.next = 7;
                break;
              }

              throw new Error('User does not exist.');

            case 7:
              return _context5.abrupt('return', prisma.mutation.createPost({
                data: { title: title, body: body, published: published, author: { connect: { id: userId } } }
              }, info));

            case 8:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function createPost(_x17, _x18, _x19, _x20) {
      return _ref10.apply(this, arguments);
    }

    return createPost;
  }(),
  deletePost: function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, args, _ref11, info) {
      var prisma = _ref11.prisma,
          request = _ref11.request;
      var id, userId, postExists;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = args.id;
              userId = (0, _getUserId2.default)(request);
              _context6.next = 4;
              return prisma.exists.Post({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 4:
              postExists = _context6.sent;

              if (postExists) {
                _context6.next = 7;
                break;
              }

              throw new Error('Unable to delete post.');

            case 7:
              return _context6.abrupt('return', prisma.mutation.deletePost({ where: { id: id } }, info));

            case 8:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function deletePost(_x21, _x22, _x23, _x24) {
      return _ref12.apply(this, arguments);
    }

    return deletePost;
  }(),
  updatePost: function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, args, _ref13, info) {
      var prisma = _ref13.prisma,
          request = _ref13.request;
      var id, data, userId, postExists, isPublished;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              id = args.id, data = args.data;
              userId = (0, _getUserId2.default)(request);
              _context7.next = 4;
              return prisma.exists.Post({
                id: id,
                author: {
                  id: userId
                }
              });

            case 4:
              postExists = _context7.sent;
              _context7.next = 7;
              return prisma.exists.Post({ id: id, published: true });

            case 7:
              isPublished = _context7.sent;

              if (postExists) {
                _context7.next = 10;
                break;
              }

              throw new Error('Unable to update post.');

            case 10:
              if (!(isPublished && data.published === false)) {
                _context7.next = 13;
                break;
              }

              _context7.next = 13;
              return prisma.mutation.deleteManyComments({ where: { post: { id: id } } });

            case 13:
              return _context7.abrupt('return', prisma.mutation.updatePost({ where: { id: id }, data: data }, info));

            case 14:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function updatePost(_x25, _x26, _x27, _x28) {
      return _ref14.apply(this, arguments);
    }

    return updatePost;
  }(),
  createComment: function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, args, _ref15, info) {
      var prisma = _ref15.prisma,
          request = _ref15.request;

      var _args$data4, text, post, userId, postExists;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _args$data4 = args.data, text = _args$data4.text, post = _args$data4.post;
              userId = (0, _getUserId2.default)(request);
              _context8.next = 4;
              return prisma.exists.Post({
                id: post,
                published: true
              });

            case 4:
              postExists = _context8.sent;

              if (postExists) {
                _context8.next = 7;
                break;
              }

              throw new Error('Unable to find post.');

            case 7:
              return _context8.abrupt('return', prisma.mutation.createComment({
                data: {
                  text: text,
                  author: { connect: { id: userId } },
                  post: { connect: { id: post } }
                }
              }, info));

            case 8:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function createComment(_x29, _x30, _x31, _x32) {
      return _ref16.apply(this, arguments);
    }

    return createComment;
  }(),
  deleteComment: function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, args, _ref17, info) {
      var prisma = _ref17.prisma,
          request = _ref17.request;
      var id, userId, commentExists;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              id = args.id;
              userId = (0, _getUserId2.default)(request);
              _context9.next = 4;
              return prisma.exists.Comment({
                id: id,
                author: {
                  id: userId
                }
              });

            case 4:
              commentExists = _context9.sent;

              if (commentExists) {
                _context9.next = 7;
                break;
              }

              throw new Error('Cannot delete comment.');

            case 7:
              return _context9.abrupt('return', prisma.mutation.deleteComment({ where: { id: id } }, info));

            case 8:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function deleteComment(_x33, _x34, _x35, _x36) {
      return _ref18.apply(this, arguments);
    }

    return deleteComment;
  }(),
  updateComment: function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(parent, args, _ref19, info) {
      var prisma = _ref19.prisma,
          request = _ref19.request;
      var id, data, userId, commentExists;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              id = args.id, data = args.data;
              userId = (0, _getUserId2.default)(request);
              _context10.next = 4;
              return prisma.exists.Comment({
                id: id,
                author: {
                  id: userId
                }
              });

            case 4:
              commentExists = _context10.sent;

              if (commentExists) {
                _context10.next = 7;
                break;
              }

              throw new Error('Cannot update comment.');

            case 7:
              return _context10.abrupt('return', prisma.mutation.updateComment({ where: { id: id }, data: data }, info));

            case 8:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function updateComment(_x37, _x38, _x39, _x40) {
      return _ref20.apply(this, arguments);
    }

    return updateComment;
  }()
};

exports.default = Mutation;