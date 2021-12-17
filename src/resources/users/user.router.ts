import Router from 'koa-router';
import usersService from './user.service';

const router:Router = new Router();


router.get('/users', async (ctx) => {
  const users = await usersService.getAllUsers();

  ctx.status = users.code;
  ctx.body = users.message;
});

router.get('/users/:id', async (ctx) => {
  const users = await usersService.getUserById(ctx.params.id);

  ctx.status = users.code;
  ctx.body = users.message;
});

router.post('/users', async (ctx) => {
  ctx.req.on('data', async (data) => {
    const jsonData = JSON.parse(data);
    const user = usersService.createUser(jsonData);

    ctx.status = user.code;
    ctx.body = user.message;

  });
});

router.put('/users/:id', async (ctx) => {
  ctx.req.on('data', async (data) => {
    const jsonData = JSON.parse(data);
    const user = usersService.updateUser(ctx.params.id, jsonData);

    ctx.status = user.code;
    ctx.body = user.message;
  });
})

router.delete('/users/:id', async (ctx) => {
  const result = usersService.deleteUser(ctx.params.id);

  ctx.status = result.code;
  ctx.body = result.message;
})


export default router;
