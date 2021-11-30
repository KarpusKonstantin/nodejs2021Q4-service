const Router = require('koa-router');

const router = new Router();

// const Task = require('./user.model');
// const usersService = require('./user.service');



router.get('/tasks', async (ctx) => {

  // const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  ctx.status = 200;
  ctx.body = 'Tasks';
  // ctx.responce.json(users.map(User.toResponse));

});


module.exports = router;
