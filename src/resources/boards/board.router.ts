import Router from 'koa-router';
import boardsService from './board.service';

const router = new Router();

router.get('/boards', async (ctx) => {
  const users = await boardsService.getAllBoards();

  ctx.status = users.code;
  ctx.body = users.message;
});

router.get('/boards/:id', async (ctx) => {
  const users = await boardsService.getBoardById(ctx.params.id);

  ctx.status = users.code;
  ctx.body = users.message;
});

router.post('/boards', async (ctx) => {
  ctx.req.on('data', async (data) => {
    const jsonData = JSON.parse(data);
    const user = boardsService.createBoard(jsonData);

    ctx.status = user.code;
    ctx.body = user.message;

  });
});

router.put('/boards/:id', async (ctx) => {
  ctx.req.on('data', async (data) => {
    const jsonData = JSON.parse(data);
    const user = boardsService.updateBoard(ctx.params.id, jsonData);

    ctx.status = user.code;
    ctx.body = user.message;
  });
})

router.delete('/boards/:id', async (ctx) => {
  const result = boardsService.deleteBoard(ctx.params.id);

  ctx.status = result.code;
  ctx.body = result.message;
})


export default router;
