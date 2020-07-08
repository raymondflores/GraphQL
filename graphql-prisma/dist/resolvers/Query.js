'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

var _graphqlYoga = require('graphql-yoga');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
  users: function users(parent, args, _ref, info) {
    var prisma = _ref.prisma;
    var query = args.query,
        first = args.first,
        skip = args.skip,
        after = args.after,
        orderBy = args.orderBy;

    var opArgs = {
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      opArgs.where = {
        OR: [{
          name_contains: query
        }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts: function posts(parent, args, _ref2, info) {
    var prisma = _ref2.prisma;
    var query = args.query,
        first = args.first,
        skip = args.skip,
        after = args.after,
        orderBy = args.orderBy;

    var opArgs = {
      where: {
        published: true
      },
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      opArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },
  myPosts: function myPosts(parent, args, context, info) {
    var query = args.query,
        first = args.first,
        skip = args.skip,
        after = args.after,
        orderBy = args.orderBy;
    var prisma = context.prisma,
        request = context.request;

    var userId = (0, _getUserId2.default)(request);
    var opArgs = {
      where: {
        author: { id: userId }
      },
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      opArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },
  comments: function comments(parent, args, _ref3, info) {
    var prisma = _ref3.prisma;
    var first = args.first,
        skip = args.skip,
        after = args.after,
        orderBy = args.orderBy;

    var opArgs = {
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    return prisma.query.comments(opArgs, info);
  },
  me: function me(parent, args, context, info) {
    var prisma = context.prisma,
        request = context.request;

    var userId = (0, _getUserId2.default)(request);

    return prisma.query.user({
      where: { id: userId }
    }, info);
  },
  post: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref4, info) {
      var prisma = _ref4.prisma,
          request = _ref4.request;
      var id, userId, posts;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = args.id;
              userId = (0, _getUserId2.default)(request, false);
              _context.next = 4;
              return prisma.query.posts({
                where: {
                  id: id,
                  OR: [{
                    published: true
                  }, {
                    author: {
                      id: userId
                    }
                  }]
                }
              }, info);

            case 4:
              posts = _context.sent;

              if (posts.length) {
                _context.next = 7;
                break;
              }

              throw new Error('Post not found');

            case 7:
              return _context.abrupt('return', posts[0]);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function post(_x, _x2, _x3, _x4) {
      return _ref5.apply(this, arguments);
    }

    return post;
  }()
};

exports.default = Query;