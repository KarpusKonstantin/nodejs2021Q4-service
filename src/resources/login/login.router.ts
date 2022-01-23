import { StatusCodes } from 'http-status-codes';
import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import usersService from '../users/user.service';
import { JWT_SECRET_KEY } from '../../common/config';
import { IUser } from '../users/user.model';


export const router = new Router();

router.post('/login', async (ctx, next) => {
  const { login, password } = ctx.request.body;

  const result = await usersService.getUserByLoginAndPassword(login, password);

  if (result.code === StatusCodes.OK) {
    if (typeof result.message === 'IUser') {

      const token = jwt.sign({ userId: result.message.id, login }, String(JWT_SECRET_KEY));

      ctx.body = { token };
      return;
    }
  }
  ctx.response.status = StatusCodes.FORBIDDEN;
  ctx.body = 'Forbidden';
  await next();
});


export default router;
