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
  const { body } = ctx.request;
  const board = await boardsService.createBoard(body);

  ctx.status = board.code;
  ctx.body = board.message;
});

router.put('/boards/:id', async (ctx) => {
  const { body } = ctx.request;
  const board = await boardsService.updateBoard(ctx.params.id, body);

  ctx.status = board.code;
  ctx.body = board.message;
})

router.delete('/boards/:id', async (ctx) => {
  const result = await boardsService.deleteBoard(ctx.params.id);

  ctx.status = result.code;
  ctx.body = result.message;
})


export default router;
