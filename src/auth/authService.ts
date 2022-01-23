import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Next, ParameterizedContext } from 'koa';
import { StatusCodes } from 'http-status-codes';
import { JWT_SECRET_KEY } from '../common/config';

const checkToken = (ctx: ParameterizedContext, next: Next) => {
  const headerAuth = ctx.headers.authorization;

  if (headerAuth !== undefined) {
    const [type, token] = headerAuth.split(' ');

    if (type !== 'Bearer') {
      ctx.response.body = 'Unauthorized user!';
      ctx.response.status = StatusCodes.UNAUTHORIZED;
    } else {
      const res = jwt.verify(token, String(JWT_SECRET_KEY))
    }

  }

  ctx.response.body = 'Unauthorized user!';
  ctx.response.status = StatusCodes.UNAUTHORIZED;

}

export default {
  checkToken
}
