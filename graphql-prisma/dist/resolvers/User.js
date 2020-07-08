'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, args, ctx, info) {
      var request = ctx.request;

      var userId = (0, _getUserId2.default)(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      }

      return null;
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, args, ctx, info) {
      var prisma = ctx.prisma;


      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      });
    }
  }
};

exports.default = User;