const Router = require('koa-router');

const router = new Router();

const { StatusCodes} = require('http-status-codes');

// const User = require('./user.model');
// const usersService = require('./user.service');



router.get('/users', async (ctx) => {

  // const users = await usersService.getAll();

  ctx.status = StatusCodes.OK;

  ctx.body = 'Good';

  // ctx.responce.json(users.map(User.toResponse));

});


module.exports = router;
