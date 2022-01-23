import jwt from 'jsonwebtoken';
import { Next, ParameterizedContext } from 'koa';
import { StatusCodes } from 'http-status-codes';
import { JWT_SECRET_KEY } from '../common/config';

const permittedURL = ['/login', '/'];

const tokenVerify = (token: string) => {
  try {
    return jwt.verify(token, String(JWT_SECRET_KEY));
  } catch (error) {
    return false;
  }
};

const checkToken = async (ctx: ParameterizedContext, next: Next) => {

  if (!permittedURL.includes(ctx.request.url)) {

    const type = ctx.headers.authorization?.split(' ')[0];
    const token = ctx.headers.authorization?.split(' ')[1];

    if (type !== 'Bearer') {
      ctx.response.body = 'UNAUTHORIZED';
      ctx.response.status = StatusCodes.UNAUTHORIZED;

      return;
    }

    if (!token || !tokenVerify(token)) {
      ctx.response.body = 'UNAUTHORIZED';
      ctx.response.status = StatusCodes.UNAUTHORIZED;

      return;
    }
  }

  await next();

}

export default {
  checkToken
}
